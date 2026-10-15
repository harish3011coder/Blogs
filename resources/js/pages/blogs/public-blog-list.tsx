import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function PublicBlogList({
    blogs,
    categories = [],
    activeCategory,
}) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <Head title="Blog" />

            <div className="min-h-screen bg-white text-slate-800">

                {/* ================= NAVBAR ================= */}
                <header className="fixed left-0 top-0 z-50 w-full border-b bg-white shadow-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                        <Link
                            href="/"
                            className="text-2xl font-bold tracking-tight text-blue-700"
                        >
                            My Blog
                        </Link>

                        <nav className="hidden items-center gap-8 md:flex">
                            <Link
                                href="/"
                                className="font-medium text-slate-700 transition hover:text-blue-600"
                            >
                                Home
                            </Link>

                            <Link
                                href="/blogs"
                                className="font-medium text-blue-600"
                            >
                                Blog
                            </Link>
                        </nav>

                        <button
                            type="button"
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="rounded-md p-2 text-slate-700 md:hidden"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {menuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>

                    {menuOpen && (
                        <div className="border-t bg-white px-6 py-4 md:hidden">
                            <div className="flex flex-col gap-4">

                                <Link
                                    href="/"
                                    onClick={() => setMenuOpen(false)}
                                    className="font-medium text-slate-700 hover:text-blue-600"
                                >
                                    Home
                                </Link>

                                <Link
                                    href="/blogs"
                                    onClick={() => setMenuOpen(false)}
                                    className="font-medium text-blue-600"
                                >
                                    Blog
                                </Link>

                            </div>
                        </div>
                    )}
                </header>


                {/* ================= CATEGORY BAR ================= */}
                <div className="border-b bg-white pt-[73px]">

                    <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4">

                        <Link
                            href="/blogs"
                            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                                !activeCategory
                                    ? 'border-blue-600 bg-blue-600 text-white'
                                    : 'border-slate-300 text-slate-600 hover:border-blue-500 hover:text-blue-600'
                            }`}
                        >
                            All
                        </Link>

                       {categories.map((category) => (
    <Link
        key={category.id}
        href={`/blogs?category=${encodeURIComponent(category.slug)}`}
        preserveScroll
        className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
            activeCategory === category.slug
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-slate-300 text-slate-600 hover:border-blue-500 hover:text-blue-600'
        }`}
    >
        {category.name}
    </Link>
))}
                    </div>
                </div>


                {/* ================= HERO ================= */}
                <section className="border-b bg-slate-50">

                    <div className="mx-auto max-w-7xl px-6 py-16 text-center">

                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
                            Technical Blog
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                            Latest Articles
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                            Practical tutorials, development guides,
                            technical insights and ideas for modern web
                            development.
                        </p>

                    </div>

                </section>


                {/* ================= BLOG CONTENT ================= */}
                <main className="mx-auto max-w-7xl px-6 py-14">

                    {blogs?.data?.length > 0 ? (

                        <>

                            {/* Section Header */}

                            <div className="mb-8">

                                <h2 className="text-2xl font-bold text-slate-900">
                                    {activeCategory
                                        ? categories.find(
                                              (category) =>
                                                  category.slug ===
                                                  activeCategory,
                                          )?.name || 'Articles'
                                        : 'All Articles'}
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    Explore the latest articles and tutorials.
                                </p>

                            </div>


                            {/* Blog Cards */}

                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                                {blogs.data.map((blog) => (

                                    <article
                                        key={blog.id}
                                        className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                                    >

                                        {/* Image */}

                                        <Link
                                            href={`/blogs/${blog.slug}`}
                                            className="block overflow-hidden"
                                        >

                                            {blog.image ? (

                                                <img
                                                    src={
                                                        blog.image.startsWith(
                                                            'http',
                                                        )
                                                            ? blog.image
                                                            : `/storage/${blog.image}`
                                                    }
                                                    alt={blog.title}
                                                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                                                />

                                            ) : (

                                                <div className="flex h-52 items-center justify-center bg-slate-100">
                                                    <span className="text-sm text-slate-400">
                                                        No Image
                                                    </span>
                                                </div>

                                            )}

                                        </Link>


                                        {/* Content */}

                                        <div className="flex flex-1 flex-col p-6">

                                            {/* Category */}

                                            {blog.category && (

                                                <Link
                                                    href={`/blogs?category=${blog.category.slug}`}
                                                    className="mb-3 inline-block w-fit text-xs font-bold uppercase tracking-wide text-blue-600 hover:underline"
                                                >
                                                    {blog.category.name}
                                                </Link>

                                            )}


                                            {/* Title */}

                                            <h3 className="text-xl font-bold leading-tight text-slate-900">

                                                <Link
                                                    href={`/blogs/${blog.slug}`}
                                                    className="transition hover:text-blue-600"
                                                >
                                                    {blog.title}
                                                </Link>

                                            </h3>


                                            {/* Subtitle */}

                                            {blog.sub_title && (

                                                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                                                    {blog.sub_title}
                                                </p>

                                            )}


                                            {/* Author / Date */}

                                            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-500">

                                                {blog.user?.name && (
                                                    <>
                                                        <span>
                                                            By {blog.user.name}
                                                        </span>

                                                        <span>•</span>
                                                    </>
                                                )}

                                                {blog.created_at && (
                                                    <span>
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
                                                    </span>
                                                )}

                                            </div>


                                            {/* Tags */}

                                            {blog.tags?.length > 0 && (

                                                <div className="mt-4 flex flex-wrap gap-2">

                                                    {blog.tags
                                                        .slice(0, 4)
                                                        .map(
                                                            (
                                                                tag,
                                                                index,
                                                            ) => (

                                                                <span
                                                                    key={index}
                                                                    className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                                                                >
                                                                    #{tag}
                                                                </span>

                                                            ),
                                                        )}

                                                </div>

                                            )}


                                            {/* Read Article */}

                                            <div className="mt-auto pt-6">

                                                <Link
                                                    href={`/blogs/${blog.slug}`}
                                                    className="inline-flex items-center text-sm font-semibold text-blue-600 transition hover:gap-2"
                                                >
                                                    Read Article

                                                    <span className="ml-1">
                                                        →
                                                    </span>

                                                </Link>

                                            </div>

                                        </div>

                                    </article>

                                ))}

                            </div>


                            {/* ================= PAGINATION ================= */}

                            {blogs.links &&
                                blogs.links.length > 3 && (

                                    <div className="mt-12 flex flex-wrap justify-center gap-2">

                                        {blogs.links.map(
                                            (link, index) => (

                                                <Link
                                                    key={index}
                                                    href={
                                                        link.url || '#'
                                                    }
                                                    preserveScroll
                                                    className={`rounded-md border px-4 py-2 text-sm transition ${
                                                        link.active
                                                            ? 'border-blue-600 bg-blue-600 text-white'
                                                            : 'border-slate-300 text-slate-600 hover:border-blue-500 hover:text-blue-600'
                                                    } ${
                                                        !link.url
                                                            ? 'pointer-events-none opacity-40'
                                                            : ''
                                                    }`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />

                                            ),
                                        )}

                                    </div>

                                )}

                        </>

                    ) : (

                        /* ================= EMPTY STATE ================= */

                        <div className="py-20 text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                <span className="text-2xl">
                                    📝
                                </span>
                            </div>

                            <h2 className="mt-5 text-2xl font-bold text-slate-900">
                                No articles found
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-slate-500">
                                There are no articles available in this
                                category yet.
                            </p>

                            {activeCategory && (

                                <Link
                                    href="/blogs"
                                    className="mt-6 inline-flex rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    View All Articles
                                </Link>

                            )}

                        </div>

                    )}

                </main>


                {/* ================= FOOTER ================= */}

                <footer className="mt-10 bg-slate-900 py-10 text-white">

                    <div className="mx-auto max-w-7xl px-6">

                        <div className="grid gap-8 md:grid-cols-3">

                            {/* Brand */}

                            <div>

                                <Link
                                    href="/"
                                    className="text-2xl font-bold"
                                >
                                    My Blog
                                </Link>

                                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                                    Technical articles, tutorials and
                                    development insights.
                                </p>

                            </div>


                            {/* Categories */}

                            <div>

                                <h3 className="mb-4 font-semibold">
                                    Categories
                                </h3>

                                <div className="flex flex-col gap-2 text-sm text-slate-400">

                                    {categories
                                        .slice(0, 5)
                                        .map((category) => (

                                            <Link
                                                key={category.id}
                                                href={`/blogs?category=${category.slug}`}
                                                className="hover:text-white"
                                            >
                                                {category.name}
                                            </Link>

                                        ))}

                                </div>

                            </div>


                            {/* Navigation */}

                            <div>

                                <h3 className="mb-4 font-semibold">
                                    Navigation
                                </h3>

                                <div className="flex flex-col gap-2 text-sm text-slate-400">

                                    <Link
                                        href="/"
                                        className="hover:text-white"
                                    >
                                        Home
                                    </Link>

                                    <Link
                                        href="/blogs"
                                        className="hover:text-white"
                                    >
                                        Blog
                                    </Link>

                                </div>

                            </div>

                        </div>


                        {/* Copyright */}

                        <div className="mt-8 border-t border-slate-700 pt-6 text-sm text-slate-500">
                            © {new Date().getFullYear()} My Blog. All rights reserved.
                        </div>

                    </div>

                </footer>

            </div>
        </>
    );
}