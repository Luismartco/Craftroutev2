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
        Schema::create('tienda_featured_contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tienda_id')->constrained('tiendas')->onDelete('cascade');
            $table->string('featured_product_title');
            $table->text('featured_product_description');
            $table->string('featured_product_image')->nullable();
            $table->string('video_title');
            $table->text('video_description')->nullable();
            $table->string('video_url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tienda_featured_contents');
    }
};
