import { Head } from '@inertiajs/react';
import { Moon, Sun, ArrowUpRight, Search } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useAppearance } from '@/hooks/use-appearance';

type Blog = {
    id: number;
    title: string;
    slug: string;
    sub_title?: string;
    image?: string;
    created_at: string;
    user?: {
        name: string;
    };
    category?: {
        name: string;
        slug: string;
    };
};

type Category = {
    id: number;
    name: string;
    slug: string;
    blogs_count: number;
};

type Props = {
    latestBlogs: Blog[];
    categories: Category[];
};

export default function Welcome({
    latestBlogs = [],
    categories = [],
}: Props) {

 

    const [search, setSearch] = useState('');

    /*
    |--------------------------------------------------------------------------
    | Image URL
    |--------------------------------------------------------------------------
    */

    const imageUrl = (image?: string) => {
        if (!image) {
            return null;
        }

        if (image.startsWith('http')) {
            return image;
        }

        return `/storage/${image}`;
    };

    /*
    |--------------------------------------------------------------------------
    | Date
    |--------------------------------------------------------------------------
    */

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Theme
    |--------------------------------------------------------------------------
    */

    const { appearance, updateAppearance } = useAppearance();

    const toggleAppearance = () => {
        updateAppearance(appearance === 'dark' ? 'light' : 'dark');
    };

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();

        const value = search.trim();

        if (!value) {
            window.location.href = '/blogs';
            return;
        }

        window.location.href = `/blogs?search=${encodeURIComponent(value)}`;
    };

    return (
        <>
            <Head title="DevBlog" />

            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">

                {/* =====================================================
                    Header
                ====================================================== */}

                <header>
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-9">

                        {/* Logo */}

                        <a
                            href="/"
                            className="text-lg font-normal tracking-tight"
                        >
                            DevBlog
                        </a>

                        {/* Navigation */}

                        <nav className="flex items-center gap-7 text-sm">

                            <a
                                href="/blogs"
                                className="transition-opacity hover:opacity-50"
                            >
                                Blog
                            </a>

                            <button
                                type="button"
                                onClick={toggleAppearance}
                                aria-label="Toggle theme"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground hover:text-background"
                            >
                                {appearance === 'dark' ? (
                                    <Sun className="h-4 w-4" />
                                ) : (
                                    <Moon className="h-4 w-4" />
                                )}
                            </button>

                        </nav>
                    </div>
                </header>


                <main>

                    {/* =================================================
                        Search
                    ================================================== */}

                    <section className="mx-auto max-w-6xl px-6 pt-2">

                        <form
                            onSubmit={handleSearch}
                            className="mx-auto flex max-w-2xl items-center gap-3"
                        >

                            <div className="relative flex-1">

                                <Search
                                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                />

                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search articles, topics or tags..."
                                    className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-5 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                                />

                            </div>

                            <button
                                type="submit"
                                className="h-12 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-80"
                            >
                                Search
                            </button>

                        </form>

                    </section>


                    {/* =================================================
                        Topics
                    ================================================== */}

                    {categories.length > 0 && (

                        <section className="mx-auto max-w-6xl px-6 pt-10">

                            <div className="flex flex-wrap items-center gap-3">

                                <div className="w-full mb-2">
                                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                                        Topics
                                    </span>
                                    <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                                        Explore ideas and tutorials across different technologies.
                                    </p>
                                </div>

                                {categories.map((category) => (

                                    <a
                                        key={category.id}
                                        href={`/blogs?category=${category.slug}`}
                                        className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"
                                    >
                                        {category.name}
                                    </a>

                                ))}

                            </div>

                        </section>

                    )}


                    {/* =================================================
                        Hero
                    ================================================== */}

                    <section className="mx-auto max-w-6xl px-6 pb-24 pt-24">

                        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            Developer Journal
                        </p>

                        <h1 className="max-w-5xl text-5xl font-normal leading-[1.05] tracking-[-0.035em] sm:text-6xl md:text-7xl">
                            Ideas, tutorials, and things worth building.
                        </h1>

                        <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
                            Practical writing about Laravel, React, PHP,
                            JavaScript, AI and modern web development.
                        </p>

                    </section>


                    {/* =================================================
                        Latest Articles
                    ================================================== */}

                    <section className="mx-auto max-w-6xl px-6">

                        {latestBlogs.length > 0 ? (

                            <>

                                <div className="mb-10 flex items-end justify-between">

                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                            Latest
                                        </p>

                                        <h2 className="mt-2 text-3xl font-normal tracking-tight">
                                            Latest Articles
                                        </h2>

                                        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                                            Fresh insights, guides, and technical stories from the blog.
                                        </p>
                                    </div>

                                    <a
                                        href="/blogs"
                                        className="hidden text-sm underline underline-offset-4 transition-opacity hover:opacity-50 sm:block"
                                    >
                                        View all →
                                    </a>

                                </div>


                                <div className="grid gap-x-8 gap-y-16 md:grid-cols-3">

                                    {latestBlogs.map((blog) => {

                                        const image = imageUrl(blog.image);

                                        return (

                                            <article
                                                key={blog.id}
                                                className="group"
                                            >

                                                {/* =====================
                                                    Image
                                                ====================== */}

                                                <a
                                                    href={`/blogs/${blog.slug}`}
                                                    className="block"
                                                >

                                                    <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">

                                                        {image ? (

                                                            <img
                                                                src={image}
                                                                alt={blog.title}
                                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                            />

                                                        ) : (

                                                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/40 transition-transform duration-500 group-hover:scale-[1.03]">

                                                                <span className="text-5xl font-light tracking-tight text-muted-foreground/30">
                                                                    {blog.title
                                                                        .charAt(0)
                                                                        .toUpperCase()}
                                                                </span>

                                                            </div>

                                                        )}

                                                    </div>

                                                </a>


                                                {/* =====================
                                                    Category + Date
                                                ====================== */}

                                                <div
                                                    className="mt-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"
                                                >

                                                    {blog.category?.name && (
                                                        <span>
                                                            {blog.category.name}
                                                        </span>
                                                    )}

                                                    {blog.category?.name && (
                                                        <span>·</span>
                                                    )}

                                                    <span>
                                                        {formatDate(
                                                            blog.created_at,
                                                        )}
                                                    </span>

                                                </div>


                                                {/* =====================
                                                    Title
                                                ====================== */}

                                                <a
                                                    href={`/blogs/${blog.slug}`}
                                                >

                                                    <h2 className="mt-3 text-3xl font-normal leading-[1.1] tracking-[-0.025em] transition-opacity group-hover:opacity-60">
                                                        {blog.title}
                                                    </h2>

                                                </a>


                                                {/* =====================
                                                    Subtitle
                                                ====================== */}

                                                {blog.sub_title && (

                                                    <p className="mt-4 text-base leading-7 text-muted-foreground">
                                                        {blog.sub_title}
                                                    </p>

                                                )}


                                                {/* =====================
                                                    Author
                                                ====================== */}

                                                <div className="mt-5 text-sm text-muted-foreground">

                                                    Created by{' '}

                                                    <span className="font-medium text-foreground">
                                                        {blog.user?.name ||
                                                            'Admin'}
                                                    </span>

                                                </div>


                                                {/* =====================
                                                    View Article
                                                ====================== */}

                                                <a
                                                    href={`/blogs/${blog.slug}`}
                                                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-50"
                                                >

                                                    View article

                                                    <ArrowUpRight className="h-4 w-4" />

                                                </a>

                                            </article>

                                        );

                                    })}

                                </div>

                            </>

                        ) : (

                            <div className="py-20 text-center">

                                <p className="text-muted-foreground">
                                    No articles available.
                                </p>

                            </div>

                        )}

                    </section>


                    {/* =================================================
                        About
                    ================================================== */}

                    <section className="mt-32 border-t border-border">

                        <div className="mx-auto max-w-3xl px-6 py-32 text-center">

                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                About DevBlog
                            </p>

                            <p className="mt-3 text-sm text-muted-foreground">
                                Learn, experiment, and share what is worth building.
                            </p>

                            <h2 className="mt-5 text-4xl font-normal tracking-tight sm:text-5xl">
                                A place for ideas worth sharing.
                            </h2>

                            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
                                Practical writing about Laravel, React, PHP,
                                JavaScript, AI and modern web development.
                            </p>

                            <a
                                href="/blogs"
                                className="mt-8 inline-block text-sm underline underline-offset-4 transition-opacity hover:opacity-50"
                            >
                                Read all articles →
                            </a>

                        </div>

                    </section>

                </main>


                {/* =====================================================
                    Footer
                ====================================================== */}

                <footer className="border-t border-border">

                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">

                        <p>
                            © {new Date().getFullYear()} DevBlog. All rights
                            reserved.
                        </p>

                        <p>
                            Developed by{' '}

                            <a
                                href="https://lyresoftronic.com/"
                                className="font-medium text-foreground transition-opacity hover:opacity-60"
                            >
 Lyre Softronic Technologies Pvt Ltd                            </a>
                        </p>

                        <div className="flex gap-6">

                            <a
                                href="/"
                                className="transition-colors hover:text-foreground"
                            >
                                Home
                            </a>

                            <a
                                href="/blogs"
                                className="transition-colors hover:text-foreground"
                            >
                                Blog
                            </a>

                        </div>

                    </div>

                </footer>

            </div>
        </>
    );
}