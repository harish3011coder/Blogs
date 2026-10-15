import { Form, Head } from '@inertiajs/react';
import CompanyController from '@/actions/App/Http/Controllers/CompanyController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageIcon, UploadCloud } from 'lucide-react';
import { useState } from 'react';

type Company = {
    id: number;
    company_name: string | null;
    company_logo: string | null;
};

type Props = {
    company: Company | null;
};

export default function Company({ company }: Props) {
    /*
    |--------------------------------------------------------------------------
    | Logo preview
    |--------------------------------------------------------------------------
    | Shows the newly picked file immediately, falling back to the logo
    | already saved on the company. Purely visual — the actual <input>
    | still submits the file the same way.
    */

    const [preview, setPreview] = useState<string | null>(
        company?.company_logo ? `/storage/${company.company_logo}` : null,
    );
    const [fileName, setFileName] = useState<string | null>(null);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        setFileName(file.name);
        setPreview(URL.createObjectURL(file));
    };

    return (
        <>
            <Head title="Company Management" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Company"
                    description="Manage your company name and logo"
                />

                <Form
                    {...CompanyController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    encType="multipart/form-data"
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            {/* =====================================
                                Company Name
                            ====================================== */}

                            <div className="rounded-xl border bg-card p-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="company_name">
                                        Company Name
                                    </Label>

                                    <p className="text-sm text-muted-foreground">
                                        This is the name shown across your
                                        invoices, emails, and reports.
                                    </p>

                                    <Input
                                        id="company_name"
                                        name="company_name"
                                        defaultValue={
                                            company?.company_name ?? ''
                                        }
                                        placeholder="Enter company name"
                                        required
                                        className="mt-1 max-w-sm"
                                    />

                                    <InputError message={errors.company_name} />
                                </div>
                            </div>

                            {/* =====================================
                                Company Logo
                            ====================================== */}

                            <div className="rounded-xl border bg-card p-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="company_logo">
                                        Company Logo
                                    </Label>

                                    <p className="text-sm text-muted-foreground">
                                        PNG, JPG, WEBP or SVG. Maximum 5MB.
                                    </p>

                                    <div className="mt-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                                        {/* Preview */}

                                        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-muted">
                                            {preview ? (
                                                <img
                                                    src={preview}
                                                    alt="Company logo preview"
                                                    className="h-full w-full object-contain p-3"
                                                />
                                            ) : (
                                                <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
                                            )}
                                        </div>

                                        {/* Upload trigger */}

                                        <div className="flex flex-1 flex-col gap-2">
                                            <label
                                                htmlFor="company_logo"
                                                className="flex w-full max-w-sm cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                                            >
                                                <UploadCloud className="h-4 w-4" />
                                                {fileName ?? 'Choose a new logo'}
                                            </label>

                                            <Input
                                                id="company_logo"
                                                name="company_logo"
                                                type="file"
                                                accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                                                onChange={handleLogoChange}
                                                className="hidden"
                                            />

                                            <InputError
                                                message={errors.company_logo}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* =====================================
                                Save
                            ====================================== */}

                            <div className="flex items-center gap-4">
                                <Button disabled={processing} type="submit">
                                    {processing ? 'Saving...' : 'Save'}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}