<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/pizzas', function () {
    return view('pizzas');
})->middleware(['auth'])->name('pizzas');

Route::get('/toppings', function () {
    return view('toppings');
})->middleware(['auth'])->name('toppings');

require __DIR__.'/auth.php';

Route::view('/{any}', 'pizzas')
    ->middleware('auth')
    ->where('any', '.*');
