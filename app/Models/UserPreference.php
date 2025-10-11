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
        'has_completed_preferences',
        'shown_product_ids'
    ];

    protected $casts = [
        'selected_preferences' => 'array',
        'has_completed_preferences' => 'boolean',
        'shown_product_ids' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
