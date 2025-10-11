<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transacciones', function (Blueprint $table) {
            $table->id('id_transaccion');
            $table->foreignId('id_cliente')->constrained('users')->cascadeOnUpdate()->restrictOnDelete();
            $table->enum('tipo_transaccion', ['compra', 'venta'])->default('compra');
            $table->string('estado_transaccion', 50)->default('simulada_pagada');
            $table->bigInteger('subtotal');
            $table->bigInteger('costo_envio')->nullable()->default(0);
            $table->bigInteger('total');
            $table->string('moneda', 10)->default('COP');

            // Campos de entrega (solo para compras)
            $table->string('metodo_entrega', 50)->nullable();
            $table->string('direccion_entrega')->nullable();
            $table->string('ciudad_entrega')->nullable();
            $table->string('departamento_entrega')->nullable();
            $table->string('municipio_entrega')->nullable();
            $table->string('info_adicional_entrega')->nullable();
            $table->string('destinatario')->nullable();

            // Campos de pago (solo para compras)
            $table->string('metodo_pago', 50)->nullable();

            $table->timestamp('fecha_creacion')->useCurrent();
            $table->timestamp('fecha_pago')->nullable();
            $table->timestamps();

            $table->index(['id_cliente', 'estado_transaccion']);
            $table->index(['tipo_transaccion']);
            $table->index(['fecha_creacion']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transacciones');
    }
};
