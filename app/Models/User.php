<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
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
     * @var list<string>
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
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
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
    
    // Relaciones para artesanos
    public function productos(): HasMany
    {
        return $this->hasMany(Producto::class, 'artesano_id');
    }

    public function ventas(): HasMany
    {
        return $this->hasMany(Venta::class, 'artesano_id');
    }

    public function pedidos(): HasMany
    {
        return $this->hasMany(Pedido::class, 'artesano_id');
    }

    // Relaciones para clientes
    public function pedidosCliente(): HasMany
    {
        return $this->hasMany(Pedido::class, 'cliente_id');
    }

    public function artesanosFavoritos(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'favoritos', 'cliente_id', 'artesano_id')
            ->where('role', 'artesano');
    }

    // Relaciones para administradores
    public function actividades(): HasMany
    {
        return $this->hasMany(Activity::class);
    }
}
