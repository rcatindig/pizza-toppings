<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PizzaRequest;
use App\Http\Resources\PizzaResource;
use App\Models\Pizza;
use App\Models\Topping;
use Illuminate\Http\Request;

class PizzaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PizzaResource::collection(Pizza::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PizzaRequest $request)
    {
        $pizza = Pizza::create($request->validated());

        $toppings = Topping::find($request->toppings);

        $pizza->toppings()->attach($toppings);

        return new PizzaResource($pizza);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pizza  $pizza
     * @return \Illuminate\Http\Response
     */
    public function show(Pizza $pizza)
    {
        return new PizzaResource($pizza);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pizza  $pizza
     * @return \Illuminate\Http\Response
     */
    public function update(PizzaRequest $request, Pizza $pizza)
    {
        $pizza->update($request->validated());

        $toppings = Topping::find($request->toppings);

        $pizza->toppings()->sync($toppings);

        return new PizzaResource($pizza);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pizza  $pizza
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pizza $pizza)
    {
        $pizza->delete();

        return response()->noContent();
    }

    /**
     * Get all toppings within that pizza
     *
     * @param  \App\Models\Pizza  $pizza
     * @return \Illuminate\Http\Response
     */
    public function get_pizza_toppings($id)
    {
        $pizza = Pizza::find($id);


        $toppings = $pizza->toppings->pluck("id")->toArray();


        return response()->json($toppings);
    }
}
