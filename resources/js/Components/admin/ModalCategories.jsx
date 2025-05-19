import React, {useState, useEffect} from "react";

const ModalCategories = ({data, onClose, onSubmit, existingCategory}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (existingCategory) {
            setName(existingCategory.name);
            setDescription(existingCategory.description);
        } else {
            setName("");
            setDescription("");
        }
    }, [existingCategory]);

    const areEquals = (category) => {
        const result = data.find((cat) => cat.name.toLowerCase() === category.name.toLowerCase());

        if (!result) {
            return false;
        } else {
            return result.name.toLowerCase() === category.name.toLowerCase();
        }        

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() && description.trim()) {
            const category = {id: existingCategory === null ? data.length + 1 : existingCategory.id, name: name.trim(), description: description.trim()};
            if (areEquals(category)){
                alert("La categoría ya existe intentalo con otro nombre o edita la existente con el botón de editar");
                setName("");
                return;
            }
            onSubmit(category);
            setName("");
            setDescription("");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{existingCategory ? 'Editar categoría' : 'Agregar categoría'}</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="Category-Name" className="block mb-2 text-sm font-medium text-gray-700">
                        Nombre de la categoría</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ingrese el nombre de la categoría"
                        className="border border-gray-300 p-2 rounded w-full mb-4"
                        required
                    />
                    <label htmlFor="Category-Description" className="block mb-2 text-sm font-medium text-gray-700">
                        Descripción de la categoría</label>
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

export default ModalCategories;