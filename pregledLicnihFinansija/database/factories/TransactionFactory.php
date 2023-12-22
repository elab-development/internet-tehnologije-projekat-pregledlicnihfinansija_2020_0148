<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'user_id' => User::factory(),
        'amount' => fake()->numberBetween(0, 100000),
        //'category_id' => ,
        'description' => fake()->sentence,
        'date' => fake()->dateTimeThisMonth(),
        ];
    }
}
