import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const GuestLayout = ({ children, auth, fullWidth = false }) => {
    return (
        <div className="min-h-screen flex flex-col bg-[#f5f5f5] font-sans">
            <Navbar auth={auth} />
            <main>
                {fullWidth ? children : (
                    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] p-6">
                        <div className="bg-white p-12 rounded-lg shadow-lg w-[640px] flex flex-col items-center">
                            {children}
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default GuestLayout;
