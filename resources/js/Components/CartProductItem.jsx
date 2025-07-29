import React from 'react';

export default function CartProductItem({ product, onQuantityChange, onRemove }) {
    return (
        <div className="flex items-center border border-gray-200 rounded-md p-3 shadow-sm bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-all duration-300">
            <div className="flex-1">
                <div className="font-bold text-sm mb-2 text-gray-800">{product.nombre}</div>
                <div className="flex items-center">
                    {product.imagen && (
                        <img
                            src={product.imagen}
                            alt={product.nombre}
                            className="w-16 h-16 object-contain rounded-md mr-4 shadow-sm"
                        />
                    )}
                    <div className="flex flex-1 flex-col lg:flex-row lg:items-center lg:justify-between w-full">
                        {/* Controles de cantidad y eliminar */}
                        <div className="flex items-center space-x-2 mb-2 lg:mb-0">
                            <button
                                onClick={() => onQuantityChange(product.id, -1)}
                                className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 flex items-center justify-center text-sm font-bold shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                –
                            </button>
                            <span className="text-sm font-bold w-8 text-center bg-white px-1 py-0.5 rounded shadow-sm">
                                {product.cantidad}
                            </span>
                            <button
                                onClick={() => onQuantityChange(product.id, 1)}
                                className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 flex items-center justify-center text-sm font-bold shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                +
                            </button>
                            <button
                                onClick={() => onRemove(product.id)}
                                className="ml-4 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-all duration-200"
                                title="Eliminar producto"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {/* Precio y subtotal */}
                        <div className="flex flex-col items-end ml-auto bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-md border border-blue-100">
                            <div className="text-gray-600 text-xs mb-1">
                                Precio: ${product.precio.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 