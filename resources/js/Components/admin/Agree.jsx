import React from 'react';

const Agree = ({onClose, onDelete, item}) => {

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">¿Estás seguro de eliminar este elemento?</h2>
                <p className="text-gray-500">Esta acción no se puede deshacer.</p>
                <div className="flex justify-end mt-4">
                <button onClick={() => {
                    onDelete(item.id);
                }} className="bg-[#3C2F2F] text-white px-4 py-2 rounded-lg mr-2 transform hover:scale-105 transition duration-300 ease-in-out hover:bg-[#4B3A3A]">Eliminar</button>
                <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transform hover:scale-105 transition duration-300 ease-in-out hover:bg-gray-200">Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default Agree;