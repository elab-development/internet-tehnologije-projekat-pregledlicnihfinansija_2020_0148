<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            ['name' => 'Utilities', 'description' => 'Expenses for utilities such as electricity, water, and gas.'],
            ['name' => 'Groceries', 'description' => 'Expenses for groceries and food items.'],
            ['name' => 'Entertainment', 'description' => 'Expenses for entertainment such as movies, concerts, and events.'],
            ['name' => 'Shopping', 'description' => 'Expenses for shopping such as clothes, electronics, and other goods.'],
            ['name' => 'Health and Wellness', 'description' => 'Expenses for health and wellness such as gym memberships, health products, and services.'],
            ['name' => 'Transportation', 'description' => 'Expenses for transportation such as fuel, public transit, and vehicle maintenance.'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
