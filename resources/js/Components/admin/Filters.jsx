import React from 'react';

const Filters = ({label, options}) => {
    return (
        <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-semibold text-gray-700">{label}</label>
            <select className="border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-[#4B3A3A]">
                <option value="">{label}</option>
                {options.map((option) => (
                    <option value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

export default Filters;