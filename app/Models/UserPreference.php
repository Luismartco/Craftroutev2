<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'selected_preferences',
        'has_completed_preferences'
    ];

    protected $casts = [
        'selected_preferences' => 'array',
        'has_completed_preferences' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
