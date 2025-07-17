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
        Schema::table('users', function (Blueprint $table) {
            $table->string('last_name', 100)->after('name'); // Agrega last_name después de name
            $table->string('email')->after('last_name')->change(); // Mueve email después de last_name (sin UNIQUE)
            $table->date('birth_date')->nullable()->after('password'); // Mueve birth_date después de password
            $table->enum('gender', ['Male', 'Female', 'Other'])->nullable()->after('birth_date');
            $table->enum('role', ['artisan', 'customer', 'admin'])->after('gender');
            $table->string('residence_municipality', 255)->nullable()->after('role');
            $table->string('neighborhood', 255)->nullable()->after('residence_municipality');
            $table->string('address', 255)->nullable()->after('neighborhood');
            $table->string('phone', 20)->nullable()->after('address');
            $table->decimal('latitude', 10, 8)->nullable()->after('phone');
            $table->decimal('longitude', 11, 8)->nullable()->after('latitude');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'last_name', 
                'birth_date', 
                'gender', 
                'role', 
                'residence_municipality', 
                'neighborhood', 
                'address', 
                'phone', 
                'latitude', 
                'longitude'
            ]);
        });
    }
};
