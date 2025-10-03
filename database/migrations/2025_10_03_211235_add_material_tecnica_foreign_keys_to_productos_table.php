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
        Schema::table('productos', function (Blueprint $table) {
            $table->foreignId('material_id')->nullable()->constrained('materiales')->onDelete('set null');
            $table->foreignId('tecnica_id')->nullable()->constrained('tecnicas')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('productos', function (Blueprint $table) {
            $table->dropForeign(['material_id']);
            $table->dropForeign(['tecnica_id']);
            $table->dropColumn(['material_id', 'tecnica_id']);
        });
    }
};
