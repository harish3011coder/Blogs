import { Head, Link, useForm } from '@inertiajs/react';


import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateUser({ user }) {
    const isEditing = !!user;

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
    } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        role: user?.role || 'staff',
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(`/users/${user.id}`);
        } else {
            post('/users');
        }
    };

    return (
        <>
            <Head
                title={
                    isEditing
                        ? 'Edit User'
                        : 'Create User'
                }
            />

            <div className="mx-auto w-full max-w-2xl p-6">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">
                        {isEditing
                            ? 'Edit User'
                            : 'Create User'}
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {isEditing
                            ? 'Update user details and permissions.'
                            : 'Create a new user and assign a role.'}
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={submit}
                    className="space-y-6 rounded-xl border bg-background p-6 shadow-sm"
                >

                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Name
                        </Label>

                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData(
                                    'name',
                                    e.target.value,
                                )
                            }
                            placeholder="Enter name"
                            autoFocus
                            disabled={processing}
                        />

                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) =>
                                setData(
                                    'email',
                                    e.target.value,
                                )
                            }
                            placeholder="Enter email"
                            disabled={processing}
                        />

                        {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">
                            Password
                        </Label>

                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData(
                                    'password',
                                    e.target.value,
                                )
                            }
                            placeholder={
                                isEditing
                                    ? 'Leave blank to keep current password'
                                    : 'Enter password'
                            }
                            disabled={processing}
                        />

                        {errors.password && (
                            <p className="text-sm text-destructive">
                                {errors.password}
                            </p>
                        )}

                        {isEditing && (
                            <p className="text-xs text-muted-foreground">
                                Leave this field blank if you do not
                                want to change the password.
                            </p>
                        )}
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                        <Label htmlFor="role">
                            Role
                        </Label>

                        <select
                            id="role"
                            value={data.role}
                            onChange={(e) =>
                                setData(
                                    'role',
                                    e.target.value,
                                )
                            }
                            disabled={processing}
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="admin">
                                Admin
                            </option>

                            <option value="editor">
                                Editor
                            </option>

                            <option value="staff">
                                Staff
                            </option>
                        </select>

                        {errors.role && (
                            <p className="text-sm text-destructive">
                                {errors.role}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button
                            type="submit"
                            disabled={
                                processing ||
                                !data.name.trim() ||
                                !data.email.trim() ||
                                (!isEditing &&
                                    !data.password.trim())
                            }
                        >
                            {processing
                                ? 'Saving...'
                                : isEditing
                                  ? 'Update User'
                                  : 'Create User'}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            asChild
                            disabled={processing}
                        >
                            <Link href="/users">
                                Cancel
                            </Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}