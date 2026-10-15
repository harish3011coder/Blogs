import { Head, Link, useForm } from '@inertiajs/react';
import MDEditor from '@uiw/react-md-editor';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
    AlertCircle,
    CheckCircle2,
    Eye,
    FileText,
    Highlighter,
    Info,
    Palette,
    PlayCircle,
    Save,
} from 'lucide-react';

import { useEffect, useState } from 'react';

type BlogForm = {
    title: string;
    sub_title: string;
    category_id: string | number;
    body: string;
    image: File | null;
    tags: string[];
    status: 'draft' | 'published';
    _method?: string;
};

type CreateBlogProps = {
    blog?: any;
    categories?: any[];
    canPublish?: boolean;
};

export default function CreateBlog({
    blog,
    categories = [],
    canPublish = true,
}: CreateBlogProps) {
    const isEditing = !!blog;

    /*
    |--------------------------------------------------------------------------
    | Form
    |--------------------------------------------------------------------------
    */

    const { data, setData, post, processing, errors } =
        useForm<BlogForm>({
            title: blog?.title || '',
            sub_title: blog?.sub_title || '',
            category_id: blog?.category_id || '',
            body: blog?.body || '',
            image: null,
            tags: Array.isArray(blog?.tags) ? blog.tags : [],
            status: canPublish
                ? blog?.status || 'draft'
                : 'draft',
            _method: isEditing ? 'PUT' : undefined,
        });

    const [imagePreview, setImagePreview] =
        useState<string | null>(null);

    const [tagInput, setTagInput] = useState('');

    /*
    |--------------------------------------------------------------------------
    | Image Preview
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!data.image) {
            setImagePreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(data.image);

        setImagePreview(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [data.image]);

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        let finalTags = [...data.tags];

        if (tagInput.trim()) {
            const tag = tagInput.trim();

            if (!finalTags.includes(tag)) {
                finalTags.push(tag);
            }

            setTagInput('');
        }

        const finalStatus = canPublish
            ? data.status
            : 'draft';

        /*
        |--------------------------------------------------------------------------
        | Edit Blog
        |--------------------------------------------------------------------------
        */

        if (isEditing) {
            setData('tags', finalTags);
            setData('status', finalStatus);

            post(`/manage-blog/${blog.slug}`, {
                forceFormData: true,
                preserveScroll: true,
            });

            return;
        }

        /*
        |--------------------------------------------------------------------------
        | Create Blog
        |--------------------------------------------------------------------------
        */

        setData('tags', finalTags);
        setData('status', finalStatus);

        post('/manage-blog', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Tags
    |--------------------------------------------------------------------------
    */

    const addTag = (value: string) => {
        const tag = value.trim();

        if (!tag) {
            return;
        }

        if (!data.tags.includes(tag)) {
            setData('tags', [...data.tags, tag]);
        }

        setTagInput('');
    };

    const handleTagKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === ',') {
            e.preventDefault();
            addTag(tagInput);
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            addTag(tagInput);
        }

        if (
            e.key === 'Backspace' &&
            !tagInput &&
            data.tags.length > 0
        ) {
            setData(
                'tags',
                data.tags.slice(0, -1),
            );
        }
    };

    const removeTag = (index: number) => {
        setData(
            'tags',
            data.tags.filter(
                (_, i) => i !== index,
            ),
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Markdown / HTML Helpers
    |--------------------------------------------------------------------------
    */

    const insertMarkdown = (text: string) => {
        setData(
            'body',
            data.body
                ? `${data.body}\n\n${text}`
                : text,
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Colors
    |--------------------------------------------------------------------------
    */

    const insertColor = (color: string) => {
        insertMarkdown(
            `<span style="color:${color}">Colored text</span>`,
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Highlight
    |--------------------------------------------------------------------------
    */

    const insertHighlight = () => {
        insertMarkdown(
            `<mark>Highlighted text</mark>`,
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Info
    |--------------------------------------------------------------------------
    */

    const insertInfo = () => {
        insertMarkdown(
            `> 💡 **Info:** Add your information here.`,
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Tip
    |--------------------------------------------------------------------------
    */

    const insertTip = () => {
        insertMarkdown(
            `> ✅ **Tip:** Add your useful tip here.`,
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Warning
    |--------------------------------------------------------------------------
    */

    const insertWarning = () => {
        insertMarkdown(
            `> ⚠️ **Warning:** Add your warning here.`,
        );
    };

    /*
    |--------------------------------------------------------------------------
    | YouTube
    |--------------------------------------------------------------------------
    */

    const insertYouTube = () => {
        insertMarkdown(
            `<div>
<iframe
    width="100%"
    height="400"
    src="https://www.youtube.com/embed/YOUTUBE_VIDEO_ID"
    title="YouTube video"
    frameborder="0"
    allowfullscreen>
</iframe>
</div>`,
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Submit Button Text
    |--------------------------------------------------------------------------
    */

    const getSubmitText = () => {
        if (processing) {
            return 'Saving...';
        }

        if (isEditing) {
            return data.status === 'published'
                ? 'Update & Publish'
                : 'Save Draft';
        }

        return data.status === 'published'
            ? 'Publish Blog'
            : 'Save Draft';
    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <>
            <Head
                title={
                    isEditing
                        ? 'Edit Blog'
                        : 'Create Blog'
                }
            />

            <div className="mx-auto w-full max-w-4xl p-4 sm:p-6">

                {/* HEADER */}

                <div className="mb-8 flex items-center justify-between gap-4">

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {isEditing
                                ? 'Edit Blog'
                                : 'Create New Blog'}
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            {isEditing
                                ? 'Update your article and manage its publishing status.'
                                : 'Write your article, save it as a draft, or publish it.'}
                        </p>
                    </div>

                    {/* PUBLIC PREVIEW */}

                    <Link
                        href={
                            isEditing
                                ? `/blogs/${blog.slug}`
                                : '/blogs'
                        }
                        target="_blank"
                    >
                        <Button
                            type="button"
                            variant="outline"
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                        </Button>
                    </Link>

                </div>

                {/* FORM */}

                <form
                    onSubmit={submit}
                    className="space-y-6"
                >

                    {/* TITLE */}

                    <div className="rounded-xl border bg-card p-5">

                        <Label
                            htmlFor="title"
                            className="mb-2 block"
                        >
                            Title
                        </Label>

                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) =>
                                setData(
                                    'title',
                                    e.target.value,
                                )
                            }
                            placeholder="Enter an engaging blog title..."
                            className="h-12 text-lg"
                        />

                        {errors.title && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.title}
                            </p>
                        )}

                    </div>

                    {/* SUBTITLE */}

                    <div className="rounded-xl border bg-card p-5">

                        <Label
                            htmlFor="sub_title"
                            className="mb-2 block"
                        >
                            Subtitle
                        </Label>

                        <Input
                            id="sub_title"
                            value={data.sub_title}
                            onChange={(e) =>
                                setData(
                                    'sub_title',
                                    e.target.value,
                                )
                            }
                            placeholder="Short description of your article..."
                        />

                        {errors.sub_title && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.sub_title}
                            </p>
                        )}

                    </div>

                    {/* CATEGORY */}

                    <div className="rounded-xl border bg-card p-5">

                        <Label
                            htmlFor="category_id"
                            className="mb-2 block"
                        >
                            Category
                        </Label>

                        <select
                            id="category_id"
                            value={data.category_id}
                            onChange={(e) =>
                                setData(
                                    'category_id',
                                    e.target.value,
                                )
                            }
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option value="">
                                Select Category
                            </option>

                            {categories.map(
                                (category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ),
                            )}

                        </select>

                        {errors.category_id && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.category_id}
                            </p>
                        )}

                    </div>

                    {/* STATUS */}

                    <div className="rounded-xl border bg-card p-5">

                        <div className="mb-4">

                            <div className="flex items-center gap-2">

                                <FileText className="h-4 w-4" />

                                <h2 className="font-semibold">
                                    Publishing Status
                                </h2>

                            </div>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Choose whether this article should
                                remain private or appear publicly.
                            </p>

                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">

                            {/* DRAFT */}

                            <button
                                type="button"
                                onClick={() =>
                                    setData(
                                        'status',
                                        'draft',
                                    )
                                }
                                className={`rounded-xl border p-4 text-left transition ${
                                    data.status === 'draft'
                                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                                        : 'hover:bg-muted/50'
                                }`}
                            >

                                <div className="flex items-center gap-3">

                                    <div
                                        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                                            data.status === 'draft'
                                                ? 'border-primary'
                                                : 'border-muted-foreground'
                                        }`}
                                    >
                                        {data.status ===
                                            'draft' && (
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                        )}
                                    </div>

                                    <div>

                                        <p className="font-medium">
                                            Draft
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            Only available inside the
                                            admin area.
                                        </p>

                                    </div>

                                </div>

                            </button>

                            {/* PUBLISHED */}

                            {canPublish && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setData(
                                            'status',
                                            'published',
                                        )
                                    }
                                    className={`rounded-xl border p-4 text-left transition ${
                                        data.status === 'published'
                                            ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                                            : 'hover:bg-muted/50'
                                    }`}
                                >

                                    <div className="flex items-center gap-3">

                                        <div
                                            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                                                data.status ===
                                                'published'
                                                    ? 'border-primary'
                                                    : 'border-muted-foreground'
                                            }`}
                                        >
                                            {data.status ===
                                                'published' && (
                                                <div className="h-2 w-2 rounded-full bg-primary" />
                                            )}
                                        </div>

                                        <div>

                                            <p className="font-medium">
                                                Published
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                Visible on the public
                                                blog.
                                            </p>

                                        </div>

                                    </div>

                                </button>
                            )}

                        </div>

                        {!canPublish && (
                            <p className="mt-3 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
                                Staff accounts can create drafts.
                                An Editor or Admin must publish the
                                article.
                            </p>
                        )}

                        {errors.status && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.status}
                            </p>
                        )}

                    </div>

                    {/* COVER IMAGE */}

                    <div className="rounded-xl border bg-card p-5">

                        <Label
                            htmlFor="image"
                            className="mb-2 block"
                        >
                            Cover Image
                        </Label>

                        <Input
                            id="image"
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            onChange={(e) =>
                                setData(
                                    'image',
                                    e.target.files?.[0] || null,
                                )
                            }
                        />

                        <p className="mt-2 text-xs text-muted-foreground">
                            JPG, PNG or WebP. Maximum 5MB.
                        </p>

                        {imagePreview && (
                            <div className="mt-4 overflow-hidden rounded-lg border">
                                <img
                                    src={imagePreview}
                                    alt="New cover preview"
                                    className="aspect-video w-full object-cover"
                                />
                            </div>
                        )}

                        {isEditing &&
                            blog?.image &&
                            !data.image && (
                                <div className="mt-4 overflow-hidden rounded-lg border">
                                    <img
                                        src={`/storage/${blog.image}`}
                                        alt={blog.title}
                                        className="aspect-video w-full object-cover"
                                    />
                                </div>
                            )}

                        {errors.image && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.image}
                            </p>
                        )}

                    </div>

                    {/* TAGS */}

                    <div className="rounded-xl border bg-card p-5">

                        <Label
                            htmlFor="tags"
                            className="mb-2 block"
                        >
                            Tags
                        </Label>

                        <Input
                            id="tags"
                            value={tagInput}
                            onChange={(e) =>
                                setTagInput(
                                    e.target.value,
                                )
                            }
                            onKeyDown={handleTagKeyDown}
                            placeholder="Laravel, React, PHP"
                        />

                        <p className="mt-2 text-xs text-muted-foreground">
                            Type a tag and press comma or Enter.
                        </p>

                        {data.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">

                                {data.tags.map(
                                    (tag, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() =>
                                                removeTag(
                                                    index,
                                                )
                                            }
                                            className="rounded-full bg-muted px-2.5 py-1 text-xs transition hover:bg-destructive hover:text-destructive-foreground"
                                            title="Remove tag"
                                        >
                                            #{tag} ×
                                        </button>
                                    ),
                                )}

                            </div>
                        )}

                        {errors.tags && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.tags}
                            </p>
                        )}

                    </div>

                    {/* ARTICLE CONTENT */}

                    <div className="rounded-xl border bg-card p-5">

                        <div className="mb-4 flex items-center justify-between">

                            <div>
                                <h2 className="font-semibold">
                                    Article Content
                                </h2>

                                <p className="text-xs text-muted-foreground">
                                    Markdown + GFM + HTML
                                </p>
                            </div>

                            <span className="rounded-full bg-muted px-3 py-1 text-xs">
                                Markdown + GFM + HTML
                            </span>

                        </div>

                        {/* CUSTOM TOOLBAR */}

                        <div className="mb-3 flex flex-wrap gap-2 rounded-lg border bg-muted/30 p-2">

                            {/* COLORS */}

                            <div className="flex items-center gap-1">

                                <Palette className="mr-1 h-4 w-4 text-muted-foreground" />

                                <button
                                    type="button"
                                    title="Red text"
                                    onClick={() =>
                                        insertColor(
                                            '#dc2626',
                                        )
                                    }
                                    className="h-6 w-6 rounded-full bg-red-600"
                                />

                                <button
                                    type="button"
                                    title="Blue text"
                                    onClick={() =>
                                        insertColor(
                                            '#2563eb',
                                        )
                                    }
                                    className="h-6 w-6 rounded-full bg-blue-600"
                                />

                                <button
                                    type="button"
                                    title="Green text"
                                    onClick={() =>
                                        insertColor(
                                            '#16a34a',
                                        )
                                    }
                                    className="h-6 w-6 rounded-full bg-green-600"
                                />

                                <button
                                    type="button"
                                    title="Orange text"
                                    onClick={() =>
                                        insertColor(
                                            '#ea580c',
                                        )
                                    }
                                    className="h-6 w-6 rounded-full bg-orange-600"
                                />

                            </div>

                            {/* HIGHLIGHT */}

                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={insertHighlight}
                            >
                                <Highlighter className="mr-1 h-4 w-4" />
                                Highlight
                            </Button>

                            {/* INFO */}

                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={insertInfo}
                            >
                                <Info className="mr-1 h-4 w-4" />
                                Info
                            </Button>

                            {/* TIP */}

                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={insertTip}
                            >
                                <CheckCircle2 className="mr-1 h-4 w-4" />
                                Tip
                            </Button>

                            {/* WARNING */}

                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={insertWarning}
                            >
                                <AlertCircle className="mr-1 h-4 w-4" />
                                Warning
                            </Button>

                            {/* YOUTUBE */}

                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={insertYouTube}
                            >
                                <PlayCircle className="mr-1 h-4 w-4" />
                                YouTube
                            </Button>

                        </div>

                        {/* MARKDOWN EDITOR */}

                        <div data-color-mode="light">

                            <MDEditor
                                value={data.body}
                                onChange={(value) =>
                                    setData(
                                        'body',
                                        value || '',
                                    )
                                }
                                height={600}
                                preview="live"
                                previewOptions={{
                                    remarkPlugins: [
                                        remarkGfm,
                                    ],
                                    rehypePlugins: [
                                        rehypeRaw,
                                    ],
                                }}
                            />

                        </div>

                        {errors.body && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.body}
                            </p>
                        )}

                    </div>

                    {/* ACTIONS */}

                    <div className="rounded-xl border bg-card p-5">

                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

                            {/* BACK TO MANAGE BLOG */}

                            <Link href="/manage-blog">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                >
                                    Cancel
                                </Button>
                            </Link>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto"
                            >

                                <Save className="mr-2 h-4 w-4" />

                                {getSubmitText()}

                            </Button>

                        </div>

                    </div>

                </form>

            </div>
        </>
    );
}