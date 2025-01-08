<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasUuids;
    use HasFactory;

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected $fillable = [
    'user_id',
    'latitude',
    'longitude',
    'address',
    'status',
    'description'
    ];
    

    public function newUniqueId () {
        return Uuid::uuid4()->toString();
    }

}
