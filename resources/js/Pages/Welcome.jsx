import React, { useEffect, useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout";
import FlexTricks from '../Components/home/FlexTricks';
import Tiendas from '../Components/home/Tiendas';
import Maps from '../Components/home/Maps';
import Prod from '@/Components/home/Prod';

export default function Welcome({ auth, tiendas = [], productos = [], categorias = [], user }) {
    const locations = {
        morroa: { lat: 9.3337, lng: -75.3022, name: "Morroa" },
        sampues: { lat: 9.1835, lng: -75.3812, name: "Sampués" }
    };

    const isCustomer = !!(auth?.user && auth?.user?.role === 'customer');
    const [aiProductos, setAiProductos] = useState([]);
    const [aiTiendas, setAiTiendas] = useState([]);
    const [hasPrefs, setHasPrefs] = useState(false);

    // Shared filter state
    const [categoria, setCategoria] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [rangoPrecio, setRangoPrecio] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Estado para paginación de tiendas
    const [tiendasMostradas, setTiendasMostradas] = useState(4);
    const tiendasPorCarga = 4;

    // Estado para animaciones de scroll
    const [visibleSections, setVisibleSections] = useState(new Set());

    // Hook para animaciones de scroll
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisibleSections(prev => new Set([...prev, entry.target.id]));
                }
            });
        }, observerOptions);

        // Observar secciones
        const sections = document.querySelectorAll('[data-animate]');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const mapMarkers = useMemo(() => {
        return aiTiendas
            .filter(t => typeof t?.latitude === 'number' || typeof t?.latitude === 'string')
            .slice(0, 12)
            .map(t => ({ id: t.id, lat: Number(t.latitude), lng: Number(t.longitude), name: t.nombre }))
            .filter(m => !Number.isNaN(m.lat) && !Number.isNaN(m.lng));
    }, [aiTiendas]);

    useEffect(() => {
        if (!isCustomer) return;
        fetch('/api/recommendations/has-preferences')
            .then(r => r.json())
            .then(j => setHasPrefs(!!j?.hasCompletedPreferences))
            .catch(() => setHasPrefs(false));
    }, [isCustomer]);

    useEffect(() => {
        if (!isCustomer || !hasPrefs) return;
        const controller = new AbortController();
        const { signal } = controller;
        (async () => {
            try {
                const uid = auth?.user?.id;
                // Productos
                const resProd = await fetch(`/api/recommendations/proxy/productos?user_id=${uid}`, { signal });
                if (!resProd.ok) throw new Error('Error al consultar recomendaciones');
                const dataProd = await resProd.json();
                const idsProd = (Array.isArray(dataProd) ? dataProd : (dataProd?.data ?? [])).map(x => x?.id).filter(Boolean);
                if (idsProd.length === 0) {
                    setAiProductos([]);
                } else {
                    const detRes = await fetch(`/api/recommendations/productos?ids=${idsProd.join(',')}`, { signal });
                    if (!detRes.ok) throw new Error('Error al resolver detalles');
                    const det = await detRes.json();
                    setAiProductos(Array.isArray(det) ? det : []);
                }

                // Tiendas
                const resTnd = await fetch(`/api/recommendations/proxy/tiendas?user_id=${uid}`, { signal });
                if (!resTnd.ok) throw new Error('Error al consultar recomendaciones de tiendas');
                const dataTnd = await resTnd.json();
                const idsTnd = (Array.isArray(dataTnd) ? dataTnd : (dataTnd?.data ?? [])).map(x => x?.id).filter(Boolean);
                if (idsTnd.length === 0) {
                    setAiTiendas([]);
                } else {
                    const detResT = await fetch(`/api/recommendations/tiendas?ids=${idsTnd.join(',')}`, { signal });
                    if (!detResT.ok) throw new Error('Error al resolver detalles de tiendas');
                    const detT = await detResT.json();
                    setAiTiendas(Array.isArray(detT) ? detT : []);
                }
            } catch (e) {
                // Silently handle errors for AI recommendations
            }
        })();
        return () => controller.abort();
    }, [isCustomer, hasPrefs, auth?.user?.id]);


    return (
         <>
          <style>{`
                 .leaflet-container {
                     z-index: 0 !important;
                 }
             `}</style>
        <GuestLayout auth={auth} fullWidth={true}>
            <Head title="Welcome" />
            <h1 className="text-[#2B1F1F] text-center py-4 text-2xl font-bold">"Cada pieza, una historia"</h1>
            <FlexTricks />

            {/* Sección combinada de tiendas y productos recomendados */}
            {(aiTiendas.length > 0 || aiProductos.length > 0) && (
                <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
                    <div className="text-center mb-12 px-6">
                        <h2 className="text-4xl font-bold text-[#2B1F1F] mb-4">Descubre lo Mejor de Nuestra Artesanía</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Productos únicos y tiendas excepcionales seleccionados especialmente para ti
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] mx-auto rounded-full mt-6"></div>
                    </div>

                    {/* Tiendas Recomendadas */}
                    {aiTiendas.length > 0 && (
                        <div className="mb-16">
                            <h3 className="text-2xl font-bold text-[#2B1F1F] mb-8 text-center">Tiendas Destacadas</h3>
                            <Tiendas tiendas={aiTiendas.slice(0, 6)} />
                        </div>
                    )}

                    {/* Productos Recomendados */}
                    {aiProductos.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-bold text-[#2B1F1F] mb-8 text-center">Productos Recomendados</h3>
                            <Prod productos={aiProductos.slice(0, 8)} categorias={categorias} user={auth?.user || user} showFilters={false} categoria={categoria} setCategoria={setCategoria} municipio={municipio} setMunicipio={setMunicipio} rangoPrecio={rangoPrecio} setRangoPrecio={setRangoPrecio} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        </div>
                    )}
                </div>
            )}

            {/* Sección principal de navegación */}
            <div id="nav-section" data-animate className={`py-20 bg-white transition-all duration-1000 ${visibleSections.has('nav-section') ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-[#2B1F1F] mb-6">Explora Todo Nuestro Catálogo</h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto">
                        Descubre todas las tiendas y productos artesanales de nuestra comunidad
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="group bg-gradient-to-br from-[#2B1F1F] to-[#4B3A3A] rounded-2xl p-8 text-white hover:shadow-2xl hover:shadow-[#2B1F1F]/25 transition-all duration-500 hover:-translate-y-3 hover:scale-105 cursor-pointer transform-gpu">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-30 group-hover:scale-110 transition-all duration-300">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300">Todas las Tiendas</h3>
                                <p className="text-white text-opacity-90 mb-6 group-hover:text-opacity-100 transition-all duration-300">Explora tiendas artesanales de Morroa y Sampués</p>
                                <a href="#tiendas-section" className="inline-block bg-white text-[#2B1F1F] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 no-underline shadow-lg group-hover:shadow-xl">
                                    Ver Tiendas →
                                </a>
                            </div>
                        </div>

                        <div className="group bg-gradient-to-br from-[#4B3A3A] to-[#2B1F1F] rounded-2xl p-8 text-white hover:shadow-2xl hover:shadow-[#4B3A3A]/25 transition-all duration-500 hover:-translate-y-3 hover:scale-105 cursor-pointer transform-gpu">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-30 group-hover:scale-110 transition-all duration-300">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300">Todos los Productos</h3>
                                <p className="text-white text-opacity-90 mb-6 group-hover:text-opacity-100 transition-all duration-300">Descubre productos únicos hechos a mano</p>
                                <a href="#productos-section" className="inline-block bg-white text-[#2B1F1F] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 no-underline shadow-lg group-hover:shadow-xl">
                                    Ver Productos →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tiendas en carrusel */}
            <div id="tiendas-section" data-animate className={`py-16 bg-gray-50 transition-all duration-1000 ${visibleSections.has('tiendas-section') ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
                <h2 className="text-3xl font-bold text-[#2B1F1F] text-center mb-12">Nuestras Tiendas Artesanales</h2>
                <Tiendas tiendas={tiendas} />
            </div>

            {/* Productos con filtros */}
            <div id="productos-section" data-animate className={`py-16 bg-white transition-all duration-1000 ${visibleSections.has('productos-section') ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
                <h2 className="text-3xl font-bold text-[#2B1F1F] text-center mb-12">Nuestros Productos Artesanales</h2>
                <Prod productos={productos} categorias={categorias} user={auth?.user || user} showFilters={true} categoria={categoria} setCategoria={setCategoria} municipio={municipio} setMunicipio={setMunicipio} rangoPrecio={rangoPrecio} setRangoPrecio={setRangoPrecio} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            {/* Mapas */}
            <div id="mapas-section" data-animate className={`py-16 bg-gray-50 transition-all duration-1000 ${visibleSections.has('mapas-section') ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-[#2B1F1F] text-center mb-12">¿Cómo llegar a nuestros municipios?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-center text-xl font-semibold mb-4">Morroa</h3>
                            <div className="w-full h-[300px] md:h-[400px] rounded-lg shadow-md">
                                <Maps position={locations.morroa} markers={mapMarkers} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-center text-xl font-semibold mb-4">Sampués</h3>
                            <div className="w-full h-[300px] md:h-[400px] rounded-lg shadow-md">
                                <Maps position={locations.sampues} markers={mapMarkers} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12 bg-[#2B1F1F] text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Te esperamos con los brazos abiertos</h2>
                <p className="text-white text-opacity-90">Cada pieza cuenta una historia única de nuestra cultura artesanal</p>
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }

                /* Optimizaciones de rendimiento para transformaciones */
                .transform-gpu {
                    transform: translateZ(0);
                    backface-visibility: hidden;
                    perspective: 1000px;
                }

                /* Mejora de transiciones para mejor rendimiento */
                .transition-all {
                    transition-property: all;
                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* Estados hover mejorados */
                .group:hover .group-hover\:scale-105 {
                    transform: scale(1.05);
                }

                .group:hover .group-hover\:scale-110 {
                    transform: scale(1.1);
                }

                .group:hover .group-hover\:bg-opacity-30 {
                    background-color: rgba(255, 255, 255, 0.3);
                }

                .group:hover .group-hover\:text-opacity-100 {
                    color: rgba(255, 255, 255, 1);
                }

                .group:hover .group-hover\:shadow-xl {
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                }
            `}</style>
        </GuestLayout>
        </>
    );
}

