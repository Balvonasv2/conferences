<?php

use App\Http\Controllers\ConferenceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('conferences', ConferenceController::class);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
