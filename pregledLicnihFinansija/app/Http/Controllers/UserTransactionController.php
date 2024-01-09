<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Carbon\Carbon;
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


    public function filterByAmount($id, $minAmount, $maxAmount)
    {
        $transactions = Transaction::where('user_id', $id)
            ->whereBetween('amount', [$minAmount, $maxAmount])
            ->get();

        if ($transactions->isEmpty()) {
            return response()->json("Data not found", 404);
        }

        return TransactionResource::collection($transactions);
    }

    public function sortDates($user_id)
    {
        $transactions = Transaction::where('user_id', $user_id)
            ->orderBy('date', 'asc')
            ->get();

        return TransactionResource::collection($transactions);
    }

    public function paginateTransactions($user_id, Request $request)
    {
        $perPage = $request->input('per_page', 5);

        $transactions = Transaction::where('user_id', $user_id)
            ->paginate($perPage);

        return TransactionResource::collection($transactions);
    }
}
