<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\Material;
use App\Models\Tecnica;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User; 



class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard/Admin/Index', [
            'stats' => [
                'total_users' => User::count(),
                'total_artesanos' => User::where('role', 'artesano')->count(),
                'total_clientes' => User::where('role', 'cliente')->count(),
            ],

            'recent_activities' => \App\Models\Activity::latest()->take(5)->get(),
            'categorias' => Categoria::orderBy('nombre')->get()->map(function($categoria) {
                return [
                    'id' => $categoria->id,
                    'name' => $categoria->nombre,
                    'description' => $categoria->descripcion
                ];
            }),
            'materiales' => Material::orderBy('nombre')->get()->map(function($material) {
                return [
                    'id' => $material->id,
                    'name' => $material->nombre,
                    'description' => $material->descripcion
                ];
            }),
            'tecnicas' => Tecnica::orderBy('nombre')->get()->map(function($tecnica) {
                return [
                    'id' => $tecnica->id,
                    'name' => $tecnica->nombre,
                    'description' => $tecnica->descripcion
                ];
            }),
        ]);
    }

    public function storeCategoria(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255|unique:categorias',
            'descripcion' => 'required|string',
        ]);

        Categoria::create($validated);

        return redirect()->back()->with('success', 'Categoría creada exitosamente');
    }

    public function updateCategoria(Request $request, $id)
    {
        $categoria = Categoria::findOrFail($id);

        $validated = $request->validate([
            'nombre' => 'required|string|max:255|unique:categorias,nombre,' . $id,
            'descripcion' => 'required|string',
        ]);

        $categoria->update($validated);

        return redirect()->back()->with('success', 'Categoría actualizada exitosamente');
    }

    public function destroyCategoria($id)
    {
        $categoria = Categoria::findOrFail($id);
        
        // Verificar si hay productos asociados
        $productosAsociados = $categoria->productos()->count();
        $productosConNombreCategoria = \App\Models\Producto::where('categoria', $categoria->nombre)->count();
        
        if ($productosAsociados > 0 || $productosConNombreCategoria > 0) {
            return redirect()->back()->with('error', 'No se puede eliminar la categoría porque tiene productos asociados');
        }

        $categoria->delete();

        return redirect()->back()->with('success', 'Categoría eliminada exitosamente');
    }

    public function storeMaterial(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255|unique:materiales',
            'descripcion' => 'required|string',
        ]);

        Material::create($validated);

        return redirect()->back()->with('success', 'Material creado exitosamente');
    }

    public function updateMaterial(Request $request, $id)
    {
        $material = Material::findOrFail($id);

        $validated = $request->validate([
            'nombre' => 'required|string|max:255|unique:materiales,nombre,' . $id,
            'descripcion' => 'required|string',
        ]);

        $material->update($validated);

        return redirect()->back()->with('success', 'Material actualizado exitosamente');
    }

    public function destroyMaterial($id)
    {
        $material = Material::findOrFail($id);
        
        // Verificar si hay productos asociados
        $productosAsociados = $material->productos()->count();
        
        if ($productosAsociados > 0) {
            return redirect()->back()->with('error', 'No se puede eliminar el material porque tiene productos asociados');
        }

        $material->delete();

        return redirect()->back()->with('success', 'Material eliminado exitosamente');
    }

    public function storeTecnica(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255|unique:tecnicas',
            'descripcion' => 'required|string',
        ]);

        Tecnica::create($validated);

        return redirect()->back()->with('success', 'Técnica creada exitosamente');
    }

    public function updateTecnica(Request $request, $id)
    {
        $tecnica = Tecnica::findOrFail($id);

        $validated = $request->validate([
            'nombre' => 'required|string|max:255|unique:tecnicas,nombre,' . $id,
            'descripcion' => 'required|string',
        ]);

        $tecnica->update($validated);

        return redirect()->back()->with('success', 'Técnica actualizada exitosamente');
    }

    public function destroyTecnica($id)
    {
        $tecnica = Tecnica::findOrFail($id);
        
        // Verificar si hay productos asociados
        $productosAsociados = $tecnica->productos()->count();
        
        if ($productosAsociados > 0) {
            return redirect()->back()->with('error', 'No se puede eliminar la técnica porque tiene productos asociados');
        }

        $tecnica->delete();

        return redirect()->back()->with('success', 'Técnica eliminada exitosamente');
    }

    public function manageUsers()

    {
        return Inertia::render('Dashboard/Admin/ManageUsers', [
            'users' => User::with('profile')->paginate(10),
        ]);
    }

    public function manageArtesanos(): Response
    {
        return Inertia::render('Dashboard/Admin/ManageArtesanos', [
            'artesanos' => User::where('role', 'artesano')
                ->with('profile')
                ->paginate(10),
        ]);
    }
}
