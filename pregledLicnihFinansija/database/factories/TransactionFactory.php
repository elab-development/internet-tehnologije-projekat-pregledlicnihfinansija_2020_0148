<?php

namespace Database\Factories;

use App\Models\Category;
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

            'amount' => fake()->numberBetween(0, 100000),
            'description' => fake()->sentence(),
            'date' => fake()->dateTimeThisMonth(),
            'user_id' => User::factory(),
            'category_id' => Category::factory()
        ];
    }
}
