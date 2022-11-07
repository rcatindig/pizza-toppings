<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Pizza extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'description'];

    /**
     * The pizza has many toppings.
     */
    public function toppings()
    {
        return $this->belongsToMany(Topping::class, 'pizza_topping');
    }
}
