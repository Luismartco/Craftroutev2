<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $materiales = Material::orderBy('nombre')->get();
        
        return response()->json([
            'success' => true,
            'data' => $materiales
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // No se necesita para API
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'nombre' => 'required|string|max:255|unique:materiales',
                'descripcion' => 'required|string',
            ]);

            $material = Material::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Material creado exitosamente',
                'data' => $material
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear el material',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        try {
            $material = Material::findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $material
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Material no encontrado'
            ], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // No se necesita para API
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $material = Material::findOrFail($id);

            $validated = $request->validate([
                'nombre' => 'required|string|max:255|unique:materiales,nombre,' . $id,
                'descripcion' => 'required|string',
            ]);

            $material->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Material actualizado exitosamente',
                'data' => $material
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar el material',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $material = Material::findOrFail($id);
            
            // Verificar si hay productos asociados
            if ($material->productos()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se puede eliminar el material porque tiene productos asociados'
                ], 400);
            }

            $material->delete();

            return response()->json([
                'success' => true,
                'message' => 'Material eliminado exitosamente'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar el material',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
