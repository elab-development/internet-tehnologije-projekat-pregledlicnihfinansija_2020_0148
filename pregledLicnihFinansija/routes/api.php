<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserTransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Gate;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/users', [UserController::class, 'index']);
Route::get('/paginated-users', [UserController::class, 'paginateUsers']);
Route::get('search/{name}', [UserController::class, 'searchByName']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/paginated-categories', [CategoryController::class, 'paginateCategories']);
Route::post('/password/forgot', [AuthController::class, 'forgotPassword']);
Route::post('/password/reset', [AuthController::class, 'resetPassword']);

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('/users', [UserController::class, 'store'])->middleware('role:admin');
    Route::put('/users/{user}', [UserController::class, 'update'])
        ->middleware('adminOrManager');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->middleware('role:admin');

    Route::post('/categories', [CategoryController::class, 'store'])->middleware('role:admin');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])
        ->middleware('adminOrManager');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->middleware('role:admin');

    Route::post('/transactions', [TransactionController::class, 'store']);

    Route::get('/users/{id}/transactions', [UserTransactionController::class, 'index']);

    Route::get('/users/{id}/transactions/{min_amount}/{max_amount}', [UserTransactionController::class, 'filterByAmount']);

    Route::get('/users/{id}/transactions_sort_by_date', [UserTransactionController::class, 'sortDates']);

    Route::get('/users/{id}/transactions-paginate', [UserTransactionController::class, 'paginateTransactions']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});
