<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use League\CommonMark\GithubFlavoredMarkdownConverter;
class BlogController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Admin Blog List
    |--------------------------------------------------------------------------
    */

    public function index(Request $request)
    {
        $user = auth()->user();

        $query = Blog::with(['user', 'category'])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('sub_title', 'like', "%{$search}%")
                        ->orWhere('body', 'like', "%{$search}%");
                });
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category_id', $category);
            })
            ->when($request->status, function ($query, $status) {
                if (in_array($status, ['draft', 'published'])) {
                    $query->where('status', $status);
                }
            })
            ->latest();

        /*
        |--------------------------------------------------------------------------
        | Staff can only see their own blogs
        |--------------------------------------------------------------------------
        */

        if ($user->role === 'staff') {
            $query->where('user_id', $user->id);
        }

        $blogs = $query
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('blogs/blog-list', [
            'blogs' => $blogs,

            'categories' => Category::orderBy('name')->get(),

            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
                'status' => $request->status,
            ],

            'canCreate' => true,

            'canEdit' => in_array(
                $user->role,
                ['admin', 'editor']
            ),

            'canDelete' => $user->role === 'admin',

            'canPublish' => in_array(
                $user->role,
                ['admin', 'editor']
            ),
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | Create Blog
    |--------------------------------------------------------------------------
    */

    public function create()
    {
        $categories = Category::orderBy('name')->get();

        return Inertia::render('blogs/create-blog', [
            'categories' => $categories,

            'canPublish' => in_array(
                auth()->user()->role,
                ['admin', 'editor']
            ),
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | Store Blog
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'sub_title' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'body' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'tags' => 'nullable|array',
            'status' => 'nullable|in:draft,published',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Staff can only create drafts
        |--------------------------------------------------------------------------
        */

        if ($user->role === 'staff') {
            $validated['status'] = 'draft';
        } else {
            $validated['status'] = $validated['status'] ?? 'draft';
        }

        /*
        |--------------------------------------------------------------------------
        | Upload Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('image')) {
            $validated['image'] = $request
                ->file('image')
                ->store('blogs', 'public');
        }

        /*
        |--------------------------------------------------------------------------
        | Generate Unique Slug
        |--------------------------------------------------------------------------
        */

        $validated['slug'] = $this->generateUniqueSlug(
            $validated['title']
        );

        $validated['user_id'] = $user->id;

        Blog::create($validated);

        return redirect()
            ->route('manage-blog.index')
            ->with('success', 'Blog created successfully!');
    }


    /*
    |--------------------------------------------------------------------------
    | Show Admin Blog
    |--------------------------------------------------------------------------
    */

    public function show(Blog $blog)
    {
        $this->ensureCanView($blog);

        $blog->load([
            'user',
            'category',
        ]);

        return Inertia::render('blogs/blog', [
            'blog' => $blog,
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | Edit Blog
    |--------------------------------------------------------------------------
    */

    public function edit(Blog $blog)
    {
        $user = auth()->user();

        if (!in_array($user->role, ['admin', 'editor'])) {
            abort(403);
        }

        $categories = Category::orderBy('name')->get();

        return Inertia::render('blogs/create-blog', [
            'blog' => $blog,
            'categories' => $categories,
            'canPublish' => true,
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | Update Blog
    |--------------------------------------------------------------------------
    */

    public function update(Request $request, Blog $blog)
    {
        $user = auth()->user();

        if (!in_array($user->role, ['admin', 'editor'])) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'sub_title' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'body' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'tags' => 'nullable|array',
            'status' => 'required|in:draft,published',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Update Slug If Title Changed
        |--------------------------------------------------------------------------
        */

        if ($blog->title !== $validated['title']) {
            $validated['slug'] = $this->generateUniqueSlug(
                $validated['title'],
                $blog->id
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Replace Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('image')) {

            if ($blog->image) {
                Storage::disk('public')->delete(
                    $blog->image
                );
            }

            $validated['image'] = $request
                ->file('image')
                ->store('blogs', 'public');

        } else {
            unset($validated['image']);
        }

        $blog->update($validated);

        return redirect()
            ->route('manage-blog.index')
            ->with('success', 'Blog updated successfully!');
    }


    /*
    |--------------------------------------------------------------------------
    | Delete Blog
    |--------------------------------------------------------------------------
    */

    public function destroy(Blog $blog)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        /*
        |--------------------------------------------------------------------------
        | Delete Image
        |--------------------------------------------------------------------------
        */

        if ($blog->image) {
            Storage::disk('public')->delete(
                $blog->image
            );
        }

        $blog->delete();

        return redirect()
            ->route('manage-blog.index')
            ->with('success', 'Blog deleted successfully!');
    }


    /*
    |--------------------------------------------------------------------------
    | Public Blog List
    |--------------------------------------------------------------------------
    */

  public function showPublicList(Request $request)
{
    $categories = Category::orderBy('name')->get();

    $blogs = Blog::with(['user', 'category'])
        ->where('status', 'published')

        ->when($request->search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('sub_title', 'like', "%{$search}%")
                    ->orWhere('body', 'like', "%{$search}%");
            });
        })

        ->when($request->category, function ($query) use ($request) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        })

        ->latest()
        ->paginate(10)
        ->withQueryString();

    return view('blogs.public-list', [
        'blogs' => $blogs,
        'categories' => $categories,
        'activeCategory' => $request->category,
        'search' => $request->search,
    ]);
}


    /*
    |--------------------------------------------------------------------------
    | Public Blog Article
    |--------------------------------------------------------------------------
    */

    public function showPublic($slug)
    {
        /*
        |--------------------------------------------------------------------------
        | Find Published Blog
        |--------------------------------------------------------------------------
        */

        $blog = Blog::with([
                'user',
                'category',
            ])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();


        /*
        |--------------------------------------------------------------------------
        | Convert Markdown To HTML
        |--------------------------------------------------------------------------
        */

    $converter = new GithubFlavoredMarkdownConverter([
    'html_input' => 'allow',
    'allow_unsafe_links' => false,
]);

        $html = $converter
            ->convert($blog->body)
            ->getContent();


        /*
        |--------------------------------------------------------------------------
        | Generate Table Of Contents
        |--------------------------------------------------------------------------
        |
        | H2, H3 and H4 headings are automatically added
        | to the table of contents.
        |
        | H1 is excluded because the article title is already
        | displayed at the top of the page.
        |
        */

        $toc = [];


        /*
        |--------------------------------------------------------------------------
        | Add IDs To Headings
        |--------------------------------------------------------------------------
        */

        $html = preg_replace_callback(
            '/<h([2-4])>(.*?)<\/h\1>/is',
            function ($matches) use (&$toc) {

                $level = (int) $matches[1];

                /*
                |--------------------------------------------------------------------------
                | Extract Heading Text
                |--------------------------------------------------------------------------
                */

                $title = trim(
                    strip_tags($matches[2])
                );


                /*
                |--------------------------------------------------------------------------
                | Generate Anchor ID
                |--------------------------------------------------------------------------
                */

                $id = Str::slug($title);

                if (!$id) {
                    $id = 'section-' . count($toc);
                }


                /*
                |--------------------------------------------------------------------------
                | Prevent Duplicate IDs
                |--------------------------------------------------------------------------
                */

                $baseId = $id;

                $counter = 2;

                $existingIds = collect($toc)
                    ->pluck('id')
                    ->toArray();

                while (
                    in_array(
                        $id,
                        $existingIds,
                        true
                    )
                ) {
                    $id = $baseId . '-' . $counter;

                    $counter++;
                }


                /*
                |--------------------------------------------------------------------------
                | Add To TOC
                |--------------------------------------------------------------------------
                */

                $toc[] = [
                    'id' => $id,
                    'title' => $title,
                    'level' => $level,
                ];


                /*
                |--------------------------------------------------------------------------
                | Return Heading With ID
                |--------------------------------------------------------------------------
                */

                return '<h'
                    . $level
                    . ' id="'
                    . e($id)
                    . '">'
                    . $matches[2]
                    . '</h'
                    . $level
                    . '>';
            },
            $html
        );


        /*
        |--------------------------------------------------------------------------
        | Attach Rendered HTML To Blog
        |--------------------------------------------------------------------------
        */

        $blog->html_body = $html;


        /*
        |--------------------------------------------------------------------------
        | Generate Public Image URL
        |--------------------------------------------------------------------------
        */

        $blog->image_url = $blog->image
            ? Storage::disk('public')->url(
                $blog->image
            )
            : null;


        /*
        |--------------------------------------------------------------------------
        | Public Article Blade View
        |--------------------------------------------------------------------------
        */

        return view('blogs.public-show', [
            'blog' => $blog,
            'toc' => $toc,
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | View Permission
    |--------------------------------------------------------------------------
    */

    private function ensureCanView(Blog $blog): void
    {
        $user = auth()->user();

        /*
        |--------------------------------------------------------------------------
        | Staff Can Only View Their Own Blogs
        |--------------------------------------------------------------------------
        */

        if (
            $user->role === 'staff'
            &&
            $blog->user_id !== $user->id
        ) {
            abort(403);
        }
    }


    /*
    |--------------------------------------------------------------------------
    | Generate Unique Slug
    |--------------------------------------------------------------------------
    */

    private function generateUniqueSlug(
        $title,
        $ignoreId = null
    ) {
        /*
        |--------------------------------------------------------------------------
        | Initial Slug
        |--------------------------------------------------------------------------
        */

        $slug = Str::slug($title);

        $original = $slug;

        $count = 1;


        /*
        |--------------------------------------------------------------------------
        | Check Existing Slugs
        |--------------------------------------------------------------------------
        */

        while (
            Blog::where(
                'slug',
                $slug
            )
            ->when(
                $ignoreId,
                function ($query) use ($ignoreId) {

                    $query->where(
                        'id',
                        '!=',
                        $ignoreId
                    );
                }
            )
            ->exists()
        ) {

            $slug = $original
                . '-'
                . $count;

            $count++;
        }


        return $slug;
    }
}