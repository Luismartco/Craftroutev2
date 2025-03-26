import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

const GuestLayout = ({ children }) => {
    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-[#f5f5f5] font-sans">
            <Navbar />
            <main>
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)] p-6">
                <div className="bg-white p-12 rounded-lg shadow-lg w-[480px] flex flex-col items-center">
                    {children}
                </div>
            </div>
            </main>
            <Footer />
        </div>
    );
};

export default GuestLayout;
