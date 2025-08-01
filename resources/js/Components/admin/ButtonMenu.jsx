import React from 'react';
import { Link } from '@inertiajs/react';

const ButtonMenu = ({text, onClick}) => {
    return (
        <button onClick={onClick} className="min-w-40 no-underline font-extrabold text-lg inline-flex items-center justify-center p-2 bg-[#584c4c] text-white rounded-md hover:bg-[#4B3A3A] transition-colors duration-200">
            {text}
        </button>
    );
} 

export default ButtonMenu;