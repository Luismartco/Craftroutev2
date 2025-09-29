import React, { useEffect, useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout";
import FlexTricks from '../Components/home/FlexTricks';
import UserCards from '../Components/home/UsersCards';
import ProductList from '../Components/home/Products';
import Tiendas from '../Components/home/Tiendas';
import Maps from '../Components/home/Maps';
import Prod from '@/Components/home/Prod';

export default function Welcome({ auth, tiendas = [], productos = [], user }) {
    const locations = {
        morroa: { lat: 9.3337, lng: -75.3022, name: "Morroa" },
        sampues: { lat: 9.1835, lng: -75.3812, name: "Sampués" }
    };

    const isCustomer = !!(auth?.user && auth?.user?.role === 'customer');
    const [aiProductos, setAiProductos] = useState([]);
    const [aiTiendas, setAiTiendas] = useState([]);
    const [hasPrefs, setHasPrefs] = useState(false);

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
            <h1 className="text-[#2B1F1F] text-center pt-6 text-2xl font-bold">Nuestras Tiendas</h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6">
                Descubre nuestra selección de productos artesanales únicos, 
                elaborados con técnicas tradicionales y materiales de la más alta calidad.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] mx-auto rounded-full"></div>

            <Tiendas tiendas={tiendas} />
            {aiTiendas.length > 0 && (
                <>
                    <h1 className="text-[#2B1F1F] text-center pt-6 text-2xl font-bold">Tiendas Recomendadas por IA</h1>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6">
                        Tiendas recomendadas especialmente para ti basadas en tus preferencias.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] mx-auto rounded-full"></div>
                    <Tiendas tiendas={aiTiendas} />
                </>
            )}
            {/*<UserCards />*/}
            <h1 className="text-[#2B1F1F] text-center pt-6 text-2xl font-bold">Productos</h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6">
                        Descubre nuestra selección de productos artesanales únicos,
                        elaborados con técnicas tradicionales y materiales de la más alta calidad.
                    </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] mx-auto rounded-full"></div>
            <Prod productos={productos} user={auth?.user || user} />
            {aiProductos.length > 0 && (
                <>
                    <h1 className="text-[#2B1F1F] text-center pt-6 text-2xl font-bold">Productos Recomendados por IA</h1>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6">
                        Productos recomendados especialmente para ti basadas en tus preferencias.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] mx-auto rounded-full"></div>
                    <Prod productos={aiProductos} user={auth?.user || user} />
                </>
            )}
            <div className="w-50 h-1 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] mx-auto rounded-full"></div>

            {/* <ProductList />*/}
            <h1 className="text-[#2B1F1F] text-center pt-6 text-2xl font-bold">¿Cómo llegar a esos municipios?</h1>
            {/* Mapas */}
            <div className="flex flex-wrap gap-6 justify-center max-w-[1500px] mx-auto p-4">
            <div className="w-full md:w-1/2">
                <h3 className="text-center text-xl font-semibold mb-2">Morroa</h3>
                <div id="map-morroa" className="w-full h-[400px] md:h-[500px] rounded-lg shadow-md">
                <Maps position={locations.morroa} markers={mapMarkers} />
                </div>
            </div>

            <div className="w-full md:w-[46%]">
                <h3 className="text-center text-xl font-semibold mb-2">Sampués</h3>
                <div id="map-sampues" className="w-full h-[400px] md:h-[500px] rounded-lg shadow-md">
                <Maps position={locations.sampues} markers={mapMarkers} />
                </div>
            </div>
            </div>  
            <h1 className="text-[#2B1F1F] text-center pt-6 text-2xl font-bold pb-8">Te esperamos 😊</h1>           
        </GuestLayout>
        </>
    );
}

