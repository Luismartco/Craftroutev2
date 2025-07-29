import React, { useState } from 'react';

export default function Accordion({ title, children, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-gray-200 rounded-md bg-gradient-to-r from-white to-gray-50 shadow-sm">
            <button
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-sm font-bold text-gray-800">{title}</span>
                <svg
                    className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            
            {isOpen && (
                <div className="px-4 pb-4">
                    {children}
                </div>
            )}
        </div>
    );
} 