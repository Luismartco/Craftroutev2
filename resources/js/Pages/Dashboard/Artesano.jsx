import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Admin() {
    return (
        <AuthenticatedLayout>
            <h1>Panel de Artesano</h1>
            <p>Bienvenido al panel de Artesano.</p>
        </AuthenticatedLayout>
    );
}