<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $latestBlogs = Blog::with(['user', 'category'])
            ->where('status', 'published')
            ->latest()
            ->take(6)
            ->get();

        $categories = Category::withCount([
            'blogs' => function ($query) {
                $query->where('status', 'published');
            },
        ])
            ->orderBy('name')
            ->get();

        return Inertia::render('welcome', [
            'latestBlogs' => $latestBlogs,
            'categories' => $categories,
        ]);
    }
}