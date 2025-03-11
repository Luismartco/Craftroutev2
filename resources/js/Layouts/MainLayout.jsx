import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-[#f5f5f5] font-sans">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
