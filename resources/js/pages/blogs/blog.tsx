import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';


import { Head, Link } from '@inertiajs/react';
import ReactMarkdown from 'react-markdown';



export default function Blog({ blog }) {
    return (
        <>
            <Head title={blog.title} />

            <div className="mx-auto w-full max-w-5xl p-6">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            View Blog
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            View your blog article and its details.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Link href="/manage-blog">
                            <Button variant="outline">
                                Back
                            </Button>
                        </Link>

                        <Link href={`/blogs/${blog.slug}/edit`}>
                            <Button>
                                Edit Blog
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Blog Card */}
                <Card className="overflow-hidden">

                    {/* Cover Image */}
                    {blog.image ? (
                        <div className="relative h-72 w-full overflow-hidden">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="relative flex h-56 w-full items-center justify-center bg-muted">
                            <PlaceholderPattern
                                className="size-20 stroke-neutral-900/20 dark:stroke-neutral-100/20"
                            />
                        </div>
                    )}

                    {/* Blog Header */}
                    <CardHeader className="space-y-3">

                        {/* Category */}
                        {blog.category && (
                            <div>
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                    {blog.category.name}
                                </span>
                            </div>
                        )}

                        <CardTitle className="text-3xl font-bold">
                            {blog.title}
                        </CardTitle>

                        {blog.sub_title && (
                            <CardDescription className="text-base">
                                {blog.sub_title}
                            </CardDescription>
                        )}

                        {/* Author / Date */}
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            {blog.user && (
                                <span>
                                    By {blog.user.name}
                                </span>
                            )}

                            <span>•</span>

                            <span>
                                {new Date(
                                    blog.created_at,
                                ).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </span>

                            {blog.updated_at !== blog.created_at && (
                                <>
                                    <span>•</span>

                                    <span>
                                        Updated{' '}
                                        {new Date(
                                            blog.updated_at,
                                        ).toLocaleDateString('en-IN', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </>
                            )}
                        </div>

                    </CardHeader>

                    {/* Blog Content */}
                    <CardContent>

                        <article className="prose prose-neutral max-w-none dark:prose-invert">
                            <ReactMarkdown>
                                {blog.body}
                            </ReactMarkdown>
                        </article>

                        {/* Tags */}
                        {blog.tags?.length > 0 && (
                            <div className="mt-8 border-t pt-6">
                                <h3 className="mb-3 text-sm font-semibold">
                                    Tags
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full bg-muted px-3 py-1 text-xs"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </CardContent>

                    {/* Footer */}
                    <CardFooter className="flex justify-between border-t">

                        <Link href="/blogs">
                            <Button variant="outline">
                                ← Back to Blogs
                            </Button>
                        </Link>

                        <Link href={`/blogs/${blog.slug}/edit`}>
                            <Button>
                                Edit Blog
                            </Button>
                        </Link>

                    </CardFooter>

                </Card>
            </div>
        </>
    );
}