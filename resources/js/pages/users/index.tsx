import { Head, Link, router, usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/button';



export default function UsersIndex({ users }) {
    const { auth } = usePage().props;

    const currentUserId = auth?.user?.id;

    const deleteUser = (id: number, name: string) => {
        if (
            !confirm(
                `Are you sure you want to delete "${name}"?`,
            )
        ) {
            return;
        }

        router.delete(`/users/${id}`);
    };

    const getRoleClass = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-red-500/10 text-red-600 dark:text-red-400';

            case 'editor':
                return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';

            case 'staff':
                return 'bg-green-500/10 text-green-600 dark:text-green-400';

            default:
                return 'bg-muted text-muted-foreground';
        }
    };

    return (
        <>
            <Head title="Users" />

            <div className="mx-auto w-full max-w-6xl p-6">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Users
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage users and their roles.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/users/create">
                            + Create User
                        </Link>
                    </Button>
                </div>

                {/* Users Table */}
                <div className="overflow-hidden rounded-xl border bg-background">

                    <div className="overflow-x-auto">
                        <table className="w-full">

                            {/* Header */}
                            <thead className="border-b bg-muted/40">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Name
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Email
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Role
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Created
                                    </th>

                                    <th className="px-4 py-3 text-right text-sm font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody>
                                {users?.data?.length > 0 ? (
                                    users.data.map((user) => {
                                        const isCurrentUser =
                                            user.id === currentUserId;

                                        return (
                                            <tr
                                                key={user.id}
                                                className="border-b last:border-0 hover:bg-muted/30"
                                            >
                                                {/* Name */}
                                                <td className="px-4 py-4">
                                                    <div className="font-medium">
                                                        {user.name}
                                                    </div>

                                                    {isCurrentUser && (
                                                        <span className="text-xs text-muted-foreground">
                                                            You
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Email */}
                                                <td className="px-4 py-4 text-sm text-muted-foreground">
                                                    {user.email}
                                                </td>

                                                {/* Role */}
                                                <td className="px-4 py-4">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getRoleClass(
                                                            user.role,
                                                        )}`}
                                                    >
                                                        {user.role}
                                                    </span>
                                                </td>

                                                {/* Created */}
                                                <td className="px-4 py-4 text-sm text-muted-foreground">
                                                    {new Date(
                                                        user.created_at,
                                                    ).toLocaleDateString(
                                                        'en-IN',
                                                        {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        },
                                                    )}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-4 py-4">
                                                    <div className="flex justify-end gap-2">

                                                        {/* Edit */}
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={`/users/${user.id}/edit`}
                                                            >
                                                                Edit
                                                            </Link>
                                                        </Button>

                                                        {/* Delete */}
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            disabled={
                                                                isCurrentUser
                                                            }
                                                            onClick={() =>
                                                                deleteUser(
                                                                    user.id,
                                                                    user.name,
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </Button>

                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-12 text-center"
                                        >
                                            <div className="text-lg font-medium">
                                                No users found
                                            </div>

                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Create your first user.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {users?.links &&
                    users.links.length > 3 && (
                        <div className="mt-6 flex flex-wrap justify-center gap-2">
                            {users.links.map(
                                (link, index) => (
                                    <Button
                                        key={index}
                                        variant={
                                            link.active
                                                ? 'default'
                                                : 'outline'
                                        }
                                        size="sm"
                                        disabled={!link.url}
                                        onClick={() => {
                                            if (link.url) {
                                                router.get(
                                                    link.url,
                                                    {},
                                                    {
                                                        preserveScroll: true,
                                                    },
                                                );
                                            }
                                        }}
                                    >
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    </Button>
                                ),
                            )}
                        </div>
                    )}
            </div>
        </>
    );
}