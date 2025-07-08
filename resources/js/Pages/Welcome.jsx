import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout";
import FlexTricks from '../Components/home/FlexTricks';
import UserCards from '../Components/home/UsersCards';
import ProductList from '../Components/home/Products';
import MapasMorroaSampues from '../Components/home/Mapas';
import Prod from '@/Components/home/Prod';


export default function Welcome({ auth }) {
    return (
        <GuestLayout auth={auth} fullWidth={true}>
            <Head title="Welcome" />
            <h1 className="text-[#2B1F1F] text-center py-4 text-2xl font-bold">"Cada pieza, una historia"</h1>
            <FlexTricks />
            <h1 className="text-[#2B1F1F] text-center pt-6 text-2xl font-bold">Nuestros artesanos</h1>
            <UserCards />
            <h1 className="text-[#2B1F1F] text-center pt-6 text-2xl font-bold">Productos</h1>
            <Prod />
            {/* <ProductList />*/}
            <h1 className="text-[#2B1F1F] text-center pt-6 text-2xl font-bold">¿Cómo llegar a esos municipios?</h1>
            <MapasMorroaSampues />
            <h1 className="text-[#2B1F1F] text-center pt-6 text-2xl font-bold pb-8">Te esperamos ;)</h1>           
        </GuestLayout>
    );
}

