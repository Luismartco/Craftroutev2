import React from 'react';
import ContainerPriceStock from './ContainerPriceStock';

const StatisticsTable = ({product}) => {
    // Función para obtener la imagen del producto
    const getProductImage = () => {
        console.log('Producto:', product.name, 'Imágenes:', product.imagenes);

        // Si el producto tiene imágenes
        if (product.imagenes && product.imagenes.length > 0) {
            // Buscar imagen principal, si no, usar la primera
            const imagenPrincipal = product.imagenes.find(img => img.es_principal) || product.imagenes[0];
            console.log('Imagen principal encontrada:', imagenPrincipal);

            // Si es un string, usar directamente, si es objeto, usar ruta_imagen
            if (typeof imagenPrincipal === 'string') {
                const imageUrl = `/storage/${imagenPrincipal}`;
                console.log('URL de imagen (string):', imageUrl);
                return imageUrl;
            } else if (imagenPrincipal && imagenPrincipal.ruta_imagen) {
                const imageUrl = `/storage/${imagenPrincipal.ruta_imagen}`;
                console.log('URL de imagen (objeto):', imageUrl);
                return imageUrl;
            } else if (imagenPrincipal && imagenPrincipal.url) {
                const imageUrl = imagenPrincipal.url.startsWith('http') ? imagenPrincipal.url : `/storage/${imagenPrincipal.url}`;
                console.log('URL de imagen (url):', imageUrl);
                return imageUrl;
            }
        }

        // Verificar si hay una propiedad image directa
        if (product.image) {
            const imageUrl = product.image.startsWith('http') ? product.image : `/storage/${product.image}`;
            console.log('URL de imagen (propiedad image):', imageUrl);
            return imageUrl;
        }

        console.log('No se encontró imagen para:', product.name);
        // Si no tiene imagen, devolver null para mostrar inicial
        return null;
    };

    const productImage = getProductImage();

    return (
        <tr className='border-b border-gray-300'>
            <td className='p-2'>
                {productImage ? (
                    <img
                        src={productImage}
                        alt={product.name}
                        className='w-10 h-10 object-cover rounded-full mx-auto'
                        onError={(e) => {
                            // Si la imagen falla, mostrar inicial
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                {/* Contenedor para la inicial (inicialmente oculto) */}
                <div
                    className='w-10 h-10 rounded-full mx-auto bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600'
                    style={{ display: productImage ? 'none' : 'flex' }}
                >
                    {product.name ? product.name.charAt(0).toUpperCase() : '?'}
                </div>
            </td>
            <td className='p-2'>{product.name}</td>
            <td className='p-2'><ContainerPriceStock value={product.price} /></td>
            <td className='p-2'><ContainerPriceStock value={product.amount} /></td>
            <td className='p-2'><ContainerPriceStock value={product.total} /></td>
            <td className='p-2'>{product.store}</td>
            <td className='p-2'>{product.municipality}</td>
        </tr>
    );
}

export default StatisticsTable;