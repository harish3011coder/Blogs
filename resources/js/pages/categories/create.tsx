import { Head, Link, useForm } from '@inertiajs/react';



import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CategoryCreate({ category }) {
    const isEditing = !!category;

   
    const { data, setData, post, put, processing, errors } =
        useForm({
            name: category?.name || '',
        });

    const submit = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(`/categories/${category.id}`);
        } else {
            post('/categories');
        }
    };

    return (
        <>
            <Head
                title={
                    isEditing
                        ? 'Edit Category'
                        : 'Create Category'
                }
            />

            <div className="mx-auto w-full max-w-2xl p-6">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold">
                        {isEditing
                            ? 'Edit Category'
                            : 'Create Category'}
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        {isEditing
                            ? 'Update the category name.'
                            : 'Create a new blog category.'}
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="space-y-6 rounded-xl border p-6"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Category Name
                        </Label>

                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) =>
                                setData(
                                    'name',
                                    e.target.value,
                                )
                            }
                            placeholder="e.g. Laravel"
                        />

                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <Button
                            type="submit"
                            disabled={processing}
                        >
                            {processing
                                ? 'Saving...'
                                : isEditing
                                  ? 'Update Category'
                                  : 'Create Category'}
                        </Button>

                        <Link href="/categories">
                            <Button
                                type="button"
                                variant="outline"
                            >
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}