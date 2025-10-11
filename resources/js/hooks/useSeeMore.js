import { useState } from 'react';

// Hook personalizado para manejar la lógica de "Ver más" y "Ver menos"
// Este Hook recibe la lista de items(productos, tiendas, etc.), el ID del contenedor para hacer scroll y la cantidad inicial a mostrar
// listItems: es la lista de objetos (productos, tiendas, etc.)
// containerId: es el ID del contenedor donde se encuentra la lista (para hacer scroll al contraer)
// initialAmountShow: es la cantidad inicial de items a mostrar y cuando se contrae de nuevo

const useSeeMore = (listItems, containerId, initialAmountShow) => {
    const [isExpanded, setIsExpanded] = useState(false); // Estado para saber si estan mostrando todos los items o solo una parte
    const [itemsToShow, setItemsToShow] = useState(listItems.slice(0, initialAmountShow)); // Estado para los items a mostrar, es decir, si se muestra toda la lista o solo una parte de la misma

    const toggleViewMore = () => {
        // Si está expandido, es decir, isExpanded es true, entonces se contrae la lista y se muestra solo la cantidad inicial
        if (isExpanded) {
            setItemsToShow(listItems.slice(0, initialAmountShow));
            document.getElementById(`${containerId}`).scrollIntoView({ behavior: 'smooth' })
        // Si no está expandido, se muestra toda la lista    
        } else {
            setItemsToShow(listItems);
        }
        setIsExpanded(!isExpanded); // Alterna el estado de isExpanded
    };

    return [isExpanded, toggleViewMore, itemsToShow];// Retorna el estado de expansión y la función para alternar entre ver más o ver menos, y la lista de items a mostrar (productos, tiendas, etc.)

}

export default useSeeMore;