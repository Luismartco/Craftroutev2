import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cart, setCart] = useState([]);

    // Cargar carrito desde localStorage al montar el componente
    useEffect(() => {
        const savedCart = localStorage.getItem('cart_data');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error('Error al cargar el carrito:', error);
            }
        }
    }, []);

    // Escuchar cambios en localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            const savedCart = localStorage.getItem('cart_data');
            if (savedCart) {
                try {
                    setCart(JSON.parse(savedCart));
                } catch (error) {
                    console.error('Error al cargar el carrito:', error);
                }
            } else {
                setCart([]);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const addToCart = (producto) => {
        setShowCart(true);
        setCart((prev) => {
            const found = prev.find((p) => p.id === producto.id);
            let newCart;
            if (found) {
                newCart = prev.map((p) =>
                    p.id === producto.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                // Procesar las imágenes correctamente antes de agregar al carrito
                const productoConImagenes = {
                    ...producto,
                    quantity: 1,
                    imagenes: producto.imagenes ? producto.imagenes.map(img => {
                        if (typeof img === 'string') {
                            return img;
                        }
                        return img.ruta_imagen ? `/storage/${img.ruta_imagen}` : img;
                    }) : []
                };
                newCart = [...prev, productoConImagenes];
            }
            
            // Actualizar localStorage
            localStorage.setItem('cart_data', JSON.stringify(newCart));
            return newCart;
        });
    };

    const changeQuantity = (id, delta) => {
        setCart((prev) => {
            const newCart = prev
                .map((p) =>
                    p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p
                )
                .filter((p) => p.quantity > 0);
            
            // Actualizar localStorage
            localStorage.setItem('cart_data', JSON.stringify(newCart));
            return newCart;
        });
    };

    const removeProduct = (id) => {
        setCart((prev) => {
            const newCart = prev.filter((p) => p.id !== id);
            localStorage.setItem('cart_data', JSON.stringify(newCart));
            return newCart;
        });
    };

    const total = cart.reduce((sum, p) => sum + p.precio * p.quantity, 0);
    const cartItemCount = cart.reduce((sum, p) => sum + p.quantity, 0);

    const CartModal = () =>
        showCart ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
                    <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                        onClick={() => setShowCart(false)}
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                    <h2 className="text-2xl font-bold mb-6 text-center">Carrito de compras</h2>
                    <div className="space-y-6 max-h-[50vh] overflow-y-auto">
                        {cart.length === 0 && (
                            <div className="text-center text-gray-500">No hay productos en el carrito.</div>
                        )}
                        {cart.map((p) => (
                            <div
                                key={p.id}
                                className="flex items-center border rounded-lg p-4 shadow-sm bg-gray-50"
                            >
                                <div className="flex-1">
                                    <div className="font-semibold text-lg mb-2">{p.nombre}</div>
                                    <div className="flex items-center">
                                        <img
                                            src={p.imagenes && p.imagenes.length > 0 ? p.imagenes[0] : ''}
                                            alt={p.nombre}
                                            className="w-20 h-20 object-contain rounded mr-4"
                                        />
                                        <div className="flex flex-1 flex-col md:flex-row md:items-center md:justify-between w-full">
                                            {/* Controles de cantidad y eliminar */}
                                            <div className="flex items-center space-x-2 mb-2 md:mb-0">
                                                <button
                                                    onClick={() => changeQuantity(p.id, -1)}
                                                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                                                >
                                                    –
                                                </button>
                                                <span className="text-xl font-medium w-8 text-center">
                                                    {p.quantity}
                                                </span>
                                                <button
                                                    onClick={() => changeQuantity(p.id, 1)}
                                                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => removeProduct(p.id)}
                                                    className="ml-4 text-red-500 hover:text-red-700"
                                                    title="Eliminar producto"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            {/* Precio y subtotal alineados a la derecha */}
                                            <br />
                                            <div className="flex flex-col items-end ml-auto">
                                                <div className="text-gray-600 text-sm">
                                                    Precio: ${p.precio.toLocaleString()}
                                                </div>
                                                <div className="text-gray-900 font-semibold">
                                                    Subtotal: ${(p.precio * p.quantity).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Total y checkout */}
                    <div className="mt-8 border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xl font-medium text-gray-900">Total:</span>
                            <span className="text-2xl font-bold text-gray-900">
                                ${total.toLocaleString()}
                            </span>
                        </div>
                        <button
                            className="w-full bg-[#4B3A3A] text-white py-3 rounded-lg hover:bg-[#2B1F1F] transition-colors text-lg font-semibold"
                            onClick={() => {
                                // Redirigir al checkout
                                window.location.href = '/checkout';
                            }}
                        >
                            Ir al checkout
                        </button>
                    </div>
                </div>
            </div>
        ) : null;

    const value = {
        cart,
        addToCart,
        changeQuantity,
        removeProduct,
        total,
        cartItemCount,
        showCart,
        setShowCart,
        CartModal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
            <CartModal />
        </CartContext.Provider>
    );
}; 