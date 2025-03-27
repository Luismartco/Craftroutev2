import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout";


export default function Blog({ auth }) {
    return (
        <GuestLayout auth={auth} fullWidth={true}>
            <Head title="Blog" />
            <h1 className="text-[#2B1F1F] text-center pt-6 text-2xl font-bold pb-8">Blog</h1>
            <h1 className="text-[#2B1F1F] text-center pt-6 text-2xl font-bold pb-8">Te esperamos ;)</h1>           
        </GuestLayout>
    );
}