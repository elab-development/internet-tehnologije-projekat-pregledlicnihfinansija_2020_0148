<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssignRolesToUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $users = User::all();

        $users->each(function ($user) {
            $roles = ['admin', 'user', 'manager']; 
            $randomRole = $roles[array_rand($roles)]; 
            $user->role = $randomRole; 
            $user->save();
        });

    }

}
