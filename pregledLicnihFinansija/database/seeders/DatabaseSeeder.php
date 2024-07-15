<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Preference;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        User::truncate();
        Transaction::truncate();
        Category::truncate();
        Preference::truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->call(CategorySeeder::class);
        /* $this->call([
            PreferenceSeeder::class,
        ]); */

        $users = User::factory(10)->create();

        foreach ($users as $user) {
            Preference::factory()->create([
                'user_id' => $user->id,
            ]);
        }

        $this->call(AssignRolesToUsersSeeder::class);

        User::create([
            'name' => 'Petra B',
            'email' => 'petra@example.com',
            'password' => 'password',
            'role' => 'admin'
        ]);

        User::create([
            'name' => 'Ivana',
            'email' => 'ivana@example.com',
            'password' => 'password',
            'role' => 'manager'
        ]);

        User::create([
            'name' => 'Milica',
            'email' => 'milica@example.com',
            'password' => 'password',
            'role' => 'user'
        ]);


        User::create([
            'name' => 'Test',
            'email' => 'test@example.com',
            'password' => 'password',
            'role' => 'user'
        ]);


        $categories = Category::all();

        foreach (range(1, 20) as $index) {
            Transaction::factory()->create([
                'user_id' => $users->random()->id,
                'category_id' => $categories->random()->id
            ]);
        }
    }
}
