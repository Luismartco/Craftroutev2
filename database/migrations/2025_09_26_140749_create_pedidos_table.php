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
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id('id_pedido');
            $table->foreignId('cliente_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('artesano_id')->constrained('users')->onDelete('cascade');
            $table->decimal('total', 15, 2);
            $table->decimal('subtotal_productos', 15, 2)->default(0);
            $table->decimal('costo_envio', 15, 2)->default(0);
            $table->enum('estado', ['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'])->default('pendiente');
            $table->enum('metodo_entrega', ['contra_entrega', 'envio_domicilio']);
            $table->string('empresa_transportadora')->nullable();
            $table->text('direccion_entrega');
            $table->string('ciudad_entrega');
            $table->string('departamento_entrega');
            $table->string('municipio_entrega');
            $table->text('informacion_adicional')->nullable();
            $table->string('destinatario');
            $table->text('notas')->nullable();
            $table->timestamps();

            $table->index(['cliente_id']);
            $table->index(['artesano_id']);
            $table->index(['estado']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
