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
        Schema::table('tienda_featured_contents', function (Blueprint $table) {
            $table->string('featured_product_title')->nullable()->change();
            $table->text('featured_product_description')->nullable()->change();
            $table->string('video_title')->nullable()->change();
            $table->text('video_description')->nullable()->change();
            $table->string('video_url')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tienda_featured_contents', function (Blueprint $table) {
            $table->string('featured_product_title')->nullable(false)->change();
            $table->text('featured_product_description')->nullable(false)->change();
            $table->string('video_title')->nullable(false)->change();
            $table->text('video_description')->nullable(false)->change();
            $table->string('video_url')->nullable(false)->change();
        });
    }
};
