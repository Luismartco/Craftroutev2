<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transacciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('users')->cascadeOnUpdate()->restrictOnDelete();
            $table->string('type', 20)->default('compra'); // compra | venta
            $table->string('status', 50)->default('simulada_pagada');
            $table->bigInteger('subtotal_amount');
            $table->bigInteger('shipping_amount')->default(0);
            $table->bigInteger('total_amount');
            $table->string('currency', 10)->default('COP');
            // Datos de entrega (snapshot)
            $table->string('delivery_method', 50)->nullable();
            $table->string('delivery_address')->nullable();
            $table->string('delivery_city')->nullable();
            $table->string('delivery_department')->nullable();
            $table->string('delivery_municipality')->nullable();
            $table->string('delivery_additional_info')->nullable();
            $table->string('recipient')->nullable();
            // Pago simulado
            $table->string('payment_method', 50)->nullable();
            $table->string('payment_provider', 50)->nullable();
            $table->string('payment_status', 50)->nullable();
            $table->json('payment_meta')->nullable();
            $table->timestamp('placed_at')->useCurrent();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->index(['customer_id', 'status']);
            $table->index(['type']);
            $table->index(['placed_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transacciones');
    }
};


