import { Head, Link, router } from '@inertiajs/react';
;

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';



export default function CategoriesIndex({ categories }) {
    const deleteCategory = (id: number) => {
        if (!confirm('Are you sure you want to delete this category?')) {
            return;
        }

        router.delete(`/categories/${id}`);
    };

    return (
        <>
            <Head title="Categories" />

            <div className="mx-auto w-full max-w-6xl p-6">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Categories
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage your blog categories.
                        </p>
                    </div>

                    <Link href="/categories/create">
                        <Button>
                            + Create Category
                        </Button>
                    </Link>
                </div>

                {/* Categories */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            All Categories
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        {categories?.data?.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="px-4 py-3">
                                                Name
                                            </th>

                                            <th className="px-4 py-3">
                                                Slug
                                            </th>

                                            <th className="px-4 py-3">
                                                Blogs
                                            </th>

                                            <th className="px-4 py-3 text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {categories.data.map(
                                            (category) => (
                                                <tr
                                                    key={category.id}
                                                    className="border-b last:border-0"
                                                >
                                                    <td className="px-4 py-4 font-medium">
                                                        {category.name}
                                                    </td>

                                                    <td className="px-4 py-4 text-muted-foreground">
                                                        {category.slug}
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        {category.blogs_count}
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <div className="flex justify-end gap-2">
                                                            <Link
                                                                href={`/categories/${category.id}/edit`}
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                >
                                                                    Edit
                                                                </Button>
                                                            </Link>

                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() =>
                                                                    deleteCategory(
                                                                        category.id,
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <h2 className="text-lg font-semibold">
                                    No categories found
                                </h2>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    Create your first category.
                                </p>

                                <Link
                                    href="/categories/create"
                                    className="mt-4 inline-block"
                                >
                                    <Button>
                                        Create Category
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {categories?.links &&
                    categories.links.length > 3 && (
                        <div className="mt-6 flex flex-wrap justify-center gap-2">
                            {categories.links.map(
                                (link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`rounded-md border px-3 py-2 text-sm ${
                                            link.active
                                                ? 'bg-primary text-primary-foreground'
                                                : 'hover:bg-muted'
                                        } ${
                                            !link.url
                                                ? 'pointer-events-none opacity-50'
                                                : ''
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ),
                            )}
                        </div>
                    )}
            </div>
        </>
    );
}