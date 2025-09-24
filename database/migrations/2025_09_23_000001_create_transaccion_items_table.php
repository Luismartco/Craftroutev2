<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transaccion_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaccion_id')->constrained('transacciones')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('producto_id')->constrained('productos')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreignId('tienda_id')->constrained('tiendas')->cascadeOnUpdate()->restrictOnDelete();
            // snapshots
            $table->string('product_name');
            $table->bigInteger('unit_price_amount');
            $table->integer('quantity');
            $table->bigInteger('line_subtotal_amount');
            $table->timestamps();

            $table->index(['transaccion_id']);
            $table->index(['producto_id']);
            $table->index(['tienda_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transaccion_items');
    }
};


