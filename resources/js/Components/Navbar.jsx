import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav>
            {/* Primera parte con el título */}
            <div className="bg-[#3C2F2F] text-white text-center py-4 text-2xl font-bold">
                CraftRoute
            </div>

            {/* Segunda parte con los botones */}
            <div className="bg-[#2B1F1F] flex justify-center py-3">
                {[
                    { name: "Inicio", path: "/" },
                    { name: "Blog", path: "/blog" },
                    { name: "Ingreso", path: "/ingreso" }
                ].map((item, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(item.path)}
                        className="mx-4 text-white px-4 py-2 rounded-md transition-colors duration-300 
                                   hover:bg-[#4B3A3A] active:bg-[#614545]"
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;

