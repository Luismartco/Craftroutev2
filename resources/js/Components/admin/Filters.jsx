import React from 'react';

const Filters = ({label, options, value, onChange}) => {
    return (
        <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-semibold text-gray-700">{label}</label>
            <select 
                className="border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-[#4B3A3A]"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Todos los {label.toLowerCase()}s</option>
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

export default Filters;