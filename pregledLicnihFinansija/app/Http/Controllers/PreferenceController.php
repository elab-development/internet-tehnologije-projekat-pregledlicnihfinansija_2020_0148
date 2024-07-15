<?php

namespace App\Http\Controllers;

use App\Models\Preference;
use Illuminate\Http\Request;

class PreferenceController extends Controller
{


    public function index()
    {

        $preferences = Preference::orderBy('user_id')->get();

        return view('preferences.index', compact('preferences'));
    }
}
