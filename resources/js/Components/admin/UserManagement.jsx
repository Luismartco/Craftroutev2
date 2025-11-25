import React, { useState } from 'react';
import { router, Link } from '@inertiajs/react';

const UserManagement = ({ users, title }) => {
    const [editingUser, setEditingUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const userList = users.data || users;
    const pagination = users.links ? users : null;

    const handleEdit = (user) => {
        setEditingUser({ ...user });
        setShowEditModal(true);
    };

    const handleDelete = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        router.delete(`/dashboard/admin/users/${userToDelete.id}`, {
            onSuccess: () => {
                setShowDeleteModal(false);
                setUserToDelete(null);
                router.reload();
            }
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        router.put(`/dashboard/admin/users/${editingUser.id}`, {
            name: editingUser.name,
            last_name: editingUser.last_name,
            email: editingUser.email,
            birth_date: editingUser.birth_date,
            gender: editingUser.gender,
            role: editingUser.role,
            phone: editingUser.phone,
            residence_municipality: editingUser.residence_municipality,
            neighborhood: editingUser.neighborhood,
            address: editingUser.address,
        }, {
            onSuccess: () => {
                setShowEditModal(false);
                setEditingUser(null);
                router.reload();
            }
        });
    };

    return (
        <div className="py-4">
            <h3 className="text-2xl font-bold text-center mb-6">{title}</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full table-fixed border-spacing-2 border border-gray-300 text-center">
                    <thead className="bg-gray-200">
                        <tr className="border-b border-gray-300">
                            <th className="p-2">Nombre</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Rol</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="border-b border-gray-300">
                        {userList && userList.map((user) => (
                            <tr key={user.id} className="border-b border-gray-300">
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.role}</td>
                                <td className="p-2">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="bg-[#5D4A4A] text-white px-2 py-1 rounded mr-2 hover:bg-[#6D5A5A]"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                    <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Siguiente</button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Mostrando <span className="font-medium">{users.from}</span> a <span className="font-medium">{users.to}</span> de <span className="font-medium">{users.total}</span> resultados
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            {users.links && users.links.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => link.url && router.get(link.url, {}, { preserveState: true, preserveScroll: true })}
                                    disabled={!link.url}
                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                        link.active
                                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                    } ${index === 0 ? 'rounded-l-md' : ''} ${index === users.links.length - 1 ? 'rounded-r-md' : ''} ${!link.url ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl relative">
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ×
                        </button>
                        <h4 className="text-lg font-bold mb-4">Editar Usuario</h4>
                        <form onSubmit={handleUpdate} className="max-h-96 overflow-y-auto">
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Nombre</label>
                                <input
                                    type="text"
                                    value={editingUser.name}
                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Apellidos</label>
                                <input
                                    type="text"
                                    value={editingUser.last_name}
                                    onChange={(e) => setEditingUser({ ...editingUser, last_name: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    value={editingUser.birth_date ? editingUser.birth_date.split('T')[0] : ''}
                                    onChange={(e) => setEditingUser({ ...editingUser, birth_date: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Sexo</label>
                                <select
                                    value={editingUser.gender}
                                    onChange={(e) => setEditingUser({ ...editingUser, gender: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">Seleccione</option>
                                    <option value="Male">Masculino</option>
                                    <option value="Female">Femenino</option>
                                    <option value="Other">Otro</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Rol</label>
                                <select
                                    value={editingUser.role}
                                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="customer">Cliente</option>
                                    <option value="artisan">Artesano</option>
                                    <option value="admin">Administrador</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Teléfono</label>
                                <input
                                    type="text"
                                    value={editingUser.phone}
                                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Municipio de Residencia</label>
                                <input
                                    type="text"
                                    value={editingUser.residence_municipality}
                                    onChange={(e) => setEditingUser({ ...editingUser, residence_municipality: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Barrio</label>
                                <input
                                    type="text"
                                    value={editingUser.neighborhood}
                                    onChange={(e) => setEditingUser({ ...editingUser, neighborhood: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Dirección</label>
                                <input
                                    type="text"
                                    value={editingUser.address}
                                    onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => {
                                        router.post(`/dashboard/admin/users/${editingUser.id}/reset-password`, {}, {
                                            onSuccess: () => {
                                                alert('Contraseña reseteada a "12345678"');
                                            }
                                        });
                                    }}
                                    className="px-4 py-2 bg-red-500 text-white rounded"
                                >
                                    Resetear Contraseña
                                </button>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="mr-2 px-4 py-2 bg-gray-300 rounded"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h4 className="text-lg font-bold mb-4">Eliminar Usuario</h4>
                        <p>¿Estás seguro de que quieres eliminar a {userToDelete?.name}?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;