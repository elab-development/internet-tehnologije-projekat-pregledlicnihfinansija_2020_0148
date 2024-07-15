<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $transactions = Transaction::where('user_id', $user->id)->with('category')->get();

        $transactionDetails = $transactions->map(function ($transaction) {
            return [
                'id' => $transaction->id,
                'amount' => $transaction->amount,
                'description' => $transaction->description,
                'date' => $transaction->date,
                'category_name' => $transaction->category->name,
            ];
        });

        return response()->json(['transactions' => $transactionDetails], 200);
    }

    public function store(Request $request)
    {

        $request->validate([
            'category_id' => 'required',
            'amount' => 'required|numeric',
            'description' => 'required|string',
        ]);

        $user = auth()->user();

        $category = Category::findOrFail($request->input('category_id'));

        $transaction = new Transaction([
            'amount' => $request->input('amount'),
            'description' => $request->input('description'),
            'date' => now(),
        ]);

        $transaction->user()->associate($user);
        $transaction->category()->associate($category);
        $transaction->save();

        $transactionDetails = [
            'id' => $transaction->id,
            'amount' => $transaction->amount,
            'description' => $transaction->description,
            'date' => $transaction->date,
            'user_name' => $user->name,
            'category_name' => $category->name,
        ];

        return response()->json(['message' => 'Transaction created successfully', 'transaction' => $transactionDetails], 201);
    }
}
