import { createInertiaApp } from '@inertiajs/react';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

import { initializeTheme } from '@/hooks/use-appearance';

import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob('./pages/**/*.tsx');

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: async (name) => {
        const page = `./pages/${name}.tsx`;

        console.log('Resolving page:', page);

        const loader = pages[page];

        if (!loader) {
            console.error(
                'Page not found:',
                page,
                '\nAvailable pages:',
                Object.keys(pages),
            );

            throw new Error(`Page not found: ${page}`);
        }

        const module = await loader();

        return module.default;
    },

    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;

            // Public blog pages
            case name === 'blogs/public-blog-list':
            case name === 'blogs/public-blog':
                return null;

            // Authentication
            case name.startsWith('auth/'):
                return AuthLayout;

            // Settings
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];

            // Admin pages
            default:
                return AppLayout;
        }
    },

    strictMode: true,

    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },

    progress: {
        color: '#4B5563',
    },
});

initializeTheme();