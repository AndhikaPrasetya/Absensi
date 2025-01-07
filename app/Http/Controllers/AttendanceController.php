<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class AttendanceController extends Controller
{
    //

    public function submitAttendance(Request $request){
        $request->validate([
            'status' => 'required',
            "description" => 'required_if:status,sick,leave,permit,business_trip,remote',
            'latitude' => 'required',
            'longitude' => 'required',
            'address' =>'required'
        ]);

      Attendance::create([
            'user_id' => auth()->id(),
            'status' => $request->status,
            'description' => $request->description,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'address' =>$request->address
        ]);

        // dd($attendance);

        return Redirect::route("users");
    }
}
