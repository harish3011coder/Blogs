import { Head, Link } from '@inertiajs/react';
import {
    FileText,
    Tags,
    Users,
    Plus,
    ArrowRight,
    PenLine,
    FolderOpen,
    UserPlus,
    BookOpen,
} from 'lucide-react';

type DashboardProps = {
    stats: {
        blogs: number;
        categories: number;
        users: number;
    };
    recentBlogs: any[];
    recentUsers: any[];
};

export default function Dashboard({
    stats,
    recentBlogs,
    recentUsers,
}: DashboardProps) {
    return (
        <>
            <Head title="Dashboard" />

            <div className="w-full p-6">

                {/* =====================================================
                    Header
                ====================================================== */}

                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Dashboard
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your blog content and users.
                        </p>
                    </div>

                    <Link
                        href="/manage-blog/create"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                        <Plus className="h-4 w-4" />
                        Create Blog
                    </Link>
                </div>


                {/* =====================================================
                    Quick Access
                ====================================================== */}

                <section className="mb-6 rounded-2xl border bg-card p-5">

                    <div className="mb-5 flex items-center justify-between">

                        <div>
                            <h2 className="text-lg font-bold">
                                Quick Access
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Quickly access common actions
                            </p>
                        </div>

                        <span className="text-xs text-muted-foreground">
                            4 items
                        </span>

                    </div>


                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

                        <QuickAccess
                            href="/manage-blog/create"
                            icon={PenLine}
                            title="Create Blog"
                        />

                        <QuickAccess
                            href="/manage-blog"
                            icon={BookOpen}
                            title="Manage Blogs"
                        />

                        <QuickAccess
                            href="/categories"
                            icon={FolderOpen}
                            title="Categories"
                        />

                        <QuickAccess
                            href="/users"
                            icon={UserPlus}
                            title="Users"
                        />

                    </div>


                    <p className="mt-5 text-center text-xs text-muted-foreground">
                        Click an option to quickly access the page
                    </p>

                </section>


                {/* =====================================================
                    Statistics
                ====================================================== */}

                <div className="mb-6 grid gap-5 md:grid-cols-3">

                    <DashboardCard
                        title="Total Blogs"
                        value={stats.blogs}
                        subtitle="Published articles"
                        icon={FileText}
                        href="/manage-blog"
                    />

                    <DashboardCard
                        title="Categories"
                        value={stats.categories}
                        subtitle="Content categories"
                        icon={Tags}
                        href="/categories"
                    />

                    <DashboardCard
                        title="Total Users"
                        value={stats.users}
                        subtitle="Registered accounts"
                        icon={Users}
                        href="/users"
                    />

                </div>


                {/* =====================================================
                    Recent Content
                ====================================================== */}

                <div className="grid gap-6 lg:grid-cols-2">


                    {/* =================================================
                        Recent Blogs
                    ================================================== */}

                    <div className="rounded-2xl border bg-card">

                        <div className="flex items-center justify-between border-b p-5">

                            <div>
                                <h2 className="font-bold">
                                    Recent Blogs
                                </h2>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Latest articles
                                </p>
                            </div>

                            <Link
                                href="/manage-blog"
                                className="flex items-center gap-1 text-sm font-medium hover:underline"
                            >
                                View all

                                <ArrowRight className="h-4 w-4" />
                            </Link>

                        </div>


                        <div className="divide-y">

                            {recentBlogs?.length > 0 ? (

                                recentBlogs.map((blog) => (

                                    <div
                                        key={blog.id}
                                        className="flex items-center justify-between gap-4 p-5 transition hover:bg-muted/30"
                                    >

                                        <div className="flex min-w-0 items-center gap-3">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                                <FileText className="h-5 w-5 text-primary" />
                                            </div>

                                            <div className="min-w-0">

                                                <p className="truncate font-medium">
                                                    {blog.title}
                                                </p>

                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {blog.category?.name ||
                                                        'Uncategorized'}
                                                </p>

                                            </div>

                                        </div>


                                        <Link
                                            href={`/manage-blog/${blog.slug}/edit`}
                                            className="shrink-0 text-xs font-medium hover:underline"
                                        >
                                            Edit
                                        </Link>

                                    </div>

                                ))

                            ) : (

                                <div className="p-6 text-center">

                                    <p className="text-sm text-muted-foreground">
                                        No blogs yet.
                                    </p>

                                    <Link
                                        href="/manage-blog/create"
                                        className="mt-2 inline-block text-sm font-medium hover:underline"
                                    >
                                        Create your first blog
                                    </Link>

                                </div>

                            )}

                        </div>

                    </div>


                    {/* =================================================
                        Recent Users
                    ================================================== */}

                    <div className="rounded-2xl border bg-card">

                        <div className="flex items-center justify-between border-b p-5">

                            <div>
                                <h2 className="font-bold">
                                    Recent Users
                                </h2>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Recently created accounts
                                </p>
                            </div>

                            <Link
                                href="/users"
                                className="flex items-center gap-1 text-sm font-medium hover:underline"
                            >
                                View all

                                <ArrowRight className="h-4 w-4" />
                            </Link>

                        </div>


                        <div className="divide-y">

                            {recentUsers?.length > 0 ? (

                                recentUsers.map((user) => (

                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between gap-4 p-5 transition hover:bg-muted/30"
                                    >

                                        <div className="flex min-w-0 items-center gap-3">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                                                {user.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase()}
                                            </div>

                                            <div className="min-w-0">

                                                <p className="truncate font-medium">
                                                    {user.name}
                                                </p>

                                                <p className="truncate text-xs text-muted-foreground">
                                                    {user.email}
                                                </p>

                                            </div>

                                        </div>


                                        <RoleBadge role={user.role} />

                                    </div>

                                ))

                            ) : (

                                <div className="p-6 text-center">

                                    <p className="text-sm text-muted-foreground">
                                        No users yet.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}


/*
|--------------------------------------------------------------------------
| Quick Access
|--------------------------------------------------------------------------
*/

function QuickAccess({
    href,
    icon: Icon,
    title,
}: {
    href: string;
    icon: React.ElementType;
    title: string;
}) {
    return (
        <Link
            href={href}
            className="group flex h-24 flex-col items-center justify-center rounded-xl border transition hover:bg-muted/40"
        >

            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition group-hover:bg-primary/20">

                <Icon className="h-5 w-5 text-primary" />

            </div>

            <span className="text-xs font-medium">
                {title}
            </span>

        </Link>
    );
}


/*
|--------------------------------------------------------------------------
| Dashboard Card
|--------------------------------------------------------------------------
*/

function DashboardCard({
    title,
    value,
    subtitle,
    icon: Icon,
    href,
}: {
    title: string;
    value: number;
    subtitle: string;
    icon: React.ElementType;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="group rounded-2xl border bg-card p-6 transition hover:bg-muted/30"
        >

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {value}
                    </p>

                    <p className="mt-2 text-xs text-muted-foreground">
                        {subtitle}
                    </p>

                </div>


                <div className="rounded-xl bg-primary/10 p-3 transition group-hover:bg-primary/20">

                    <Icon className="h-5 w-5 text-primary" />

                </div>

            </div>

        </Link>
    );
}


/*
|--------------------------------------------------------------------------
| Role Badge
|--------------------------------------------------------------------------
*/

function RoleBadge({
    role,
}: {
    role: string;
}) {
    const classes: Record<string, string> = {
        admin: 'bg-red-500/10 text-red-600 dark:text-red-400',
        editor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        staff: 'bg-green-500/10 text-green-600 dark:text-green-400',
    };

    return (
        <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${
                classes[role] ||
                'bg-muted text-muted-foreground'
            }`}
        >
            {role}
        </span>
    );
}