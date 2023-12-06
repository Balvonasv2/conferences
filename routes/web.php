<?php

use App\Http\Controllers\ConferenceController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::resource('conferences', ConferenceController::class);

require __DIR__.'/auth.php';
