import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Blog() {
    return (
        <GuestLayout>
            <Head title="Blog" />
            <div className=" text-black text-center py-4 text-2xl font-bold">
                <h1>Blog</h1>
            </div>
        </GuestLayout>
    );
}
