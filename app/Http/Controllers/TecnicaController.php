<?php

namespace App\Http\Controllers;

use App\Models\Tecnica;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class TecnicaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $tecnicas = Tecnica::orderBy('nombre')->get();
        
        return response()->json([
            'success' => true,
            'data' => $tecnicas
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
                'nombre' => 'required|string|max:255|unique:tecnicas',
                'descripcion' => 'required|string',
            ]);

            $tecnica = Tecnica::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Técnica creada exitosamente',
                'data' => $tecnica
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
                'message' => 'Error al crear la técnica',
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
            $tecnica = Tecnica::findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $tecnica
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Técnica no encontrada'
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
            $tecnica = Tecnica::findOrFail($id);

            $validated = $request->validate([
                'nombre' => 'required|string|max:255|unique:tecnicas,nombre,' . $id,
                'descripcion' => 'required|string',
            ]);

            $tecnica->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Técnica actualizada exitosamente',
                'data' => $tecnica
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
                'message' => 'Error al actualizar la técnica',
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
            $tecnica = Tecnica::findOrFail($id);
            
            // Verificar si hay productos asociados
            if ($tecnica->productos()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se puede eliminar la técnica porque tiene productos asociados'
                ], 400);
            }

            $tecnica->delete();

            return response()->json([
                'success' => true,
                'message' => 'Técnica eliminada exitosamente'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar la técnica',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
