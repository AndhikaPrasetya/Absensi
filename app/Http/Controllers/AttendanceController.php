<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;

class AttendanceController extends Controller
{
    static function isTodayAttendanceSubmitted():bool
    {
       $userId = Auth::user()->id ?? null;

       if(!$userId){
        return false;
       }

        return Attendance::where('user_id', Auth::user()->id)
        ->whereDate('created_at', now()->toDateString())
        ->exists();
    }

    public function index(): Response
    {
        $attendances = Attendance::paginate(10);
        return Inertia::render('Attendance/Index',[
            'attendances' => $attendances,
        ]);
    }

    public function submitAttendance(Request $request){
        $request->validate([
            'status' => 'required',
            "description" => 'required_if:status,sick,leave,permit,business_trip,remote',
            'latitude' => 'required',
            'longitude' => 'required',
            'address' =>'required'
        ]);

      Attendance::create([
            'user_id' => auth('web')->id(),
            'status' => $request->status,
            'description' => $request->description,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'address' =>$request->address
        ]);

        // dd($attendance);

        // return Redirect::route("users");
    }


}
