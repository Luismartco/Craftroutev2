import React, {useState, useEffect} from "react";

const ModalItems = ({data, onClose, onSubmit, existingItem, title}) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (existingItem) {
            setName(existingItem.name);
            setDescription(existingItem.description);
        } else {
            setName("");
            setDescription("");
        }
    }, [existingItem]);

    const areEquals = (item) => {
        const result = data.find((itm) => itm.name.toLowerCase() === item.name.toLowerCase());

        if (!result) {
            return false;
        } else {
            return result.name.toLowerCase() === item.name.toLowerCase();
        }        

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() && description.trim()) {
            const item = {id: existingItem === null ? data.length + 1 : existingItem.id, name: name.trim(), description: description.trim()};
            if (areEquals(item)){
                alert("El item ya existe intentalo con otro nombre o edita el existente con el botón de editar");
                setName("");
                setDescription("");
                return;
            }
            onSubmit(item);
            setName("");
            setDescription("");
        }
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{existingItem ? `Editar ${title.toLowerCase()}` : `Agregar ${title.toLowerCase()}`}</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="Category-Name" className="block mb-2 text-sm font-medium text-gray-700">
                        Nombre {title != undefined ? title === "Categoría" || title === "Técnica" ? "de la" : "del" : ""} {title === undefined ? "" : title.toLowerCase()}</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ingrese el nombre de la categoría"
                        className="border border-gray-300 p-2 rounded w-full mb-4"
                        required
                    />
                    <label htmlFor="Category-Description" className="block mb-2 text-sm font-medium text-gray-700">
                        Descripción {title != undefined ? title === "Categoría" || title === "Técnica" ? "de la" : "del" : ""} {title === undefined ? "" : title.toLowerCase()}</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ingrese la descripción de la categoría"
                        className="border border-gray-300 p-2 rounded w-full mb-4"
                        required>
                    </textarea>
                    <button
                        type="submit"
                        className="bg-[#3C2F2F] text-white p-2 rounded-lg w-full hover:bg-[#4B3A3A]"
                    >
                        Guardar
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="mt-4 text-red-500 hover:underline"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
    
}

export default ModalItems;