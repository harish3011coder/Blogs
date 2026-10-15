<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
   /*
    | Role limits
    |--------------------------------------------------------------------------
    | Maximum number of users allowed to hold each role. 
*/
    protected array $roleLimits = [
        'staff' => 2,
        'editor' => 1,
        "admin" =>1
    ];

    public function index()
    {
        $users = User::latest()->paginate(10);

        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render('users/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
            ],

            'role' => [
                'required',
                Rule::in([
                    'admin',
                    'editor',
                    'staff',
                ]),
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Enforce role limits (max 2 staff, max 1 editor)
        |--------------------------------------------------------------------------
        */

        if ($error = $this->roleLimitError($validated['role'])) {
            return back()->withErrors([
                'role' => $error,
            ]);
        }

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        return redirect('/users')
            ->with('success', 'User created successfully.');
    }

    public function edit(User $user)
    {
        return Inertia::render('users/create', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')
                    ->ignore($user->id),
            ],

            'password' => [
                'nullable',
                'string',
                'min:8',
            ],

            'role' => [
                'required',
                Rule::in([
                    'admin',
                    'editor',
                    'staff',
                ]),
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Prevent removing the last admin
        |--------------------------------------------------------------------------
        */

        if (
            $user->role === 'admin' &&
            $validated['role'] !== 'admin'
        ) {
            $adminCount = User::where('role', 'admin')->count();

            if ($adminCount <= 1) {
                return back()->withErrors([
                    'role' => 'You cannot remove the last admin account.',
                ]);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Enforce role limits (max 2 staff, max 1 editor)
        |--------------------------------------------------------------------------
        | Only relevant if the role is actually changing — a user keeping
        | their current role never pushes the count over the limit.
        */

        if (
            $validated['role'] !== $user->role &&
            ($error = $this->roleLimitError($validated['role'], $user->id))
        ) {
            return back()->withErrors([
                'role' => $error,
            ]);
        }

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->role = $validated['role'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make(
                $validated['password']
            );
        }

        $user->save();

        return redirect('/users')
            ->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        /*
         Prevent deleting your own account
  */

        if ($user->id === auth()->id()) {
            return back()->withErrors([
                'user' => 'You cannot delete your own account.',
            ]);
        }

        /*
        Prevent deleting the last admin
        */

        if ($user->role === 'admin') {
            $adminCount = User::where('role', 'admin')->count();

            if ($adminCount <= 1) {
                return back()->withErrors([
                    'user' => 'You cannot delete the last admin account.',
                ]);
            }
        }

        $user->delete();

        return redirect('/users')
            ->with('success', 'User deleted successfully.');
    }

    /*
    |--------------------------------------------------------------------------
    | Role limit check
    |--------------------------------------------------------------------------
    | Returns an error message if assigning $role would exceed its allowed
    | count, or null if it's fine. $ignoreUserId excludes a user from the
    | count (used on update, since that user's current row still holds
    | their old role until saved).
    */

    protected function roleLimitError(string $role, ?int $ignoreUserId = null): ?string
    {
        if (!isset($this->roleLimits[$role])) {
            return null;
        }

        $limit = $this->roleLimits[$role];

        $count = User::where('role', $role)
            ->when($ignoreUserId, fn ($query) => $query->where('id', '!=', $ignoreUserId))
            ->count();

        if ($count >= $limit) {
            return "You can only have {$limit} " . ($limit === 1 ? 'user' : 'users') . " with the {$role} role.";
        }

        return null;
    }
}