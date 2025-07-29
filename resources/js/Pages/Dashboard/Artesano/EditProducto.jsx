import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';

export default function EditProducto({ producto }) {
    // Función para construir la URL correcta de la imagen
    const getImageUrl = (imagePath) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('storage/')) {
            return `/${imagePath}`;
        }
        if (imagePath.startsWith('productos/')) {
            return `/storage/${imagePath}`;
        }
        return `/storage/${imagePath}`;
    };

    // Función para manejar errores de carga de imágenes
    const handleImageError = (e) => {
        console.error('Error al cargar imagen:', e.target.src);
        e.target.onerror = null;
        e.target.style.display = 'none';
    };

    // Log para debug cuando el componente se monta
    useEffect(() => {
        console.log('Producto:', producto);
        console.log('Imágenes:', producto?.imagenes);
    }, [producto]);

    // Inicialización segura de datos con valores por defecto
    const initialData = {
        nombre: producto?.nombre || '',
        descripcion: producto?.descripcion || '',
        precio: producto?.precio?.toString() || '0',
        cantidad_disponible: producto?.cantidad_disponible?.toString() || '0',
        categoria: producto?.categoria || 'tejido',
        municipio_venta: producto?.municipio_venta || 'morroa',
        tecnica_artesanal: producto?.tecnica_artesanal || 'telar horizontal',
        materia_prima: producto?.materia_prima || 'paja',
        color: producto?.color || '',
        imagenes_eliminadas: [],
        imagen_principal: producto?.imagenes?.find(img => img.es_principal)?.id || null,
        nuevas_imagenes: []
    };

    const { data, setData, post, processing, errors, reset } = useForm(initialData);

    const [previewImages, setPreviewImages] = useState([]);
    const [existingImages, setExistingImages] = useState(producto?.imagenes || []);
    const [imgIndex, setImgIndex] = useState(0);
    const visibleImages = existingImages.filter(img => !data.imagenes_eliminadas.includes(img.id));

    // Limpiar las URLs de vista previa al desmontar
    useEffect(() => {
        return () => {
            previewImages.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, [previewImages]);

    // Resetear formulario cuando cambia el producto
    useEffect(() => {
        reset(initialData);
        setExistingImages(producto?.imagenes || []);
        setPreviewImages([]);
    }, [producto]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Iniciando envío del formulario de edición...');

        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key !== 'nuevas_imagenes') {
                formData.append(key, data[key]);
            }
        });
        data.nuevas_imagenes.forEach(file => {
            formData.append('nuevas_imagenes[]', file);
        });
        formData.append('_method', 'PUT'); // Importante para Laravel

        console.log('Enviando formulario de edición a:', route('dashboard.artesano.update-producto', producto.id));

        post(route('dashboard.artesano.update-producto', producto.id), {
            data: formData,
            onSuccess: (page) => {
                console.log('Producto editado exitosamente, redirigiendo...');
                console.log('Página de respuesta:', page);
                // Usar router.visit para navegación SPA sin recarga completa
                router.visit(route('dashboard.artesano.index') + '?success=updated');
            },
            preserveScroll: true,
            forceFormData: true,
            onError: (errors) => {
                console.log('Errores del servidor:', errors);
            }
        });
    };

    const handleNewImages = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = existingImages.length - data.imagenes_eliminadas.length + previewImages.length + files.length;

        if (totalImages > 5) {
            alert('Solo puedes tener un máximo de 5 imágenes');
            return;
        }

        const newPreviewImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setPreviewImages(prev => [...prev, ...newPreviewImages]);
        setData('nuevas_imagenes', [...data.nuevas_imagenes, ...files]);
    };

    const removeNewImage = (index) => {
        const newImages = [...data.nuevas_imagenes];
        const newPreviews = [...previewImages];

        URL.revokeObjectURL(newPreviews[index].preview);
        newImages.splice(index, 1);
        newPreviews.splice(index, 1);

        setData('nuevas_imagenes', newImages);
        setPreviewImages(newPreviews);
    };

    const removeExistingImage = (imageId) => {
        setData('imagenes_eliminadas', [...data.imagenes_eliminadas, imageId]);

        if (data.imagen_principal === imageId) {
            setData('imagen_principal', null);
        }
    };

    const restoreExistingImage = (imageId) => {
        setData('imagenes_eliminadas', data.imagenes_eliminadas.filter(id => id !== imageId));
    };

    const setMainImage = (imageId) => {
        setData('imagen_principal', imageId);
    };

    const handlePrevImg = () => {
        setImgIndex(idx => (idx > 0 ? idx - 1 : visibleImages.length - 1));
    };
    const handleNextImg = () => {
        setImgIndex(idx => (idx < visibleImages.length - 1 ? idx + 1 : 0));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Editar Producto" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Mensaje de éxito */}
                    {/* El estado showSuccessMessage y el componente de mensaje de éxito se eliminaron */}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Editar Producto: {producto.nombre}</h2>
                                <Link
                                    href={route('dashboard.artesano.gestionar-tienda')}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    Volver a Gestionar Tienda
                                </Link>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Campos del formulario */}
                                    <div>
                                        <InputLabel htmlFor="nombre" value="Nombre del Producto *" />
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
                                        <InputLabel htmlFor="precio" value="Precio *" />
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
                                        <InputLabel htmlFor="cantidad_disponible" value="Cantidad Disponible *" />
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
                                        <InputLabel htmlFor="categoria" value="Categoría *" />
                                        <SelectInput
                                            id="categoria"
                                            name="categoria"
                                            value={data.categoria}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('categoria', e.target.value)}
                                            required
                                        >
                                            <option value="tejido">Tejido</option>
                                            <option value="madera">Madera</option>
                                            <option value="ceramica">Cerámica</option>
                                            <option value="joyeria">Joyería</option>
                                        </SelectInput>
                                        <InputError message={errors.categoria} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="municipio_venta" value="Municipio de Venta *" />
                                        <SelectInput
                                            id="municipio_venta"
                                            name="municipio_venta"
                                            value={data.municipio_venta}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('municipio_venta', e.target.value)}
                                            required
                                        >
                                            <option value="morroa">Morroa</option>
                                            <option value="sampues">Sampues</option>
                                        </SelectInput>
                                        <InputError message={errors.municipio_venta} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="tecnica_artesanal" value="Técnica Artesanal *" />
                                        <SelectInput
                                            id="tecnica_artesanal"
                                            name="tecnica_artesanal"
                                            value={data.tecnica_artesanal}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('tecnica_artesanal', e.target.value)}
                                            required
                                        >
                                            <option value="telar horizontal">Telar Horizontal</option>
                                            <option value="bordado">Bordado</option>
                                            <option value="cosido">Cosido</option>
                                        </SelectInput>
                                        <InputError message={errors.tecnica_artesanal} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="materia_prima" value="Materia Prima *" />
                                        <SelectInput
                                            id="materia_prima"
                                            name="materia_prima"
                                            value={data.materia_prima}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('materia_prima', e.target.value)}
                                            required
                                        >
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
                                    <InputLabel htmlFor="descripcion" value="Descripción *" />
                                    <TextArea
                                        id="descripcion"
                                        name="descripcion"
                                        value={data.descripcion}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('descripcion', e.target.value)}
                                        required
                                        rows={5}
                                    />
                                    <InputError message={errors.descripcion} className="mt-2" />
                                </div>

                                {/* Sección de imágenes existentes */}
                                <div className="mt-6">
                                    <InputLabel value="Imágenes Actuales del Producto" />
                                    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                        {existingImages.filter(img => !data.imagenes_eliminadas.includes(img.id)).map((imagen) => {
                                            const url = getImageUrl(imagen.ruta_imagen);
                                            const isMain = data.imagen_principal === imagen.id;
                                            return (
                                                <div
                                                    key={imagen.id}
                                                    className={`relative rounded-lg border-2 ${isMain ? 'border-indigo-500' : 'border-gray-200'}`}
                                                    style={{ background: '#fff', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    <img
                                                        src={url}
                                                        alt={`Imagen del producto ${imagen.id}`}
                                                        className="w-full max-h-48"
                                                        style={{ display: 'block', margin: '0 auto' }}
                                                    />
                                                    <div
                                                        className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none"
                                                        style={{ background: 'transparent' }}
                                                    >
                                                        <div className="pointer-events-auto">
                                                            <button
                                                                type="button"
                                                                onClick={() => setMainImage(imagen.id)}
                                                                className={`self-end px-2 py-1 text-xs rounded-full ${isMain ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'}`}
                                                            >
                                                                {isMain ? 'Principal' : 'Hacer principal'}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeExistingImage(imagen.id)}
                                                                className="self-end px-2 py-1 text-xs rounded-full bg-red-500 text-white"
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Sección para agregar nuevas imágenes */}
                                <div className="mt-6">
                                    <InputLabel htmlFor="nuevas_imagenes" value="Agregar Nuevas Imágenes" />
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
                                                    htmlFor="nuevas_imagenes"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                >
                                                    <span>Seleccionar imágenes</span>
                                                    <input
                                                        id="nuevas_imagenes"
                                                        name="nuevas_imagenes"
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        className="sr-only"
                                                        onChange={handleNewImages}
                                                    />
                                                </label>
                                                <p className="pl-1">o arrastrar y soltar</p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPG, GIF hasta 10MB (máximo 5 imágenes en total)
                                            </p>
                                        </div>
                                    </div>

                                    {/* Vista previa de nuevas imágenes */}
                                    {previewImages.length > 0 && (
                                        <div className="mt-4">
                                            <InputLabel value="Vista Previa de Nuevas Imágenes" />
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
                                                {previewImages.map((image, index) => (
                                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                                                        <img
                                                            src={image.preview}
                                                            alt={`Vista previa ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeNewImage(index)}
                                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Contador de imágenes */}
                                <div className="text-sm text-gray-500">
                                    Total imágenes después de guardar: {existingImages.length - data.imagenes_eliminadas.length + previewImages.length}/5
                                </div>

                                {/* Botones de acción */}
                                <div className="flex justify-between pt-6">
                                    <Link
                                        href={route('dashboard.artesano.index')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
                                    >
                                        Cancelar
                                    </Link>
                                    <PrimaryButton
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-[#4B3A3A] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#2B1F1F] focus:outline-none focus:ring-2 focus:ring-[#4B3A3A] focus:ring-offset-2 transition-all"
                                    >
                                        {processing ? 'Guardando...' : 'Guardar Cambios'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
