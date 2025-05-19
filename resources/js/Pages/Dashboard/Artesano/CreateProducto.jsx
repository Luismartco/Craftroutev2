import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';

export default function CreateProducto() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        descripcion: '',
        precio: '',
        cantidad_disponible: '',
        categoria: '',
        municipio_venta: '',
        tecnica_artesanal: '',
        materia_prima: '',
    });

    const [previewImages, setPreviewImages] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('dashboard.artesano.store-producto'));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = previewImages.length + files.length;
        
        if (totalImages > 5) {
            alert('Solo puedes tener un máximo de 5 imágenes');
            return;
        }

        const newPreviewImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setPreviewImages(prev => [...prev, ...newPreviewImages]);
    };

    const removeImage = (index) => {
        setPreviewImages(prev => {
            const newImages = [...prev];
            URL.revokeObjectURL(newImages[index].preview);
            newImages.splice(index, 1);
            return newImages;
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Agregar Producto" />

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
                                        />
                                        <InputError message={errors.cantidad_disponible} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="categoria" value="Categoría" />
                                        <SelectInput
                                            id="categoria"
                                            name="categoria"
                                            value={data.categoria}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('categoria', e.target.value)}
                                            required
                                        >
                                            <option value="">Seleccione una categoría</option>
                                            <option value="tejido">Tejido</option>
                                            <option value="madera">Madera</option>
                                            <option value="ceramica">Cerámica</option>
                                            <option value="joyeria">Joyería</option>
                                        </SelectInput>
                                        <InputError message={errors.categoria} className="mt-2" />
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
                                            <option value="telar_horizontal">Telar Horizontal</option>
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
                                    />
                                    <InputError message={errors.descripcion} className="mt-2" />
                                </div>

                                {/* Campo de múltiples imágenes */}
                                <div className="mt-6">
                                    <InputLabel htmlFor="imagenes" value="Imágenes del Producto" />
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="imagenes"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                >
                                                    <span>Agregar imágenes</span>
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
                                                PNG, JPG, GIF hasta 10MB (máximo 5 imágenes)
                                                {previewImages.length > 0 && (
                                                    <span className="block mt-1">
                                                        {previewImages.length} imagen(es) seleccionada(s)
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Vista previa de imágenes */}
                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                        {previewImages.map((image, index) => (
                                            <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                                                <img
                                                    src={image.preview}
                                                    alt={`Vista previa ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1.5 shadow-md hover:bg-red-500 hover:text-white transition-all duration-200"
                                                    title="Eliminar imagen"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                        {previewImages.length < 5 && (
                                            <div className="relative aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                                <span className="text-gray-400">+</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Botón de envío */}
                                <div className="flex justify-between">
                                    <Link
                                        href={route('dashboard.artesano.index')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700"
                                    >
                                        Volver al Perfil
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Creando...' : 'Crear Producto'}
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