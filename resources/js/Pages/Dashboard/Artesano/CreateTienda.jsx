import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';

export default function CreateTienda() {
    const [previewImage, setPreviewImage] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        barrio: '',
        direccion: '',
        telefono: '',
        municipio_venta: '',
        latitude: '',
        longitude: '',
        foto_perfil: null,
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
        if (data.foto_perfil) {
            formData.append('foto_perfil', data.foto_perfil);
        }
        post(route('dashboard.artesano.store-tienda'), {
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
                                <h2 className="text-2xl font-bold">Crear Nueva Tienda</h2>
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

                                {/* Botón de envío */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Creando...' : 'Crear Tienda'}
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