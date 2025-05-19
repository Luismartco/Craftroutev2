import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';

export default function EditTienda({ tienda }) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: tienda.nombre,
        barrio: tienda.barrio,
        direccion: tienda.direccion,
        telefono: tienda.telefono,
        municipio_venta: tienda.municipio_venta,
        latitude: tienda.latitude,
        longitude: tienda.longitude,
        foto_perfil: null,
        _method: 'PUT',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('dashboard.artesano.update-tienda'));
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
                                <h2 className="text-2xl font-bold">Editar Tienda</h2>
                                <Link
                                    href={route('dashboard.artesano.gestionar-tienda')}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    Volver a Gestionar Tienda
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

                                {/* Campo de imagen (sin funcionalidad) */}
                                <div className="mt-6">
                                    <InputLabel htmlFor="foto_perfil" value="Foto de Perfil" />
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            {tienda.foto_perfil && (
                                                <div className="mb-4">
                                                    <img
                                                        src={`/storage/${tienda.foto_perfil}`}
                                                        alt="Foto actual"
                                                        className="mx-auto h-32 w-32 object-cover rounded-full"
                                                    />
                                                </div>
                                            )}
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
                                                    htmlFor="foto_perfil"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                >
                                                    <span>Cambiar foto</span>
                                                    <input
                                                        id="foto_perfil"
                                                        name="foto_perfil"
                                                        type="file"
                                                        className="sr-only"
                                                        disabled
                                                    />
                                                </label>
                                                <p className="pl-1">o arrastrar y soltar</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Botón de envío */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Actualizando...' : 'Actualizar Tienda'}
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