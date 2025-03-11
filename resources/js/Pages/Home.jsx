import '../../css/home.css';
import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import FlexTricks from '../Components/home/FlexTricks';
import UserCards from '../Components/home/UsersCards';
import ProductList from '../Components/home/Products';
import MapasMorroaSampues from '../Components/home/Mapas';

const Home = () => {
    return (
        <MainLayout>
            <div class="main">
                <div class="index-container">
                    <h1 className="text-white text-center py-4 text-2xl font-bold">"Cada pieza, una historia"</h1>
                    <FlexTricks />
                    <h1 className="text-white text-center pt-6 text-2xl font-bold">Nuestros artesanos</h1>
                    <UserCards />
                    <h1 className="text-white text-center pt-6 text-2xl font-bold">Productos</h1>
                    <ProductList />
                    <h1 className="text-white text-center pt-6 text-2xl font-bold">¿Como llegar a esos municipios?</h1>
                    <MapasMorroaSampues />
                    <h1 className="text-white text-center pt-6 text-2xl font-bold">Te esperamos ;)</h1>
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;
