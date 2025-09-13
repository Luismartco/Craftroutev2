import React, {useState, useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import Menu from '@/Components/admin/Menu';
import DetailsPanel from '@/Components/admin/DetailsPanel';
import ManageForm from '@/Components/admin/ManageForm';
import { Head } from '@inertiajs/react';
import { MenuContext } from '@/Components/admin/MenuContext';
import { ModalContext } from '@/Components/admin/ModalContext';

export default function Index({ stats, categorias, materiales, tecnicas, flash }) {

    const { auth } = usePage().props;
    const user = auth.user;

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');

    // Mostrar mensajes de éxito o error
    useEffect(() => {
        if (flash && flash.success) {
            setMessage(flash.success);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }
        if (flash && flash.error) {
            setMessage(flash.error);
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        }
    }, [flash]);

    const data = {
       data1: [
        { producto: 'Mochila', value: 51.6 },
        { producto: 'Hamaca', value: 28.1 },
        { producto: 'Sombrero', value: 11.8 },
        { producto: 'Abarcas', value: 10.3 },
        { producto: 'Chinchorros', value: 3.4 },
        { producto: 'Tazas', value: 3.1 },
    ],
        data2: [
        { producto: 'Mochila', value: 51.6 },
        { producto: 'Hamaca', value: 28.1 },
        { producto: 'Sombrero', value: 11.8 },
        { producto: 'Abarcas', value: 10.3 },
        { producto: 'Chinchorros', value: 3.4 },
        { producto: 'Tazas', value: 3.1 },
    ]
};

const productsStatistics = [
    {
        image: 'https://th.bing.com/th/id/R.cef8b95ca40a814a617d792695962009?rik=pVFQUAiXqABezA&pid=ImgRaw&r=0',
        name: 'Hamaca',
        price: '$100.000',
        amount: 20,
        total: '$2.000.000',
        store: 'Tienda 1',
        municipality: 'Morroa',
    },
    
    {
        image: 'https://tse4.mm.bing.net/th/id/OIP.PxxgtADyHe67I-0T4JxUngHaID?rs=1&pid=ImgDetMain&o=7&rm=3',
        name: 'Mochila',
        price: '$80.000',
        amount: 10,
        total: '$800.000',
        store: 'Tienda 2',
        municipality: 'Sampués',
    },
]

// Los datos ahora vienen del backend a través de props
    
const [show, setShow] = useState("dashboard");
const [isModalOpen, setIsModalOpen] = useState(false);

// Función para renderizar el contenido según la sección seleccionada
const renderContent = () => {
    switch(show) {
        case "dashboard":
            return <DetailsPanel stats={stats} chartData={data} products={productsStatistics} />;
        case "categories":
            return (
                <div className="flex-1 p-8">
                    <ManageForm data={categorias} title="Categorías" />
                </div>
            );
        case "materials":
            return (
                <div className="flex-1 p-8">
                    <ManageForm data={materiales} title="Materiales" />
                </div>
            );
        case "techniques":
            return (
                <div className="flex-1 p-8">
                    <ManageForm data={tecnicas} title="Técnicas" />
                </div>
            );
        default:
            return <DetailsPanel stats={stats} chartData={data} products={productsStatistics} />;
    }
};
    
    return (
        <MenuContext.Provider value={{show, setShow}}>
            <ModalContext.Provider value={{isModalOpen, setIsModalOpen}}>
            <div className='flex'>
                <Head title="Dashboard Admin" />
                <Menu user={user} />
                <div className="flex-1">
                    {/* Mensajes de éxito y error */}
                    {showSuccess && (
                        <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {message}
                        </div>
                    )}
                    {showError && (
                        <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {message}
                        </div>
                    )}
                    {renderContent()}
                </div>
            </div>
            </ModalContext.Provider>
        </MenuContext.Provider>
    );
}
