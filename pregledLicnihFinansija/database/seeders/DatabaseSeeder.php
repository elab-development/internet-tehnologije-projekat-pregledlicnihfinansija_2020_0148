<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::truncate();
        Transaction::truncate();
        Category::truncate();

        $users = User::factory(10)->create();
        $this->call(AssignRolesToUsersSeeder::class);
        $categories = Category::factory(5)->create();

        foreach (range(1, 20) as $index) {
            Transaction::factory()->create([
                'user_id' => $users->random()->id,
                'category_id' => $categories->random()->id
            ]);
        }

    }
}
