<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        {{ $activeCategory ? ucfirst($activeCategory) . ' - ' : '' }}Blog | DevBlog
    </title>

    <style>
        * {
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            margin: 0;
            font-family:
                Inter,
                ui-sans-serif,
                system-ui,
                -apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                sans-serif;
            background: #fff;
            color: #111;
        }

        a {
            color: inherit;
            text-decoration: none;
        }

        .container {
            width: min(1180px, calc(100% - 40px));
            margin: auto;
        }

        /* =========================
           HEADER
        ========================= */

        header {
            border-bottom: 1px solid #e5e5e5;
        }

        .header-inner {
            height: 82px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .logo {
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.04em;
        }

        nav {
            display: flex;
            gap: 28px;
            font-size: 14px;
            font-weight: 500;
        }

        nav a {
            transition: opacity .2s ease;
        }

        nav a:hover {
            opacity: .55;
        }

        /* =========================
           HERO
        ========================= */

        .hero {
            padding: 100px 0 75px;
            border-bottom: 1px solid #e5e5e5;
        }

        .eyebrow {
            margin-bottom: 20px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: .18em;
            text-transform: uppercase;
            color: #777;
        }

        .hero h1 {
            margin: 0;
            max-width: 850px;
            font-size: clamp(48px, 7vw, 82px);
            line-height: .98;
            letter-spacing: -.06em;
        }

        .hero p {
            max-width: 650px;
            margin-top: 28px;
            font-size: 18px;
            line-height: 1.7;
            color: #666;
        }

        /* =========================
           CATEGORIES
        ========================= */

        .categories {
            padding: 30px 0;
            border-bottom: 1px solid #e5e5e5;
        }

        .category-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .category {
            padding: 9px 16px;
            border: 1px solid #ddd;
            border-radius: 999px;
            font-size: 13px;
            font-weight: 600;
            transition:
                background .2s ease,
                color .2s ease,
                border-color .2s ease;
        }

        .category:hover,
        .category.active {
            background: #111;
            color: #fff;
            border-color: #111;
        }

        /* =========================
           BLOG SECTION
        ========================= */

        .blog-section {
            padding: 70px 0 100px;
        }

        .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 45px;
        }

        .section-header h2 {
            margin: 0;
            font-size: 32px;
            letter-spacing: -.04em;
        }

        .count {
            font-size: 14px;
            color: #777;
        }

        /* =========================
           BLOG GRID
        ========================= */

        .blog-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 70px 32px;
        }

        .blog-card {
            display: block;
            min-width: 0;
        }

        /* =========================
           BLOG IMAGE
        ========================= */

        .image-wrapper {
            overflow: hidden;
            background: #f3f3f3;
            aspect-ratio: 16 / 10;
            margin-bottom: 24px;
            border-radius: 14px;
        }

        .image-wrapper img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform .5s ease;
        }

        .blog-card:hover .image-wrapper img {
            transform: scale(1.035);
        }

        .image-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
            font-size: 13px;
        }

        /* =========================
           BLOG META
        ========================= */

        .meta {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 9px;
            margin-bottom: 12px;
            font-size: 11px;
            font-weight: 600;
            color: #777;
            text-transform: uppercase;
            letter-spacing: .08em;
        }

        /* =========================
           BLOG TITLE
        ========================= */

        .blog-card h3 {
            margin: 0;
            font-size: 27px;
            line-height: 1.15;
            letter-spacing: -.035em;
        }

        .blog-card:hover h3 {
            text-decoration: underline;
            text-underline-offset: 5px;
        }

        /* =========================
           SUBTITLE
        ========================= */

        .subtitle {
            margin-top: 14px;
            color: #666;
            font-size: 15px;
            line-height: 1.7;
        }

        /* =========================
           READ MORE
        ========================= */

        .read-more {
            display: inline-block;
            margin-top: 20px;
            font-size: 13px;
            font-weight: 700;
        }

        .author {
            font-weight: 400;
            color: #777;
        }

        /* =========================
           EMPTY STATE
        ========================= */

        .empty {
            padding: 100px 20px;
            text-align: center;
            border: 1px solid #e5e5e5;
        }

        .empty h3 {
            margin: 0 0 10px;
            font-size: 25px;
        }

        .empty p {
            margin: 0;
            color: #777;
        }

        .empty-link {
            display: inline-block;
            margin-top: 25px;
            font-weight: 700;
            text-decoration: underline;
            text-underline-offset: 4px;
        }

        /* =========================
           PAGINATION
        ========================= */

        .pagination {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 80px;
            padding-top: 28px;
            border-top: 1px solid #e5e5e5;
        }

        .pagination-side {
            min-width: 100px;
        }

        .pagination-side.right {
            text-align: right;
        }

        .pagination-link {
            font-size: 13px;
            font-weight: 600;
            transition: opacity .2s ease;
        }

        .pagination-link:hover {
            opacity: .5;
        }

        .pagination-link.disabled {
            color: #ccc;
            pointer-events: none;
        }

        .pagination-pages {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .pagination-page {
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-size: 13px;
            transition:
                background .2s ease,
                color .2s ease;
        }

        .pagination-page:hover {
            background: #f1f1f1;
        }

        .pagination-page.active {
            background: #111;
            color: #fff;
        }

        /* =========================
           FOOTER
        ========================= */

        footer {
            border-top: 1px solid #e5e5e5;
        }

        .footer-inner {
            min-height: 120px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 13px;
            color: #666;
        }

        .footer-links {
            display: flex;
            gap: 25px;
        }

        .footer-links a {
            transition: opacity .2s ease;
        }

        .footer-links a:hover {
            opacity: .5;
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 950px) {

            .blog-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 60px 30px;
            }

            .blog-card h3 {
                font-size: 26px;
            }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 700px) {

            .container {
                width: min(100% - 28px, 1180px);
            }

            .header-inner {
                height: 70px;
            }

            nav {
                gap: 15px;
            }

            .hero {
                padding: 70px 0 55px;
            }

            .hero h1 {
                font-size: 48px;
            }

            .hero p {
                font-size: 16px;
            }

            .blog-section {
                padding: 55px 0 70px;
            }

            .blog-grid {
                grid-template-columns: 1fr;
                gap: 55px;
            }

            .blog-card h3 {
                font-size: 25px;
            }

            .section-header {
                align-items: flex-start;
                flex-direction: column;
                gap: 10px;
                margin-bottom: 35px;
            }

            .pagination {
                margin-top: 60px;
            }

            .pagination-side {
                min-width: auto;
            }

            .pagination-pages {
                gap: 2px;
            }

            .pagination-page {
                width: 34px;
                height: 34px;
            }

            .footer-inner {
                padding: 30px 0;
                align-items: flex-start;
                flex-direction: column;
                gap: 20px;
            }

            .footer-links {
                gap: 18px;
            }
        }

        /* =========================
           SMALL MOBILE
        ========================= */

        @media (max-width: 450px) {

            .header-inner {
                align-items: center;
            }

            .logo {
                font-size: 21px;
            }

            nav {
                font-size: 13px;
                gap: 12px;
            }

            .hero h1 {
                font-size: 42px;
            }

            .pagination-link {
                font-size: 12px;
            }
        }
    </style>
</head>

<body>

<header>

    <div class="container header-inner">

        <a href="/" class="logo">
            DevBlog
        </a>

        <nav>
            <a href="/">
                Home
            </a>

            <a href="/blogs">
                Blog
            </a>
        </nav>

    </div>

</header>

<main>

    {{-- =========================
         HERO
    ========================= --}}

    <section class="hero">

        <div class="container">

            <div class="eyebrow">
                Developer Journal
            </div>

            <h1>
                Articles, ideas and things worth building.
            </h1>

            <p>
                Practical tutorials, development notes and useful ideas
                about modern web development.
            </p>

        </div>

    </section>


    {{-- =========================
         CATEGORIES
    ========================= --}}

    @if($categories->count())

        <section class="categories">

            <div class="container">

                <div class="category-list">

                    {{-- All --}}

                    <a
                        href="/blogs"
                        class="category {{ !$activeCategory ? 'active' : '' }}"
                    >
                        All
                    </a>

                    {{-- Categories --}}

                    @foreach($categories as $category)

                        <a
                            href="/blogs?category={{ urlencode($category->slug) }}"
                            class="category {{ $activeCategory === $category->slug ? 'active' : '' }}"
                        >
                            {{ $category->name }}
                        </a>

                    @endforeach

                </div>

            </div>

        </section>

    @endif


    {{-- =========================
         BLOGS
    ========================= --}}

    <section class="blog-section">

        <div class="container">

            <div class="section-header">

                <h2>
                    {{ $activeCategory ? 'Articles' : 'Latest Articles' }}
                </h2>

                <span class="count">
                    {{ $blogs->total() }}

                    {{ $blogs->total() === 1 ? 'article' : 'articles' }}
                </span>

            </div>


            @if($blogs->count())

                <div class="blog-grid">

                    @foreach($blogs as $blog)

                        <article class="blog-card">

                            <a href="/blogs/{{ $blog->slug }}">

                                {{-- Image --}}

                                <div class="image-wrapper">

                                    @if($blog->image)

                                        <img
                                            src="{{ asset('storage/' . $blog->image) }}"
                                            alt="{{ $blog->title }}"
                                            loading="lazy"
                                        >

                                    @else

                                        <div class="image-placeholder">
                                            Article
                                        </div>

                                    @endif

                                </div>


                                {{-- Meta --}}

                                <div class="meta">

                                    @if($blog->category)

                                        <span>
                                            {{ $blog->category->name }}
                                        </span>

                                        <span>
                                            ·
                                        </span>

                                    @endif

                                    <span>
                                        {{ $blog->created_at->format('M d, Y') }}
                                    </span>

                                </div>


                                {{-- Title --}}

                                <h3>
                                    {{ $blog->title }}
                                </h3>


                                {{-- Subtitle --}}

                                @if($blog->sub_title)

                                    <p class="subtitle">
                                        {{ $blog->sub_title }}
                                    </p>

                                @endif


                                {{-- Author --}}

                                <div class="read-more">

                                    Read article →

                                    @if($blog->user)

                                        <span class="author">
                                            · {{ $blog->user->name }}
                                        </span>

                                    @endif

                                </div>

                            </a>

                        </article>

                    @endforeach

                </div>


                {{-- =========================
                     PAGINATION
                ========================= --}}

                @if($blogs->hasPages())

                    <div class="pagination">

                        {{-- Previous --}}

                        <div class="pagination-side">

                            @if($blogs->onFirstPage())

                                <span class="pagination-link disabled">
                                    ← Previous
                                </span>

                            @else

                                <a
                                    href="{{ $blogs->previousPageUrl() }}"
                                    class="pagination-link"
                                >
                                    ← Previous
                                </a>

                            @endif

                        </div>


                        {{-- Page Numbers --}}

                        <div class="pagination-pages">

                            @foreach(
                                $blogs->getUrlRange(
                                    1,
                                    $blogs->lastPage()
                                )
                                as $page => $url
                            )

                                @if($page == $blogs->currentPage())

                                    <span class="pagination-page active">
                                        {{ $page }}
                                    </span>

                                @else

                                    <a
                                        href="{{ $url }}"
                                        class="pagination-page"
                                    >
                                        {{ $page }}
                                    </a>

                                @endif

                            @endforeach

                        </div>


                        {{-- Next --}}

                        <div class="pagination-side right">

                            @if($blogs->hasMorePages())

                                <a
                                    href="{{ $blogs->nextPageUrl() }}"
                                    class="pagination-link"
                                >
                                    Next →
                                </a>

                            @else

                                <span class="pagination-link disabled">
                                    Next →
                                </span>

                            @endif

                        </div>

                    </div>

                @endif


            @else

                {{-- Empty State --}}

                <div class="empty">

                    <h3>
                        No articles found
                    </h3>

                    <p>
                        There are no articles in this category yet.
                    </p>

                    @if($activeCategory)

                        <a
                            href="/blogs"
                            class="empty-link"
                        >
                            View all articles →
                        </a>

                    @endif

                </div>

            @endif

        </div>

    </section>

</main>


{{-- =========================
     FOOTER
========================= --}}

<footer>

    <div class="container footer-inner">

        <div>
            © {{ date('Y') }} DevBlog
        </div>

        <div class="footer-links">

            <a href="/">
                Home
            </a>

            <a href="/blogs">
                Blog
            </a>

        </div>

    </div>

</footer>

</body>
</html>