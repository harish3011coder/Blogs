<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

  protected $fillable = [
    'title',
    'sub_title',
    'slug',
    'body',
    'status',
    'image',
    'category_id',
    'user_id',
    'tags',
];

    protected $casts = [
        'tags' => 'array',
    ];

    public function getRouteKeyName()
{
    return 'slug';
}

    /**
     * Get the user that owns the blog.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category that owns the blog.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}