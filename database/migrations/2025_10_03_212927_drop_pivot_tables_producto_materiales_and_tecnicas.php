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
        Schema::dropIfExists('producto_materiales');
        Schema::dropIfExists('producto_tecnicas');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No rollback needed as these tables are no longer used
    }
};
