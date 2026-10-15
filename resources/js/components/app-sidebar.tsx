import { Link, usePage } from '@inertiajs/react';

import {
    BookOpen,
    Building2,
    FolderGit2,
    LayoutGrid,
    FileText,
    PlusCircle,
    Tags,
    Users,
    Settings,
} from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

type PageProps = {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        } | null;
    };

    company?: {
        name?: string | null;
        logo?: string | null;
    };
};

export function AppSidebar() {
    const { auth, company } = usePage<PageProps>().props;

    const role = auth?.user?.role;

    const isAdmin = role === 'admin';
    const isEditor = role === 'editor';
    const isStaff = role === 'staff';

    const mainNavItems: NavItem[] = [
        // =========================================================
        // Dashboard - All roles
        // =========================================================
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },

        // =========================================================
        // Blogs - Admin + Editor + Staff
        // =========================================================
        ...(isAdmin || isEditor || isStaff
            ? [
                  {
                      title: 'Manage Blogs',
                      href: '/manage-blog',
                      icon: FileText,
                  },

                 
              ]
            : []),

        // =========================================================
        // Categories - Admin + Editor
        // =========================================================
        ...(isAdmin || isEditor
            ? [
                  {
                      title: 'Categories',
                      href: '/categories',
                      icon: Tags,
                  },
              ]
            : []),

        // =========================================================
        // Admin Only
        // =========================================================
        ...(isAdmin
            ? [
                  {
                      title: 'Company',
                      href: '/company',
                      icon: Building2,
                  },

                  {
                      title: 'Users',
                      href: '/users',
                      icon: Users,
                  },

                  {
                      title: 'Settings',
                      href: '/settings/profile',
                      icon: Settings,
                  },
              ]
            : []),
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: FolderGit2,
        },

        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar
            collapsible="icon"
            variant="sidebar"
        >
            {/* =====================================================
                Logo
            ====================================================== */}

            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                        >
                            <Link
                                href={dashboard()}
                                prefetch
                            >
                                {company?.logo ? (
                                    <img
                                        src={company.logo}
                                        alt={
                                            company.name ||
                                            'Company logo'
                                        }
                                        className="h-8 w-8 rounded-md object-contain"
                                    />
                                ) : (
                                    <AppLogo />
                                )}

                                <span className="truncate font-semibold">
                                    {company?.name || 'DevBlog'}
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* =====================================================
                Main Navigation
            ====================================================== */}

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            {/* =====================================================
                Footer
            ====================================================== */}

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}