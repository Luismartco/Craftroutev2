import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Admin() {
    return (
        <AuthenticatedLayout>
            <h1>Panel de Administrador</h1>
            <p>Bienvenido al panel de administración.</p>
        </AuthenticatedLayout>
    );
}
