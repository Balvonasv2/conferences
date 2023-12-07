<?php

use Illuminate\Support\Facades\Route;

Route::view('/{path?}', 'conferences.index');

require __DIR__.'/auth.php';
