<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('pizzas', \App\Http\Controllers\Api\PizzaController::class);

Route::apiResource('toppings', \App\Http\Controllers\Api\ToppingController::class);

Route::get('pizza/{id}/toppings', [\App\Http\Controllers\Api\PizzaController::class, 'get_pizza_toppings']);
