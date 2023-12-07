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
        return response()->json($conferences);
    }

    public function create()
    {
        return view('conferences.create');
    }

    public function store(StoreConferenceRequest $request)
    {
        $conference = Conference::create($request->validated());
        return response()->json($conference, 201);
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
        $conference->update($request->validated());
        return response()->json($conference, 200);
    }

    public function destroy(Conference $conference)
    {
        $conference->delete();
        return response()->json(['message' => 'Conference deleted successfully.'], 200);
    }
}
