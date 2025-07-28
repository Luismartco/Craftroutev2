import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout";
import FlexTricks from '../Components/home/FlexTricks';
import UserCards from '../Components/home/UsersCards';
import ProductList from '../Components/home/Products';
import Tiendas from '../Components/home/Tiendas';
import Maps from '../Components/home/Maps';
import Prod from '@/Components/home/Prod';


export default function Welcome({ auth }) {

    const locations = {
        morroa: { lat: 9.3337, lng: -75.3022, name: "Morroa" },
        sampues: { lat: 9.1835, lng: -75.3812, name: "Sampués" }
    };

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

            <Tiendas />
            {/*<UserCards />*/}
            <h1 className="text-[#2B1F1F] text-center pt-6 text-2xl font-bold">Productos</h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6">
                        Descubre nuestra selección de productos artesanales únicos, 
                        elaborados con técnicas tradicionales y materiales de la más alta calidad.
                    </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] mx-auto rounded-full"></div>
            <Prod />
            <div className="w-50 h-1 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] mx-auto rounded-full"></div>

            {/* <ProductList />*/}
            <h1 className="text-[#2B1F1F] text-center pt-6 text-2xl font-bold">¿Cómo llegar a esos municipios?</h1>
            {/* Mapas */}
            <div className="flex justify-center px-4 py-8"> 
            <div className="grid gird-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl" >
                <div>
                    <h3 className="text-center">Morroa</h3>
                    <div id="map-morroa" 
                    className="w-full h-[300px] md:h-[400px] rounded-lg shadow-md">
                        <Maps position={locations.morroa} />
                    </div>
                </div>
                <div>
                    <h3 className="text-center">Sampués</h3>
                    <div id="map-sampues" className="w-full h-[300px] md:h-[400px] rounded-lg shadow-md">
                        <Maps position={locations.sampues} />
                    </div>
                </div>
            </div>
        </div>
            
            <h1 className="text-[#2B1F1F] text-center pt-6 text-2xl font-bold pb-8">Te esperamos 😊</h1>           
        </GuestLayout>
        </>
    );
}

