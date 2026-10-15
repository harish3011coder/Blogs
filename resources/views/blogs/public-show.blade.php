<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>{{ $blog->title }}</title>

    <style>

        * {
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
            scroll-padding-top: 100px;
        }

        body {
            margin: 0;
            background: #fff;
            color: #111;
            font-family:
                Inter,
                ui-sans-serif,
                system-ui,
                -apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                sans-serif;
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
            letter-spacing: -.04em;
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
           ARTICLE HEADER
        ========================= */

        .article-header {
            max-width: 900px;
            margin: auto;
            padding: 100px 0 60px;
        }

        .category {
            display: inline-block;
            margin-bottom: 25px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .15em;
            color: #777;
        }

        .category:hover {
            color: #111;
        }

        .article-header h1 {
            margin: 0;
            font-size: clamp(42px, 6vw, 72px);
            line-height: 1.02;
            letter-spacing: -.055em;
        }

        .subtitle {
            max-width: 760px;
            margin-top: 25px;
            font-size: 20px;
            line-height: 1.6;
            color: #666;
        }

        .meta {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 30px;
            font-size: 13px;
            color: #777;
        }


        /* =========================
           COVER
        ========================= */

        .cover {
            width: min(1000px, calc(100% - 40px));
            margin: 20px auto 0;
            aspect-ratio: 21 / 9;
            overflow: hidden;
            background: #f3f3f3;
            border-radius: 12px;
        }

        .cover img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }


        /* =========================
           ARTICLE LAYOUT
        ========================= */

        .article-wrapper {
            padding: 75px 0 100px;
        }

        .article-layout {
            width: min(1100px, 100%);
            margin: auto;

            display: grid;
            grid-template-columns: 230px minmax(0, 760px);
            gap: 70px;

            align-items: start;
        }


        /* =========================
           TABLE OF CONTENTS
        ========================= */

        .toc {
            position: sticky;
            top: 30px;

            padding: 22px;

            border: 1px solid #e5e5e5;
            border-radius: 10px;

            background: #fafafa;
        }

        .toc-title {
            margin-bottom: 16px;

            font-size: 12px;
            font-weight: 700;

            text-transform: uppercase;
            letter-spacing: .12em;

            color: #777;
        }

        .toc-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .toc-item {
            font-size: 13px;
            line-height: 1.45;
            color: #666;

            transition:
                color .2s ease,
                padding-left .2s ease;
        }

        .toc-item:hover {
            color: #111;
            padding-left: 3px;
        }

        .toc-item.level-3 {
            padding-left: 12px;
            font-size: 12px;
        }

        .toc-item.level-4 {
            padding-left: 24px;
            font-size: 12px;
        }


        /* =========================
           ARTICLE CONTENT
        ========================= */

        .article-content {
            min-width: 0;

            font-size: 18px;
            line-height: 1.85;
        }

        .article-content h1,
        .article-content h2,
        .article-content h3,
        .article-content h4 {
            scroll-margin-top: 100px;

            margin-top: 2em;
            margin-bottom: .7em;

            line-height: 1.2;
            letter-spacing: -.035em;
        }

        .article-content h1 {
            font-size: 38px;
        }

        .article-content h2 {
            font-size: 32px;
        }

        .article-content h3 {
            font-size: 26px;
        }

        .article-content h4 {
            font-size: 22px;
        }

        .article-content p {
            margin: 1.3em 0;
        }


        /* =========================
           LINKS
        ========================= */

        .article-content a {
            color: #2563eb;

            text-decoration: underline;
            text-decoration-thickness: 1px;
            text-underline-offset: 3px;

            transition: color .2s ease;
        }

        .article-content a:hover {
            color: #111;
        }


        /* =========================
           LISTS
        ========================= */

        .article-content ul,
        .article-content ol {
            padding-left: 30px;
        }

        .article-content li {
            margin: 8px 0;
        }


        /* =========================
           BLOCKQUOTE
        ========================= */

        .article-content blockquote {
            margin: 35px 0;

            padding: 5px 0 5px 25px;

            border-left: 3px solid #111;

            color: #555;
            font-style: italic;
        }


        /* =========================
           INLINE CODE
        ========================= */

        .article-content code {
            padding: 3px 6px;

            background: #f1f1f1;

            border-radius: 4px;

            font-size: .9em;
        }


        /* =========================
           CODE BLOCK
        ========================= */

        .article-content pre {
            overflow-x: auto;

            padding: 22px;

            background: #111;
            color: #fff;

            border-radius: 8px;

            font-size: 14px;
            line-height: 1.6;
        }

        .article-content pre code {
            padding: 0;
            background: transparent;
            color: inherit;
        }


        /* =========================
           IMAGES
        ========================= */

        .article-content img {
            display: block;

            max-width: 100%;
            height: auto;

            margin: 35px auto;

            border-radius: 8px;
        }


        /* =========================
           HORIZONTAL RULE
        ========================= */

        .article-content hr {
            margin: 50px 0;

            border: 0;
            border-top: 1px solid #ddd;
        }


        /* =========================
           TABLES
        ========================= */

        .article-content table {
            width: 100%;

            margin: 35px 0;

            border-collapse: collapse;

            font-size: 16px;

            overflow: hidden;
        }

        .article-content th,
        .article-content td {
            padding: 13px 15px;

            border: 1px solid #ddd;

            text-align: left;

            vertical-align: top;
        }

        .article-content th {
            background: #f5f5f5;

            font-weight: 700;
        }

        .article-content tr:nth-child(even) td {
            background: #fafafa;
        }


        /* =========================
           TAGS
        ========================= */

        .tags {
            width: min(760px, 100%);

            margin: 60px auto 0;

            padding-top: 30px;

            border-top: 1px solid #e5e5e5;

            display: flex;
            flex-wrap: wrap;

            gap: 8px;
        }

        .tag {
            padding: 8px 13px;

            border: 1px solid #ddd;

            border-radius: 999px;

            font-size: 12px;

            transition:
                background .2s ease,
                color .2s ease,
                border-color .2s ease;
        }

        .tag:hover {
            background: #111;
            border-color: #111;
            color: #fff;
        }


        /* =========================
           BACK
        ========================= */

        .back {
            width: min(760px, 100%);

            margin: 60px auto 0;

            font-size: 14px;
            font-weight: 700;
        }

        .back a:hover {
            text-decoration: underline;
            text-underline-offset: 4px;
        }

         .back-top {
            width: min(300px, 100%);

            margin: 50px 12.5rem 0;
            

            font-size: 14px;
            font-weight: 700;
        }


 .back-top a:hover {
            text-decoration: underline;
            text-underline-offset: 4px;
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

        .footer-links a:hover {
            opacity: .5;
        }


        /* =========================
           TABLET
        ========================= */

        @media (max-width: 900px) {

            .article-layout {
                grid-template-columns: 1fr;
                gap: 40px;
            }

            .toc {
                position: relative;
                top: auto;
            }

            .toc-list {
                max-height: 300px;
                overflow-y: auto;
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

            .article-header {
                padding: 70px 0 45px;
            }

            .article-header h1 {
                font-size: 44px;
            }

            .subtitle {
                font-size: 17px;
            }

            .cover {
                width: calc(100% - 28px);
                margin-top: 10px;
                aspect-ratio: 16 / 9;
            }

            .article-wrapper {
                padding: 50px 0 70px;
            }

            .article-content {
                font-size: 17px;
            }

            .article-content h2 {
                font-size: 29px;
            }

            .article-content h3 {
                font-size: 24px;
            }

            .article-content table {
                display: block;
                overflow-x: auto;
                white-space: nowrap;
            }

            .footer-inner {
                padding: 30px 0;

                align-items: flex-start;
                flex-direction: column;

                gap: 20px;
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
             BACK
        ========================= --}}

        <div class="back-top">

            <a href="/blogs">
                ← Back to all articles
            </a>

        </div>


    {{-- =========================
         ARTICLE HEADER
    ========================= --}}

    <section class="article-header">

        @if($blog->category)

            <a
                href="/blogs?category={{ urlencode($blog->category->slug) }}"
                class="category"
            >
                {{ $blog->category->name }}
            </a>

        @endif


        <h1>
            {{ $blog->title }}
        </h1>


        @if($blog->sub_title)

            <p class="subtitle">
                {{ $blog->sub_title }}
            </p>

        @endif


        <div class="meta">

            @if($blog->user)

                <span>
                    By {{ $blog->user->name }}
                </span>

                <span>·</span>

            @endif


            <span>
                {{ $blog->created_at->format('F d, Y') }}
            </span>


            @if($blog->updated_at->gt($blog->created_at))

                <span>·</span>

                <span>
                    Updated {{ $blog->updated_at->format('F d, Y') }}
                </span>

            @endif

        </div>

    </section>


    {{-- =========================
         COVER IMAGE
    ========================= --}}

    @if($blog->image_url)

        <div class="cover">

            <img
                src="{{ $blog->image_url }}"
                alt="{{ $blog->title }}"
            >

        </div>

    @endif


    {{-- =========================
         ARTICLE
    ========================= --}}

    <section class="article-wrapper">

        <div class="article-layout">


            {{-- =========================
                 TABLE OF CONTENTS
            ========================= --}}

            @if(count($toc))

                <aside class="toc">

                    <div class="toc-title">
                        Table of Contents
                    </div>

                    <nav class="toc-list">

                        @foreach($toc as $item)

                            <a
                                href="#{{ $item['id'] }}"
                                class="toc-item level-{{ $item['level'] }}"
                            >
                                {{ $item['title'] }}
                            </a>

                        @endforeach

                    </nav>

                </aside>

            @endif


            {{-- =========================
                 ARTICLE CONTENT
            ========================= --}}

            <article class="article-content">

                {!! $blog->html_body !!}

            </article>

        </div>


        {{-- =========================
             TAGS
        ========================= --}}

        @if(!empty($blog->tags))

            <div class="tags">

                @foreach($blog->tags as $tag)

                    <a
                        href="/blogs?tag={{ urlencode($tag) }}"
                        class="tag"
                    >
                        #{{ $tag }}
                    </a>

                @endforeach

            </div>

        @endif


        {{-- =========================
             BACK
        ========================= --}}

        <div class="back">

            <a href="/blogs">
                ← Back to all articles
            </a>

        </div>

    </section>

</main>


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