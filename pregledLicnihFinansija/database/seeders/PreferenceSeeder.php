<?php

namespace Database\Seeders;

use App\Models\Preference;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class PreferenceSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();

        foreach (range(1, 20) as $index) {
            Preference::factory()->create([
                'user_id' => $users->random()->id,
                'preferred_language' => $this->randomLanguage(),
                'receive_newsletter' => $this->randomBoolean(),
            ]);
        }
    }

    private function randomLanguage()
    {
        $languages = ['en', 'es', 'fr', 'de'];
        return $languages[array_rand($languages)];
    }

    private function randomBoolean()
    {
        return (bool)rand(0, 1);
    }
}
