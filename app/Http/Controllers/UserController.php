<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $user = User::paginate(10);
        // dd($user);
        return Inertia::render(
            'User/Index',
            ['user' => $user]
        );
    }
    public function create()
    {
        return Inertia::render(
            'User/Create'
        );
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',

            'password_confirmation' => 'required|same:password',
        ]);

        User::create($request->all());
        return redirect()->route('users.index');
    }
 
}
