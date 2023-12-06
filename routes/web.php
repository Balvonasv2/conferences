<?php

use App\Http\Controllers\ConferenceController;
use Illuminate\Support\Facades\Route;

Route::view('/{path?}', 'conferences.index');
Route::resource('conferences', ConferenceController::class);

require __DIR__.'/auth.php';
