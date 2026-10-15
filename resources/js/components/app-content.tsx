import * as React from 'react';

import { SidebarInset } from '@/components/ui/sidebar';
import type { AppVariant } from '@/types';

type Props = React.ComponentProps<'main'> & {
    variant?: AppVariant;
};

export function AppContent({
    variant = 'sidebar',
    children,
    ...props
}: Props) {
    if (variant === 'sidebar') {
        return (
            <SidebarInset
                {...props}
                className="min-w-0 flex-1 !max-w-none"
            >
                {children}
            </SidebarInset>
        );
    }

    return (
        <main
            {...props}
            className="min-w-0 flex-1 !max-w-none"
        >
            {children}
        </main>
    );
}