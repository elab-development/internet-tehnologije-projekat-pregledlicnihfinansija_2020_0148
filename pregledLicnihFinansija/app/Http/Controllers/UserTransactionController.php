<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;

class UserTransactionController extends Controller
{
    public function index($user_id)
    {
        $transactions = Transaction::get()->where('user_id', $user_id);

        if ($transactions->isEmpty()) {
            return response()->json("Data not found", 404);
        }

        return TransactionResource::collection($transactions);
    }
}
