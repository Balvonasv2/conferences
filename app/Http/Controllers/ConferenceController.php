<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConferenceRequest;
use App\Http\Requests\UpdateConferenceRequest;
use App\Models\Conference;

class ConferenceController extends Controller
{
    public function index()
    {
        $conferences = Conference::all();
        return view('conferences.index', compact('conferences'));
    }

    public function create()
    {
        return view('conferences.create');
    }

    public function store(StoreConferenceRequest $request)
    {
        $conference = Conference::create($request->validated());
        $conference->save();
        return redirect()->route('conferences.index')->with('success', 'Conference created successfully.');
    }

    public function show(Conference $conference)
    {
        return view('conferences.show', compact('conference'));
    }

    public function edit(Conference $conference)
    {
        return view('conferences.edit', compact('conference'));
    }

    public function update(UpdateConferenceRequest $request, Conference $conference)
    {
        $conference->fill($request->validated());
        $conference->save();
        return redirect()->route('conferences.show', $conference)->with('success', 'Conference updated successfully.');
    }

    public function destroy(Conference $conference)
    {
        $conference->delete();
        return redirect()->route('conferences.index')->with('success', 'Conference deleted successfully.');
    }
}
