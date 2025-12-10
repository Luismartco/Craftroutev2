import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function EditTienda({ tienda, featuredContent }) {
    const isCreating = !tienda;
    const [currentStep, setCurrentStep] = useState(1);
    const [previewImage, setPreviewImage] = useState(tienda?.foto_perfil ? `/storage/${tienda.foto_perfil}` : null);
    const [previewFeaturedImage, setPreviewFeaturedImage] = useState(featuredContent?.featured_product_image ? `/storage/${featuredContent.featured_product_image}` : null);

    const { data, setData, post, processing, errors } = useForm({
        nombre: tienda?.nombre || '',
        barrio: tienda?.barrio || '',
        direccion: tienda?.direccion || '',
        telefono: tienda?.telefono || '',
        municipio_venta: tienda?.municipio_venta || '',
        latitude: tienda?.latitude || '',
        longitude: tienda?.longitude || '',
        foto_perfil: null,
        featured_product_title: featuredContent?.featured_product_title || '',
        featured_product_description: featuredContent?.featured_product_description || '',
        featured_product_image: null,
        video_title: featuredContent?.video_title || '',
        video_description: featuredContent?.video_description || '',
        video_url: featuredContent?.video_url || '',
        _method: isCreating ? 'POST' : 'PUT',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', data.nombre);
        formData.append('barrio', data.barrio);
        formData.append('direccion', data.direccion);
        formData.append('telefono', data.telefono);
        formData.append('municipio_venta', data.municipio_venta);
        formData.append('latitude', data.latitude);
        formData.append('longitude', data.longitude);
        formData.append('featured_product_title', data.featured_product_title);
        formData.append('featured_product_description', data.featured_product_description);
        formData.append('video_title', data.video_title);
        formData.append('video_description', data.video_description);
        formData.append('video_url', data.video_url);
        formData.append('_method', 'PUT');
        if (data.foto_perfil) {
            formData.append('foto_perfil', data.foto_perfil);
        }
        if (data.featured_product_image) {
            formData.append('featured_product_image', data.featured_product_image);
        }
        post(isCreating ? route('dashboard.artesano.store-tienda') : route('dashboard.artesano.update-tienda'), {
            data: formData,
            forceFormData: true,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) { // 10MB
                alert('La imagen no debe superar los 10MB');
                return;
            }
            if (!file.type.startsWith('image/')) {
                alert('Por favor, selecciona un archivo de imagen válido');
                return;
            }
            setData('foto_perfil', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFeaturedImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) { // 10MB
                alert('La imagen no debe superar los 10MB');
                return;
            }
            if (!file.type.startsWith('image/')) {
                alert('Por favor, selecciona un archivo de imagen válido');
                return;
            }
            setData('featured_product_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewFeaturedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setData({
                        ...data,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    alert("Error obteniendo la ubicación: " + error.message);
                }
            );
        } else {
            alert("La geolocalización no es compatible con este navegador.");
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">{isCreating ? 'Crear Tienda' : 'Editar Tienda'}</h2>
                                <Link
                                    href={route('dashboard.artesano.index')}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    {isCreating ? 'Volver al Dashboard' : 'Volver a Gestionar Tienda'}
                                </Link>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Step Indicator */}
                                <div className="mb-8">
                                    <div className="flex items-center justify-center space-x-4">
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                            1
                                        </div>
                                        <div className={`flex-1 h-1 ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                            2
                                        </div>
                                        <div className={`flex-1 h-1 ${currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                            3
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                                        <span>Información Básica</span>
                                        <span>Producto Destacado</span>
                                        <span>Video Demo</span>
                                    </div>
                                </div>

                                {/* Step 1: Basic Information */}
                                {currentStep === 1 && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="nombre" value="Nombre de la Tienda" />
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
                                        <InputLabel htmlFor="barrio" value="Barrio" />
                                        <TextInput
                                            id="barrio"
                                            name="barrio"
                                            value={data.barrio}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('barrio', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.barrio} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="direccion" value="Dirección" />
                                        <TextInput
                                            id="direccion"
                                            name="direccion"
                                            value={data.direccion}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('direccion', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.direccion} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="telefono" value="Teléfono" />
                                        <TextInput
                                            id="telefono"
                                            name="telefono"
                                            value={data.telefono}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('telefono', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.telefono} className="mt-2" />
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
                                        <InputLabel htmlFor="latitude" value="Latitud" />
                                        <TextInput
                                            id="latitude"
                                            name="latitude"
                                            type="number"
                                            step="any"
                                            value={data.latitude}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('latitude', e.target.value)}
                                        />
                                        <InputError message={errors.latitude} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="longitude" value="Longitud" />
                                        <TextInput
                                            id="longitude"
                                            name="longitude"
                                            type="number"
                                            step="any"
                                            value={data.longitude}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('longitude', e.target.value)}
                                        />
                                        <InputError message={errors.longitude} className="mt-2" />
                                    </div>
                                </div>

                                        <div className="mt-6">
                                            <button
                                                type="button"
                                                onClick={getLocation}
                                                className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700"
                                            >
                                                Obtener Ubicación Actual
                                            </button>
                                        </div>

                                        {/* Campo de imagen con vista previa */}
                                        <div className="mt-6 flex flex-col items-center">
                                            <InputLabel htmlFor="foto_perfil" value="Foto de Perfil" />
                                            <div
                                                className="h-32 w-32 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden cursor-pointer flex items-center justify-center relative"
                                                onClick={() => document.getElementById('foto_perfil').click()}
                                            >
                                                {previewImage ? (
                                                    <img
                                                        src={previewImage}
                                                        alt="Vista previa"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
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
                                                )}
                                                <input
                                                    id="foto_perfil"
                                                    name="foto_perfil"
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                                {previewImage && (
                                                    <button
                                                        type="button"
                                                        onClick={e => { e.stopPropagation(); setPreviewImage(null); setData('foto_perfil', null); }}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                    >
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF hasta 10MB</p>
                                            <InputError message={errors.foto_perfil} className="mt-2" />
                                        </div>

                                        {/* Navigation */}
                                        <div className="flex justify-end mt-6">
                                            <PrimaryButton type="button" onClick={nextStep}>
                                                Siguiente
                                            </PrimaryButton>
                                        </div>
                                    </>
                                )}

                                {/* Step 2: Featured Product */}
                                {currentStep === 2 && (
                                    <>
                                        <div className="space-y-6">
                                            <h3 className="text-lg font-semibold text-center">Producto Destacado</h3>

                                            <div>
                                                <InputLabel htmlFor="featured_product_title" value="Título del Producto" />
                                                <TextInput
                                                    id="featured_product_title"
                                                    name="featured_product_title"
                                                    value={data.featured_product_title}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => setData('featured_product_title', e.target.value)}
                                                    placeholder="Ej: Sombrero Vueltiao Tradición Zenú"
                                                />
                                                <InputError message={errors.featured_product_title} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="featured_product_description" value="Descripción del Producto" />
                                                <TextArea
                                                    id="featured_product_description"
                                                    name="featured_product_description"
                                                    value={data.featured_product_description}
                                                    className="mt-1 block w-full"
                                                    rows={4}
                                                    onChange={(e) => setData('featured_product_description', e.target.value)}
                                                    placeholder="Describe tu producto destacado..."
                                                />
                                                <InputError message={errors.featured_product_description} className="mt-2" />
                                            </div>

                                            {/* Campo de imagen del producto destacado */}
                                            <div className="flex flex-col items-center">
                                                <InputLabel htmlFor="featured_product_image" value="Imagen del Producto Destacado" />
                                                <div
                                                    className="h-48 w-48 rounded-lg bg-white border-4 border-white shadow-lg overflow-hidden cursor-pointer flex items-center justify-center relative"
                                                    onClick={() => document.getElementById('featured_product_image').click()}
                                                >
                                                    {previewFeaturedImage ? (
                                                        <img
                                                            src={previewFeaturedImage}
                                                            alt="Vista previa producto"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
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
                                                    )}
                                                    <input
                                                        id="featured_product_image"
                                                        name="featured_product_image"
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleFeaturedImageChange}
                                                    />
                                                    {previewFeaturedImage && (
                                                        <button
                                                            type="button"
                                                            onClick={e => { e.stopPropagation(); setPreviewFeaturedImage(null); setData('featured_product_image', null); }}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                        >
                                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF hasta 10MB</p>
                                                <InputError message={errors.featured_product_image} className="mt-2" />
                                            </div>
                                        </div>

                                        {/* Navigation */}
                                        <div className="flex justify-between mt-6">
                                            <SecondaryButton type="button" onClick={prevStep}>
                                                Anterior
                                            </SecondaryButton>
                                            <PrimaryButton type="button" onClick={nextStep}>
                                                Siguiente
                                            </PrimaryButton>
                                        </div>
                                    </>
                                )}

                                {/* Step 3: Video Demo */}
                                {currentStep === 3 && (
                                    <>
                                        <div className="space-y-6">
                                            <h3 className="text-lg font-semibold text-center">Video Demo</h3>

                                            <div>
                                                <InputLabel htmlFor="video_title" value="Título del Video" />
                                                <TextInput
                                                    id="video_title"
                                                    name="video_title"
                                                    value={data.video_title}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => setData('video_title', e.target.value)}
                                                    placeholder="Ej: Sombrero Vueltiao Tradición Zenú"
                                                />
                                                <InputError message={errors.video_title} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="video_description" value="Descripción del Video" />
                                                <TextArea
                                                    id="video_description"
                                                    name="video_description"
                                                    value={data.video_description}
                                                    className="mt-1 block w-full"
                                                    rows={3}
                                                    onChange={(e) => setData('video_description', e.target.value)}
                                                    placeholder="Describe brevemente el contenido del video..."
                                                />
                                                <InputError message={errors.video_description} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="video_url" value="URL del Video (YouTube)" />
                                                <TextInput
                                                    id="video_url"
                                                    name="video_url"
                                                    type="url"
                                                    value={data.video_url}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => setData('video_url', e.target.value)}
                                                    placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Ingresa la URL completa del video de YouTube</p>
                                                <InputError message={errors.video_url} className="mt-2" />
                                            </div>
                                        </div>

                                        {/* Navigation */}
                                        <div className="flex justify-between mt-6">
                                            <SecondaryButton type="button" onClick={prevStep}>
                                                Anterior
                                            </SecondaryButton>
                                            <PrimaryButton type="submit" disabled={processing}>
                                                {processing ? 'Guardando...' : 'Guardar Cambios'}
                                            </PrimaryButton>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 