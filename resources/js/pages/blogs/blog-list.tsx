import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Head, Link, router } from '@inertiajs/react';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

type BlogListProps = {
    blogs: any;
    categories?: any[];
    filters?: {
        search?: string;
        category?: string | number;
        status?: string;
    };
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canPublish?: boolean;
};

export default function BlogList({
    blogs,
    categories = [],
    filters = {},
    canCreate = false,
    canEdit = false,
    canDelete = false,
}: BlogListProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(
        filters.category?.toString() || '',
    );
    const [status, setStatus] = useState(filters.status || '');

    const shouldShowPagination =
        blogs?.links && blogs.links.length > 3;

    /*
    |--------------------------------------------------------------------------
    | Apply Filters
    |--------------------------------------------------------------------------
    */

    const handleFilter = () => {
        router.get(
            '/manage-blog',
            {
                search: search || undefined,
                category: category || undefined,
                status: status || undefined,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Clear Filters
    |--------------------------------------------------------------------------
    */

    const handleClearFilters = () => {
        setSearch('');
        setCategory('');
        setStatus('');

        router.get(
            '/manage-blog',
            {},
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const handleDelete = (blog: any) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${blog.title}"?`,
        );

        if (!confirmed) {
            return;
        }

        router.delete(`/manage-blog/${blog.slug}`, {
            preserveScroll: true,
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Status Badge
    |--------------------------------------------------------------------------
    */

    const getStatusClass = (blogStatus: string) => {
        if (blogStatus === 'published') {
            return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
        }

        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    };

    return (
        <>
            <Head title="Manage Blogs" />

            <div className="flex h-full w-full flex-col items-center gap-4 p-4">

                {/* =====================================================
                    Header
                ====================================================== */}

                <div className="mb-2 flex w-full max-w-6xl items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-bold">
                            Manage Blogs
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Create, manage and publish your blog articles.
                        </p>
                    </div>

                    {canCreate && (
                        <Link href="/manage-blog/create">
                            <Button>
                                Create New Blog
                            </Button>
                        </Link>
                    )}

                </div>


                {/* =====================================================
                    Filters
                ====================================================== */}

                <div className="flex w-full max-w-6xl flex-col gap-3 rounded-lg border bg-card p-4 md:flex-row">

                    {/* Search */}

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleFilter();
                            }
                        }}
                        placeholder="Search blogs..."
                        className="h-10 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />


                    {/* Category */}

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring md:w-52"
                    >
                        <option value="">
                            All Categories
                        </option>

                        {categories.map((item) => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>


                    {/* Status */}

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring md:w-44"
                    >
                        <option value="">
                            All Statuses
                        </option>

                        <option value="draft">
                            Draft
                        </option>

                        <option value="published">
                            Published
                        </option>
                    </select>


                    {/* Search */}

                    <Button onClick={handleFilter}>
                        Search
                    </Button>


                    {/* Clear */}

                    {(search || category || status) && (
                        <Button
                            variant="outline"
                            onClick={handleClearFilters}
                        >
                            Clear
                        </Button>
                    )}

                </div>


                {/* =====================================================
                    Blog List
                ====================================================== */}

                <ScrollArea className="h-full w-full max-w-6xl rounded-lg p-4">

                    {blogs?.data?.length > 0 ? (

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                            {blogs.data.map((blog: any) => (

                                <Card
                                    key={blog.id}
                                    className="flex flex-col overflow-hidden py-0"
                                >

                                    {/* Image */}

                                    {blog.image ? (

                                        <div className="relative h-48 w-full overflow-hidden">

                                            <img
                                                src={
                                                    blog.image.startsWith(
                                                        'http',
                                                    )
                                                        ? blog.image
                                                        : `/storage/${blog.image}`
                                                }
                                                alt={blog.title}
                                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                            />

                                        </div>

                                    ) : (

                                        <div className="relative flex h-48 w-full items-center justify-center bg-muted">

                                            <PlaceholderPattern
                                                className="size-16 stroke-neutral-900/20 dark:stroke-neutral-100/20"
                                            />

                                        </div>

                                    )}


                                    {/* Header */}

                                    <CardHeader>

                                        <div className="flex items-start justify-between gap-3">

                                            <CardTitle className="line-clamp-2 text-xl font-semibold">

                                                <Link
                                                    href={`/manage-blog/${blog.slug}`}
                                                    className="hover:underline"
                                                >
                                                    {blog.title}
                                                </Link>

                                            </CardTitle>


                                            {/* Status */}

                                            <span
                                                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusClass(
                                                    blog.status,
                                                )}`}
                                            >
                                                {blog.status}
                                            </span>

                                        </div>


                                        {/* Subtitle */}

                                        {blog.sub_title && (
                                            <CardDescription className="line-clamp-2">
                                                {blog.sub_title}
                                            </CardDescription>
                                        )}


                                        {/* Author / Category / Date */}

                                        <CardDescription className="text-sm">

                                            {blog.user && (
                                                <>
                                                    By {blog.user.name}
                                                </>
                                            )}

                                            {blog.category && (
                                                <>
                                                    {' • '}
                                                    {blog.category.name}
                                                </>
                                            )}

                                            {' • '}

                                            {new Date(
                                                blog.created_at,
                                            ).toLocaleDateString(
                                                'en-IN',
                                                {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                },
                                            )}

                                        </CardDescription>

                                    </CardHeader>


                                    {/* Content */}

                                    <CardContent className="flex-grow">

                                        <div className="line-clamp-4 text-sm text-muted-foreground">

                                            <ReactMarkdown>
                                                {blog.body}
                                            </ReactMarkdown>

                                        </div>


                                        {/* Tags */}

                                        {blog.tags?.length > 0 && (

                                            <div className="mt-4 flex flex-wrap gap-2">

                                                {blog.tags.map(
                                                    (
                                                        tag: string,
                                                        index: number,
                                                    ) => (

                                                        <span
                                                            key={index}
                                                            className="rounded-full bg-muted px-2 py-1 text-xs"
                                                        >
                                                            #{tag}
                                                        </span>

                                                    ),
                                                )}

                                            </div>

                                        )}

                                    </CardContent>


                                    {/* Footer */}

                                    <CardFooter className="flex flex-wrap gap-2 pb-4">

                                        {/* View Admin Blog */}

                                        <Link
                                            href={`/manage-blog/${blog.slug}`}
                                        >
                                            <Button variant="outline">
                                                View
                                            </Button>
                                        </Link>


                                        {/* View Public Blog */}

                                        <Link
                                            href={`/blogs/${blog.slug}`}
                                            target="_blank"
                                        >
                                            <Button variant="outline">
                                                Public View
                                            </Button>
                                        </Link>


                                        {/* Edit */}

                                        {canEdit && (

                                            <Link
                                                href={`/manage-blog/${blog.slug}/edit`}
                                            >
                                                <Button variant="outline">
                                                    Edit
                                                </Button>
                                            </Link>

                                        )}


                                        {/* Delete */}

                                        {canDelete && (

                                            <Button
                                                variant="destructive"
                                                onClick={() =>
                                                    handleDelete(blog)
                                                }
                                            >
                                                Delete
                                            </Button>

                                        )}

                                    </CardFooter>

                                </Card>

                            ))}

                        </div>

                    ) : (

                        <Card className="flex h-64 flex-col items-center justify-center gap-4 rounded-xl p-4">

                            <PlaceholderPattern
                                className="size-16 stroke-neutral-900/20 dark:stroke-neutral-100/20"
                            />

                            <p className="text-muted-foreground">
                                No blogs found.
                            </p>

                            {canCreate && (

                                <Link href="/manage-blog/create">

                                    <Button>
                                        Create Your First Blog
                                    </Button>

                                </Link>

                            )}

                        </Card>

                    )}

                </ScrollArea>


                {/* =====================================================
                    Pagination
                ====================================================== */}

                {shouldShowPagination && (

                    <div className="mt-8 flex w-full max-w-4xl justify-center">

                        <Pagination>

                            <PaginationContent>

                                {blogs.links.map(
                                    (
                                        link: any,
                                        index: number,
                                    ) => {

                                        const isPrevious =
                                            link.label.includes(
                                                'Previous',
                                            ) ||
                                            link.label.includes(
                                                '&laquo;',
                                            );

                                        const isNext =
                                            link.label.includes(
                                                'Next',
                                            ) ||
                                            link.label.includes(
                                                '&raquo;',
                                            );

                                        const isEllipsis =
                                            link.label === '...';


                                        if (isPrevious) {

                                            return (
                                                <PaginationItem
                                                    key={index}
                                                >
                                                    <PaginationPrevious
                                                        href={
                                                            link.url || '#'
                                                        }
                                                        className={
                                                            !link.url
                                                                ? 'pointer-events-none opacity-50'
                                                                : ''
                                                        }
                                                    />
                                                </PaginationItem>
                                            );

                                        }


                                        if (isNext) {

                                            return (
                                                <PaginationItem
                                                    key={index}
                                                >
                                                    <PaginationNext
                                                        href={
                                                            link.url || '#'
                                                        }
                                                        className={
                                                            !link.url
                                                                ? 'pointer-events-none opacity-50'
                                                                : ''
                                                        }
                                                    />
                                                </PaginationItem>
                                            );

                                        }


                                        if (isEllipsis) {

                                            return (
                                                <PaginationItem
                                                    key={index}
                                                >
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            );

                                        }


                                        return (
                                            <PaginationItem
                                                key={index}
                                            >
                                                <PaginationLink
                                                    href={
                                                        link.url || '#'
                                                    }
                                                    isActive={
                                                        link.active
                                                    }
                                                >
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label,
                                                        }}
                                                    />
                                                </PaginationLink>
                                            </PaginationItem>
                                        );

                                    },
                                )}

                            </PaginationContent>

                        </Pagination>

                    </div>

                )}

            </div>
        </>
    );
}