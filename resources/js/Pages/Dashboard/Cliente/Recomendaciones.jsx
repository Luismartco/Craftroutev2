import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';

// Importar las imágenes
import imagen1 from '../../../../media/recomendaciones/1.jpg';
import imagen2 from '../../../../media/recomendaciones/2.jpg';
import imagen3 from '../../../../media/recomendaciones/3.jpg';
import imagen4 from '../../../../media/recomendaciones/4.jpg';
import imagen5 from '../../../../media/recomendaciones/5.jpg';
import imagen6 from '../../../../media/recomendaciones/6.jpg';
import imagen7 from '../../../../media/recomendaciones/7.jpg';
import imagen8 from '../../../../media/recomendaciones/8.jpg';
import imagen9 from '../../../../media/recomendaciones/9.jpg';

const Recomendaciones = () => {
    const [selectedImages, setSelectedImages] = useState([]);

    const toggleSelection = (imageId) => {
        if (selectedImages.includes(imageId)) {
            // Si la imagen ya está seleccionada, la quitamos
            setSelectedImages(selectedImages.filter(id => id !== imageId));
        } else {
            if (selectedImages.length < 3) {
                // Si hay menos de 3 seleccionadas, agregamos la nueva
                setSelectedImages([...selectedImages, imageId]);
            } else {
                // Si ya hay 3 seleccionadas, quitamos la primera y agregamos la nueva
                setSelectedImages([...selectedImages.slice(1), imageId]);
            }
        }
    };

    const handleSubmit = () => {
        router.post(route('preferences.store'), {
            selected_preferences: selectedImages
        });
    };

    const images = [
        { id: 1, src: imagen1 },
        { id: 2, src: imagen2 },
        { id: 3, src: imagen3 },
        { id: 4, src: imagen4 },
        { id: 5, src: imagen5 },
        { id: 6, src: imagen6 },
        { id: 7, src: imagen7 },
        { id: 8, src: imagen8 },
        { id: 9, src: imagen9 }
    ];

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">Selecciona hasta 3 imágenes</h2>

                            <div className="grid grid-cols-3 gap-4">
                                {images.map((image) => (
                                    <div
                                        key={image.id}
                                        className={`relative cursor-pointer transition-all duration-300 transform ${
                                            selectedImages.includes(image.id) 
                                                ? 'ring-4 ring-indigo-500 scale-105' 
                                                : 'hover:scale-102'
                                        }`}
                                        onClick={() => toggleSelection(image.id)}
                                    >
                                        <img
                                            src={image.src}
                                            alt={`Imagen ${image.id}`}
                                            className="w-full h-48 object-cover rounded-lg transition-all duration-300"
                                        />
                                        {selectedImages.includes(image.id) && (
                                            <div className="absolute top-2 right-2 bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                                                {selectedImages.indexOf(image.id) + 1}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={handleSubmit}
                                    disabled={selectedImages.length !== 3}
                                    className={`inline-flex items-center px-4 py-2 rounded-md transition-colors duration-300 ${
                                        selectedImages.length === 3
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Recomendaciones; 