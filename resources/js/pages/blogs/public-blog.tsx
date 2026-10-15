import { Head, Link } from '@inertiajs/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface User {
    id: number;
    name: string;
}

interface Blog {
    id: number;
    title: string;
    sub_title?: string | null;
    slug: string;
    body: string;
    html_body?: string;
    image?: string | null;
    image_url?: string | null;
    tags?: string[] | null;
    status?: string;
    created_at?: string;
    user?: User;
    category?: Category;
}

interface Props {
    blog: Blog;
}

export default function PublicBlog({ blog }: Props) {
    const imageUrl =
        blog.image_url ||
        (blog.image
            ? blog.image.startsWith('http')
                ? blog.image
                : `/storage/${blog.image}`
            : null);

    const formattedDate = blog.created_at
        ? new Date(blog.created_at).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null;

    return (
        <>
            <Head title={blog.title} />

            <div className="min-h-screen bg-white text-slate-800">

                {/* ================= NAVBAR ================= */}

                <header className="sticky top-0 z-50 border-b bg-white shadow-sm">

                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                        <Link
                            href="/"
                            className="text-2xl font-bold tracking-tight text-blue-700"
                        >
                            My Blog
                        </Link>

                        <nav className="flex items-center gap-8">

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

                    </div>

                </header>


                {/* ================= ARTICLE HEADER ================= */}

                <section className="border-b bg-slate-50">

                    <div className="mx-auto max-w-4xl px-6 py-14 md:py-20">

                        {/* CATEGORY */}

                        {blog.category && (
                            <Link
                                href={`/blogs?category=${encodeURIComponent(
                                    blog.category.slug,
                                )}`}
                                className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                            >
                                {blog.category.name}
                            </Link>
                        )}


                        {/* TITLE */}

                        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
                            {blog.title}
                        </h1>


                        {/* SUBTITLE */}

                        {blog.sub_title && (
                            <p className="mt-5 text-xl leading-8 text-slate-600">
                                {blog.sub_title}
                            </p>
                        )}


                        {/* AUTHOR + DATE */}

                        <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-slate-500">

                            {blog.user?.name && (
                                <>
                                    <div className="flex items-center gap-2">

                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                                            {blog.user.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <span className="font-medium text-slate-700">
                                            {blog.user.name}
                                        </span>

                                    </div>
                                </>
                            )}

                            {formattedDate && (
                                <>
                                    <span>•</span>

                                    <span>
                                        {formattedDate}
                                    </span>
                                </>
                            )}

                        </div>

                    </div>

                </section>


                {/* ================= FEATURED IMAGE ================= */}

                {imageUrl && (
                    <section className="mx-auto max-w-5xl px-6 pt-10">

                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">

                            <img
                                src={imageUrl}
                                alt={blog.title}
                                className="max-h-[600px] w-full object-cover"
                            />

                        </div>

                    </section>
                )}


                {/* ================= ARTICLE CONTENT ================= */}

                <main className="mx-auto max-w-4xl px-6 py-12 md:py-16">

                    <article
                        className="
                            prose
                            prose-slate
                            max-w-none

                            prose-headings:font-bold
                            prose-headings:text-slate-900

                            prose-h1:text-3xl
                            prose-h1:leading-tight

                            prose-h2:mt-12
                            prose-h2:text-2xl

                            prose-h3:mt-8
                            prose-h3:text-xl

                            prose-p:text-[17px]
                            prose-p:leading-8
                            prose-p:text-slate-700

                            prose-a:font-medium
                            prose-a:text-blue-600
                            prose-a:no-underline
                            hover:prose-a:underline

                            prose-strong:text-slate-900

                            prose-li:text-slate-700
                            prose-li:leading-7

                            prose-blockquote:border-blue-500
                            prose-blockquote:text-slate-600

                            prose-code:rounded
                            prose-code:bg-slate-100
                            prose-code:px-1.5
                            prose-code:py-0.5
                            prose-code:text-sm

                            prose-pre:rounded-xl
                            prose-pre:bg-slate-900

                            prose-img:rounded-xl
                        "
                    >

                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                        >
                            {blog.body}
                        </ReactMarkdown>

                    </article>


                    {/* ================= TAGS ================= */}

                    {blog.tags && blog.tags.length > 0 && (

                        <div className="mt-12 border-t pt-8">

                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                                Tags
                            </h3>

                            <div className="flex flex-wrap gap-2">

                                {blog.tags.map((tag, index) => (

                                    <span
                                        key={index}
                                        className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-600"
                                    >
                                        #{tag}
                                    </span>

                                ))}

                            </div>

                        </div>

                    )}


                    {/* ================= NAVIGATION ================= */}

                    <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-8">

                        <Link
                            href="/blogs"
                            className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
                        >
                            ← Back to Blog
                        </Link>

                        <Link
                            href="/"
                            className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Go to Home
                        </Link>

                    </div>

                </main>


                {/* ================= FOOTER ================= */}

                <footer className="mt-10 bg-slate-900 py-10 text-white">

                    <div className="mx-auto max-w-7xl px-6">

                        <div className="grid gap-8 md:grid-cols-3">

                            {/* BRAND */}

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


                            {/* CATEGORIES */}

                            <div>

                                <h3 className="mb-4 font-semibold">
                                    Category
                                </h3>

                                {blog.category && (

                                    <Link
                                        href={`/blogs?category=${encodeURIComponent(
                                            blog.category.slug,
                                        )}`}
                                        className="text-sm text-slate-400 transition hover:text-white"
                                    >
                                        {blog.category.name}
                                    </Link>

                                )}

                            </div>


                            {/* NAVIGATION */}

                            <div>

                                <h3 className="mb-4 font-semibold">
                                    Navigation
                                </h3>

                                <div className="flex flex-col gap-2 text-sm text-slate-400">

                                    <Link
                                        href="/"
                                        className="transition hover:text-white"
                                    >
                                        Home
                                    </Link>

                                    <Link
                                        href="/blogs"
                                        className="transition hover:text-white"
                                    >
                                        Blog
                                    </Link>

                                </div>

                            </div>

                        </div>


                        {/* COPYRIGHT */}

                        <div className="mt-8 border-t border-slate-700 pt-6 text-sm text-slate-500">
                            © {new Date().getFullYear()} My Blog. All rights reserved.
                        </div>

                    </div>

                </footer>

            </div>
        </>
    );
}