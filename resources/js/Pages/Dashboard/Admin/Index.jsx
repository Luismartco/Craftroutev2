import React, {useState, useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import Menu from '@/Components/admin/Menu';
import DetailsPanel from '@/Components/admin/DetailsPanel';
import ManageForm from '@/Components/admin/ManageForm';
import UserManagement from '@/Components/admin/UserManagement';
import { Head } from '@inertiajs/react';
import { MenuContext } from '@/Components/admin/MenuContext';
import { ModalContext } from '@/Components/admin/ModalContext';

export default function Index({ stats, categorias, municipios, artesanos, productos, productosPagination, materiales, tecnicas, users, flash, chartData }) {

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

// Los datos ahora vienen del backend a través de props
    
const [show, setShow] = useState("dashboard");
const [isModalOpen, setIsModalOpen] = useState(false);

// Función para renderizar el contenido según la sección seleccionada
const renderContent = () => {
    switch(show) {
        case "dashboard":
            return <DetailsPanel 
                stats={stats} 
                chartData={chartData} 
                products={productos} 
                productosPagination={productosPagination}
                categorias={categorias}
                municipios={municipios}
                artesanos={artesanos}
            />;
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
        case "users":
            return (
                <div className="flex-1 p-8">
                    <UserManagement users={users} title="Gestión de Usuarios" />
                </div>
            );
        default:
            return <DetailsPanel 
                stats={stats} 
                chartData={chartData} 
                products={productos} 
                productosPagination={productosPagination}
                categorias={categorias}
                municipios={municipios}
                artesanos={artesanos}
            />;
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
