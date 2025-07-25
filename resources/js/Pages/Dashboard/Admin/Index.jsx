import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import Menu from '@/Components/admin/Menu';
import Dashboard from '@/Components/admin/Dashboard';
import { Head } from '@inertiajs/react';

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
    
    
    return (
       <div className='flex'>
        <Head title="Dashboard Admin" />
        <Menu user={user} />
        <Dashboard stats={stats} chartData={data} products={productsStatistics} />
       </div>
    );
}
