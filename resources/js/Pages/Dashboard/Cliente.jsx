import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Admin() {
    return (
        <AuthenticatedLayout>
            <h1>Panel de Cliente</h1>
            <p>Bienvenido al panel de Cliente.</p>
        </AuthenticatedLayout>
    );
}