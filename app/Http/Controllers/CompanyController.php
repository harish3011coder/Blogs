<?php

namespace App\Http\Controllers;

use App\Models\CompanySetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index()
    {
        $company = CompanySetting::first();

        return Inertia::render('company/index', [
            'company' => $company,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'company_logo' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:5120',
        ]);

        $company = CompanySetting::first();

        if (!$company) {
            $company = new CompanySetting();
        }

        $company->company_name = $validated['company_name'];

        if ($request->hasFile('company_logo')) {
            if ($company->company_logo) {
                Storage::disk('public')->delete($company->company_logo);
            }

            $company->company_logo = $request
                ->file('company_logo')
                ->store('company', 'public');
        }

        $company->save();

        return redirect()
            ->route('company.index')
            ->with('success', 'Company details updated successfully!');
    }
}