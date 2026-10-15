<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])
    ->name('home');


/*
|--------------------------------------------------------------------------
| Public Blogs
|--------------------------------------------------------------------------
*/

Route::get('/blogs', [BlogController::class, 'showPublicList'])
    ->name('blog.public.list');

Route::get('/blogs/{slug}', [BlogController::class, 'showPublic'])
    ->name('blog.public.show');


/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get('/dashboard', DashboardController::class)
        ->name('dashboard');


    /*
    |--------------------------------------------------------------------------
    | Company
    |--------------------------------------------------------------------------
    | Admin ONLY
    |--------------------------------------------------------------------------
    */

    Route::get('/company', [CompanyController::class, 'index'])
        ->name('company.index')
        ->middleware('admin');

    Route::patch('/company', [CompanyController::class, 'update'])
        ->name('company.update')
        ->middleware('admin');


    /*
    |--------------------------------------------------------------------------
    | Manage Blogs
    |--------------------------------------------------------------------------
    | Admin + Editor + Staff
    |--------------------------------------------------------------------------
    */

    Route::resource('/manage-blog', BlogController::class)
        ->parameters([
            'manage-blog' => 'blog',
        ])
        ->only([
            'index',
            'create',
            'store',
            'show',
        ])
        ->middleware('role:admin,editor,staff');


    /*
    |--------------------------------------------------------------------------
    | Manage Blogs - Edit & Update
    |--------------------------------------------------------------------------
    | Admin + Editor
    |--------------------------------------------------------------------------
    */

    Route::resource('/manage-blog', BlogController::class)
        ->parameters([
            'manage-blog' => 'blog',
        ])
        ->only([
            'edit',
            'update',
        ])
        ->middleware('role:admin,editor');


    /*
    |--------------------------------------------------------------------------
    | Delete Blog
    |--------------------------------------------------------------------------
    | Admin ONLY
    |--------------------------------------------------------------------------
    */

    Route::delete('/manage-blog/{blog}', [BlogController::class, 'destroy'])
        ->name('manage-blog.destroy')
        ->middleware('role:admin');


    /*
    |--------------------------------------------------------------------------
    | Categories
    |--------------------------------------------------------------------------
    | Admin + Editor
    |--------------------------------------------------------------------------
    */

    Route::resource('/categories', CategoryController::class)
        ->except(['show'])
        ->middleware('role:admin,editor');


    /*
    |--------------------------------------------------------------------------
    | Users
    |--------------------------------------------------------------------------
    | Admin ONLY
    |--------------------------------------------------------------------------
    */

    Route::resource('/users', UserController::class)
        ->except(['show'])
        ->middleware('role:admin');

});


/*
|--------------------------------------------------------------------------
| Settings
|--------------------------------------------------------------------------
*/

require __DIR__.'/settings.php';