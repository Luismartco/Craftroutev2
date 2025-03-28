import React from 'react';
import { Link } from '@inertiajs/react';

const Navbar = ({ auth = {} }) => {
    return (
        <nav>
            {/* Primera parte con el título */}
            <div className="bg-[#3C2F2F] text-white text-center py-4 text-2xl font-bold">
                CraftRoute
            </div>

            {/* Segunda parte con los botones */}
            <div className="bg-[#2B1F1F] flex justify-center py-3">
                <Link
                    href="/"
                    className="mx-4 text-white px-4 py-2 rounded-md transition-colors duration-300 
                            hover:bg-[#4B3A3A] active:bg-[#614545]"
                >
                    Inicio
                </Link>
                <Link
                    href="/blog"
                    className="mx-4 text-white px-4 py-2 rounded-md transition-colors duration-300 
                            hover:bg-[#4B3A3A] active:bg-[#614545]"
                >
                    Blog
                </Link>

                {/* Validación para evitar errores si auth es undefined */}
                {auth.user ? (
                    <Link
                        href={route('dashboard')}
                        className="mx-4 text-white px-4 py-2 rounded-md transition-colors duration-300 
                            hover:bg-[#4B3A3A] active:bg-[#614545]"
                    >
                        Mi perfil
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="mx-4 text-white px-4 py-2 rounded-md transition-colors duration-300 
                            hover:bg-[#4B3A3A] active:bg-[#614545]"
                        >
                            Iniciar sesión
                        </Link>
                        <Link
                            href={route('register')}
                            className="mx-4 text-white px-4 py-2 rounded-md transition-colors duration-300 
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