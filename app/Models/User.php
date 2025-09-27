<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'last_name',
        'email',
        'password',
        'birth_date',
        'gender',
        'role',
        'residence_municipality',
        'neighborhood',
        'address',
        'phone',
        'latitude',
        'longitude',
        'profile_photo', // Added for profile photo upload
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'birth_date' => 'date',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    public function preferences()
    {
        return $this->hasOne(UserPreference::class);
    }

    public function pedidosCliente()
    {
        return $this->hasMany(Pedido::class, 'cliente_id');
    }

    public function pedidos()
    {
        return $this->hasMany(Pedido::class, 'cliente_id');
    }

    public function artesanosFavoritos()
    {
        return $this->belongsToMany(User::class, 'artesano_favorito', 'cliente_id', 'artesano_id')
            ->where('role', 'artisan');
    }

    public function tienda()
    {
        return $this->hasOne(Tienda::class);
    }

    public function productos()
    {
        return $this->hasMany(Producto::class);
    }

    public function pedidosArtesano()
    {
        return $this->hasMany(Pedido::class, 'artesano_id');
    }
}
