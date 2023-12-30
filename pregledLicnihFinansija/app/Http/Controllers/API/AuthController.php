<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request) {
        if(!Auth::attempt($request->only('email','password'))){
            return response()
                ->json(['message' => 'Unauthorized'],401);
        }

        $user = User::where('email',$request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json(['message' => 'Hi ' .$user->name. ', you have successfully logged in!','access_token'=>$token,'token_type'=>'Bearer']);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        
        $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
