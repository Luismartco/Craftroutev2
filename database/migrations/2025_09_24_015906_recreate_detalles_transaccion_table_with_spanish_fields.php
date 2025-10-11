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
        Schema::create('detalles_transaccion', function (Blueprint $table) {
            $table->id('id_detalle');
            $table->foreignId('id_transaccion')->constrained('transacciones', 'id_transaccion')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('id_producto')->constrained('productos', 'id')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreignId('id_tienda')->constrained('tiendas', 'id')->cascadeOnUpdate()->restrictOnDelete();

            // Snapshots para integridad de datos
            $table->string('nombre_producto');
            $table->bigInteger('precio_unitario');
            $table->integer('cantidad');
            $table->bigInteger('subtotal_linea');

            $table->timestamps();

            $table->index(['id_transaccion']);
            $table->index(['id_producto']);
            $table->index(['id_tienda']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalles_transaccion');
    }
};
