import React from 'react';
import { Link } from '@inertiajs/react';
import { useCart } from '../Contexts/CartContext';
import logo_white from '../../media/logo/logo_white.png';

const Navbar = ({ auth = {} }) => {
    const { cartItemCount, setShowCart } = useCart();

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
            <div className="bg-[#2B1F1F] flex justify-center text-center py-3 flex-wrap items-center">
                <Link
                    href="/"
                    className="mx-4 text-white p-2 no-underline rounded-md transition-colors duration-300 
                            hover:bg-[#4B3A3A] active:bg-[#614545]"
                >
                    Inicio
                </Link>
                <Link
                    href="/blog"
                    className="mx-4 text-white p-2 no-underline rounded-md transition-colors duration-300 
                            hover:bg-[#4B3A3A] active:bg-[#614545]"
                >
                    Blog
                </Link>

                {/* Icono del carrito */}
                <button
                    onClick={() => setShowCart(true)}
                    className="mx-4 text-white p-3 no-underline rounded-md transition-colors duration-300 
                            hover:bg-[#4B3A3A] active:bg-[#614545] relative"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </button>

                {/* Validación para evitar errores si auth es undefined */}
                {auth.user ? (
                    <Link
                        href={route('dashboard')}
                        className="mx-4 text-white p-2 no-underline rounded-md transition-colors duration-300 
                            hover:bg-[#4B3A3A] active:bg-[#614545]"
                    >
                        Mi perfil
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="mx-4 text-white p-2 no-underline rounded-md transition-colors duration-300 
                            hover:bg-[#4B3A3A] active:bg-[#614545]"
                        >
                            Iniciar sesión
                        </Link>
                        <Link
                            href={route('register')}
                            className="mx-4 text-white p-2 no-underline rounded-md transition-colors duration-300 
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