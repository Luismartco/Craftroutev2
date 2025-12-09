import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import Footer from '../Components/Footer';  // Assuming you'll use the Footer you mentioned
import logo_white from '../../media/logo/logo_white.png';
import { useCart } from '../Contexts/CartContext';


export default function AuthenticatedLayout({ header, children }) {
    const { cartItemCount, setShowCart } = useCart();
    const { auth } = usePage().props;
    const user = auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-[#f5f5f5] font-sans">
            <nav>
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
                
                <div className="bg-[#2B1F1F] flex justify-center py-3 items-center">
                    <Link
                        href="/"
                        className="mx-4 text-white px-4 py-2 no-underline rounded-md transition-colors duration-300
                                hover:bg-[#4B3A3A] active:bg-[#614545]"
                    >
                        Inicio
                    </Link>
                    {user && user.role === 'customer' && (
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
                        )}


                    {/* Mobile menu button */}
                    <div className="sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="text-white px-2 py-1 rounded"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* User dropdown */}
                    <div className="relative hidden sm:block">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 text-white rounded-md transition-colors duration-300
                                        hover:bg-[#4B3A3A] active:bg-[#614545]"
                                    >
                                        {user.name}
                                        <svg
                                            className="-me-0.5 ms-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Perfil
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    preserveScroll
                                >
                                    Salir
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>

                {/* Mobile dropdown menu */}
                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden bg-[#2B1F1F]'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <Link
                            href={route('dashboard')}
                            className="block text-white px-4 py-2 hover:bg-[#4B3A3A]"
                        >
                            Dashboard
                        </Link>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-300">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <Link
                                href={route('profile.edit')}
                                className="block text-white px-4 py-2 hover:bg-[#4B3A3A]"
                            >
                                Perfil
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                preserveScroll
                                className="block text-white px-4 py-2 hover:bg-[#4B3A3A] text-left w-full"
                            >
                                Salir
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                {children}
            </main>

            <Footer />
        </div>
    );
}