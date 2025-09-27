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
        Schema::create('pedido_detalles', function (Blueprint $table) {
            $table->id('id_detalle');
            $table->foreignId('id_pedido')->constrained('pedidos', 'id_pedido')->onDelete('cascade');
            $table->foreignId('id_producto')->constrained('productos', 'id')->onDelete('cascade');
            $table->integer('cantidad');
            $table->decimal('precio_unitario', 15, 2);
            $table->decimal('subtotal', 15, 2);
            $table->string('nombre_producto'); // Snapshot para integridad
            $table->timestamps();

            $table->index(['id_pedido']);
            $table->index(['id_producto']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedido_detalles');
    }
};
