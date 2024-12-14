<?php

namespace App\Http\Controllers;

use App\Models\Preference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PreferenceController extends Controller
{


    public function index()
    {

        //$preferences = Preference::orderBy('user_id')->get();


        $preferences = DB::table('preferences')
            ->join('users', 'preferences.user_id', '=', 'users.id')
            ->orderBy('preferences.user_id')
            ->select('preferences.user_id', 'users.name as user_name', 'preferences.preferred_language', 'preferences.receive_newsletter')
            ->get();

        return view('preferences.index', compact('preferences'));
    }
}
