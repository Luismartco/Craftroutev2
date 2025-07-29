import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import Menu from '@/Components/admin/Menu';
import DetailsPanel from '@/Components/admin/DetailsPanel';
import { Head } from '@inertiajs/react';
import { MenuContext } from '@/Components/admin/MenuContext';
import { ModalContext } from '@/Components/admin/ModalContext';

export default function Index({ stats}) {

    

    const { auth } = usePage().props;
    const user = auth.user;

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

const categories = [
    {id: 1, name: "Categoría 1", description: "Descripción de la categoría 1"},
    {id: 2, name: "Categoría 2", description: "Descripción de la categoría 2"},
    {id: 3, name: "Categoría 3", description: "Descripción de la categoría 3"},
    {id: 4, name: "Categoría 4", description: "Descripción de la categoría 4"},
    {id: 5, name: "Categoría 5", description: "Descripción de la categoría 5"},
]

const Materials = [
    {id: 1, name: "Material 1", description: "Descripción del material 1"},
    {id: 2, name: "Material 2", description: "Descripción del material 2"},
    {id: 3, name: "Material 3", description: "Descripción del material 3"},
    {id: 4, name: "Material 4", description: "Descripción del material 4"},
    {id: 5, name: "Material 5", description: "Descripción del material 5"},
]

const Techniques = [
    {id: 1, name: "Técnica 1", description: "Descripción de la técnica 1"},
    {id: 2, name: "Técnica 2", description: "Descripción de la técnica 2"},
    {id: 3, name: "Técnica 3", description: "Descripción de la técnica 3"},
    {id: 4, name: "Técnica 4", description: "Descripción de la técnica 4"},
    {id: 5, name: "Técnica 5", description: "Descripción de la técnica 5"},
]
    
const [show, setShow] = useState("dashboard");
const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (

        <MenuContext.Provider value={{show, setShow}}>
            <ModalContext.Provider value={{isModalOpen, setIsModalOpen}}>
            <div className='flex'>
                <Head title="Dashboard Admin" />
                <Menu user={user} />
                <DetailsPanel stats={stats} chartData={data} products={productsStatistics} categories={categories} Materials={Materials} Techniques={Techniques} />
            </div>
            </ModalContext.Provider>
        </MenuContext.Provider>
    );
}
