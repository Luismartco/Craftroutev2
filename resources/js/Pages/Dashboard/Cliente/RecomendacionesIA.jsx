import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';

const API_BASE = '/api/recommendations/proxy';

export default function RecomendacionesIA({ hasCompletedPreferences = false }) {
    const { props } = usePage();
    const user = props?.auth?.user;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [productos, setProductos] = useState([]);
    const [tiendas, setTiendas] = useState([]);

    useEffect(() => {
        if (!user) return;
        if (!hasCompletedPreferences) {
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        const { signal } = controller;

        async function fetchData() {
            try {
                setLoading(true);
                setError('');
                const uid = user.id;
                const [prodRes, tiendasRes] = await Promise.all([
                    fetch(`${API_BASE}/productos?user_id=${uid}`, { signal }),
                    fetch(`${API_BASE}/tiendas?user_id=${uid}`, { signal })
                ]);

                if (!prodRes.ok || !tiendasRes.ok) {
                    throw new Error('Error al consultar la API de recomendaciones');
                }

                const prodJson = await prodRes.json();
                const tiendasJson = await tiendasRes.json();

                const productoIds = (Array.isArray(prodJson) ? prodJson : (prodJson?.data ?? []))
                    .map((p) => p?.id)
                    .filter(Boolean);
                const tiendaIds = (Array.isArray(tiendasJson) ? tiendasJson : (tiendasJson?.data ?? []))
                    .map((t) => t?.id)
                    .filter(Boolean);

                const [productosDetRes, tiendasDetRes] = await Promise.all([
                    fetch(`/api/recommendations/productos?ids=${productoIds.join(',')}`, { signal }),
                    fetch(`/api/recommendations/tiendas?ids=${tiendaIds.join(',')}`, { signal })
                ]);

                if (!productosDetRes.ok || !tiendasDetRes.ok) {
                    throw new Error('Error al cargar detalles de productos/tiendas');
                }

                const productosDet = await productosDetRes.json();
                const tiendasDet = await tiendasDetRes.json();

                setProductos(Array.isArray(productosDet) ? productosDet : []);
                setTiendas(Array.isArray(tiendasDet) ? tiendasDet : []);
            } catch (e) {
                if (e.name !== 'AbortError') {
                    setError(e.message || 'No se pudieron cargar las recomendaciones');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();
        return () => controller.abort();
    }, [user, hasCompletedPreferences]);

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-4">Recomendación por IA</h2>
                            {!hasCompletedPreferences && (
                                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-4">
                                    Debes seleccionar 3 productos en "Tus preferencias" para obtener recomendaciones.
                                </div>
                            )}

                            {loading && <div>Cargando recomendaciones...</div>}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                                    {error}
                                </div>
                            )}

                            {!loading && !error && hasCompletedPreferences && (
                                <div className="space-y-10">
                                    <section>
                                        <h3 className="text-xl font-semibold mb-3">Productos recomendados</h3>
                                        {productos.length === 0 ? (
                                            <div className="text-gray-600">No hay productos recomendados por ahora.</div>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                {productos.map((p, idx) => (
                                                    <div key={p.id ?? idx} className="border rounded-lg overflow-hidden">
                                                        {p.imagen ? (
                                                            <img src={p.imagen.startsWith('http') ? p.imagen : `/storage/${p.imagen}`} alt={p.nombre || 'Producto'} className="w-full h-48 object-cover" />
                                                        ) : (
                                                            <div className="w-full h-48 bg-gray-100" />
                                                        )}
                                                        <div className="p-3">
                                                            <div className="font-semibold">{p.nombre ?? `Producto #${p.id}`}</div>
                                                            {p.precio && <div className="text-sm text-gray-600">$ {Number(p.precio).toLocaleString()}</div>}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </section>

                                    <section>
                                        <h3 className="text-xl font-semibold mb-3">Tiendas recomendadas</h3>
                                        {tiendas.length === 0 ? (
                                            <div className="text-gray-600">No hay tiendas recomendadas por ahora.</div>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                {tiendas.map((t, idx) => (
                                                    <div key={t.id ?? idx} className="border rounded-lg p-3">
                                                        <div className="font-semibold">{t.nombre ?? `Tienda #${t.id}`}</div>
                                                        {t.direccion && <div className="text-sm text-gray-600">{t.direccion}</div>}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </section>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

