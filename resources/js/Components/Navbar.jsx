import React from 'react';
import { Link } from '@inertiajs/react';
import logo_white from '../../media/logo/logo_white.png';

const Navbar = ({ auth = {} }) => {
    return (
        <nav>
            {/* Primera parte con el título */}
            
            <div className="bg-[#3C2F2F] text-white text-center py-4 text-2xl font-bold">
                <img 
                    src={logo_white} 
                    alt="CraftRoute Logo" 
                    className="mx-auto w-12 h-12 mb-2" // puedes ajustar w/h para el tamaño
                />
                <div className="flex items-center justify-center w-full">
                    <div className="flex-grow h-[2px] bg-white mx-4" />
                    <span className="px-2">CraftRoute</span>
                    <div className="flex-grow h-[2px] bg-white mx-4" />
                </div>
            </div>

            {/* Segunda parte con los botones */}
            <div className="bg-[#2B1F1F] flex justify-center py-3">
                <Link
                    href="/"
                    className="mx-4 text-white px-4 py-2 no-underline rounded-md transition-colors duration-300 
                            hover:bg-[#4B3A3A] active:bg-[#614545]"
                >
                    Inicio
                </Link>
                <Link
                    href="/blog"
                    className="mx-4 text-white px-4 py-2 no-underline rounded-md transition-colors duration-300 
                            hover:bg-[#4B3A3A] active:bg-[#614545]"
                >
                    Blog
                </Link>

                {/* Validación para evitar errores si auth es undefined */}
                {auth.user ? (
                    <Link
                        href={route('dashboard')}
                        className="mx-4 text-white px-4 py-2 no-underline rounded-md transition-colors duration-300 
                            hover:bg-[#4B3A3A] active:bg-[#614545]"
                    >
                        Mi perfil
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="mx-4 text-white px-4 py-2 no-underline rounded-md transition-colors duration-300 
                            hover:bg-[#4B3A3A] active:bg-[#614545]"
                        >
                            Iniciar sesión
                        </Link>
                        <Link
                            href={route('register')}
                            className="mx-4 text-white px-4 py-2 no-underline rounded-md transition-colors duration-300 
                            hover:bg-[#4B3A3A] active:bg-[#614545]"
                        >
                            Registrarse
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;