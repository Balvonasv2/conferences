<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ConferenceController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/conferences', [ConferenceController::class, 'index']);
Route::get('/conferences/{conference}', [ConferenceController::class, 'show']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/conferences', [ConferenceController::class, 'store']);
    Route::put('/conferences/{conference}', [ConferenceController::class, 'update']);
    Route::delete('/conferences/{conference}', [ConferenceController::class, 'destroy']);
});

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', function (Request $request) {
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();

        $token = $request->user()->createToken('authToken')->plainTextToken;
        return response()->json(['token' => $token]);
    }

    return response()->json(['error' => 'Incorrect credentials.'], 401);
});
Route::post('/logout', [AuthenticatedSessionController::class, 'logout']);

