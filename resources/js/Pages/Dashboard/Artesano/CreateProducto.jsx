import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import axios from 'axios';

export default function CreateProducto({ categorias }) {
    const [previewImages, setPreviewImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        descripcion: '',
        precio: '',
        cantidad_disponible: '',
        categoria_id: '',
        municipio_venta: '',
        tecnica_artesanal: '',
        materia_prima: '',
        color: '',
        imagenes: [],
    });


 const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formData = new FormData();
        
        // Agregar campos del formulario
        Object.keys(data).forEach(key => {
            if (key !== 'imagenes') {
                formData.append(key, data[key]);
            }
        });
        
        // Agregar imágenes
        previewImages.forEach((image, index) => {
            formData.append(`imagenes[${index}]`, image.file);
        });

        post(route('dashboard.artesano.store-producto'), formData, {
            forceFormData: true,
            onSuccess: () => {
                setIsSubmitting(false);
                // Redirigir al dashboard para ver todos los productos
                window.location.href = route('dashboard.artesano.index');
            },
            onError: (errors) => {
                setIsSubmitting(false);
            }
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
           console.log('Archivos seleccionados:', files); // <-- Añade esto
        if (files.length + previewImages.length > 5) {
            alert('Máximo 5 imágenes permitidas');
            return;
        }

        const newImages = files.map(file => ({
            file: file,
            preview: URL.createObjectURL(file),
            name: file.name
        }));

        setPreviewImages(prev => [...prev, ...newImages]);
        setData('imagenes', [...previewImages, ...newImages].map(img => img.file));
    };

    const removeImage = (index) => {
        setPreviewImages(prev => {
            const newImages = [...prev];
            URL.revokeObjectURL(newImages[index].preview);
            newImages.splice(index, 1);
            setData('imagenes', newImages.map(img => img.file));
            return newImages;
        });
    };


    return (
        <AuthenticatedLayout>
            <Head title="Agregar Producto" />

            {/* Mensaje de éxito local */}
            {/* Removed local success message as it's now handled by Inertia */}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Agregar Nuevo Producto</h2>
                                <Link
                                    href={route('dashboard.artesano.index')}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    Volver al Dashboard
                                </Link>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="nombre" value="Nombre del Producto" />
                                        <TextInput
                                            id="nombre"
                                            name="nombre"
                                            value={data.nombre}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('nombre', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.nombre} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="precio" value="Precio" />
                                        <TextInput
                                            id="precio"
                                            name="precio"
                                            type="number"
                                            value={data.precio}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('precio', e.target.value)}
                                            required
                                            min="0"
                                            step="0.01"
                                        />
                                        <InputError message={errors.precio} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="cantidad_disponible" value="Cantidad Disponible" />
                                        <TextInput
                                            id="cantidad_disponible"
                                            name="cantidad_disponible"
                                            type="number"
                                            value={data.cantidad_disponible}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('cantidad_disponible', e.target.value)}
                                            required
                                            min="0"
                                        />
                                        <InputError message={errors.cantidad_disponible} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="categoria_id" value="Categoría" />
                                        <SelectInput
                                            id="categoria_id"
                                            name="categoria_id"
                                            value={data.categoria_id}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('categoria_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Seleccione una categoría</option>
                                            {categorias.map((categoria) => (
                                                <option key={categoria.id} value={categoria.id}>
                                                    {categoria.nombre}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError message={errors.categoria_id} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="municipio_venta" value="Municipio de Venta" />
                                        <SelectInput
                                            id="municipio_venta"
                                            name="municipio_venta"
                                            value={data.municipio_venta}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('municipio_venta', e.target.value)}
                                            required
                                        >
                                            <option value="">Seleccione un municipio</option>
                                            <option value="morroa">Morroa</option>
                                            <option value="sampues">Sampues</option>
                                        </SelectInput>
                                        <InputError message={errors.municipio_venta} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="tecnica_artesanal" value="Técnica Artesanal" />
                                        <SelectInput
                                            id="tecnica_artesanal"
                                            name="tecnica_artesanal"
                                            value={data.tecnica_artesanal}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('tecnica_artesanal', e.target.value)}
                                            required
                                        >
                                            <option value="">Seleccione una técnica</option>
                                            <option value="telar horizontal">Telar Horizontal</option>
                                            <option value="bordado">Bordado</option>
                                            <option value="cosido">Cosido</option>
                                        </SelectInput>
                                        <InputError message={errors.tecnica_artesanal} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="materia_prima" value="Materia Prima" />
                                        <SelectInput
                                            id="materia_prima"
                                            name="materia_prima"
                                            value={data.materia_prima}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('materia_prima', e.target.value)}
                                            required
                                        >
                                            <option value="">Seleccione una materia prima</option>
                                            <option value="paja">Paja</option>
                                            <option value="algodon">Algodón</option>
                                            <option value="fique">Fique</option>
                                            <option value="ceramica">Cerámica</option>
                                            <option value="hilos">Hilos</option>
                                            <option value="canamos">Cañamos</option>
                                        </SelectInput>
                                        <InputError message={errors.materia_prima} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="color" value="Color" />
                                        <TextInput
                                            id="color"
                                            name="color"
                                            value={data.color}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('color', e.target.value)}
                                            placeholder="Ej: Rojo, Azul, Verde, etc."
                                        />
                                        <InputError message={errors.color} className="mt-2" />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <InputLabel htmlFor="descripcion" value="Descripción" />
                                    <TextArea
                                        id="descripcion"
                                        name="descripcion"
                                        value={data.descripcion}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('descripcion', e.target.value)}
                                        required
                                        rows={4}
                                    />
                                    <InputError message={errors.descripcion} className="mt-2" />
                                </div>

                                <div className="mt-6">
                                    <InputLabel htmlFor="imagenes" value="Imágenes del Producto" />
                                    <InputError message={errors.imagenes} className="mt-2" />
                                    
                                    <div className="mt-2 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="flex justify-center text-sm text-gray-600">
                                                <label
                                                    htmlFor="imagenes"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                >
                                                    <span>Subir imágenes</span>
                                                    <input
                                                        id="imagenes"
                                                        name="imagenes[]"
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        className="sr-only"
                                                        onChange={handleImageChange}
                                                    />
                                                </label>
                                                <p className="pl-1">o arrastrar y soltar</p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                Formatos: PNG, JPG, JPEG, GIF (hasta 10MB cada una)
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Máximo 5 imágenes. {previewImages.length > 0 && `${previewImages.length} seleccionadas`}
                                            </p>
                                        </div>
                                    </div>

                                    {previewImages.length > 0 && (
                                        <div className="mt-4">
                                            <h3 className="text-sm font-medium text-gray-700 mb-2">Vista previa</h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                                {previewImages.map((image, index) => (
                                                    <div key={index} className="relative group">
                                                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                                            <img
                                                                src={image.preview}
                                                                alt={`Vista previa ${index + 1}`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm hover:bg-red-500 hover:text-white transition-colors"
                                                            title="Eliminar imagen"
                                                        >
                                                            <svg className="w-4 h-4 text-red-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-6">
                                    <Link
                                        href={route('dashboard.artesano.index')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-100 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Cancelar
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing || previewImages.length === 0}
                                        className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#4B3A3A] hover:bg-[#2B1F1F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4B3A3A] ${
                                            processing || previewImages.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        {processing ? 'Guardando...' : 'Guardar Producto'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}