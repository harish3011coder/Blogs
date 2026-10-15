<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'blogs' => Blog::count(),
                'categories' => Category::count(),
                'users' => User::count(),
            ],

            'recentBlogs' => Blog::with('category')
                ->latest()
                ->take(5)
                ->get(),

            'recentUsers' => User::latest()
                ->take(5)
                ->get([
                    'id',
                    'name',
                    'email',
                    'role',
                    'created_at',
                ]),
        ]);
    }
}