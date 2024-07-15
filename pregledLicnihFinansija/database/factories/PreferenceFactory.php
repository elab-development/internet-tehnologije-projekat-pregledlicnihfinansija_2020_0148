<?php

namespace Database\Factories;

use App\Models\Preference;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Preference>
 */
class PreferenceFactory extends Factory
{
    protected $model = Preference::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'preferred_language' => fake()->randomElement(['en', 'es', 'fr', 'de']),
            'receive_newsletter' => fake()->boolean,
        ];
    }
}
