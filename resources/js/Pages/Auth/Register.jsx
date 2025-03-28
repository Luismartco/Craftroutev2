import { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        birth_date: "",
        gender: "",
        role: "",
        residence_municipality: "",
        neighborhood: "",
        address: "",
        phone: "",
        latitude: "",
        longitude: "",
    });

    const [isArtesano, setIsArtesano] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleRoleChange = (e) => {
        const roleValue = e.target.value;
        setIsArtesano(roleValue === "artisan");
        setData("role", roleValue);
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setData("latitude", position.coords.latitude);
                    setData("longitude", position.coords.longitude);
                },
                (error) => {
                    alert("Error obteniendo la ubicación: " + error.message);
                }
            );
        } else {
            alert("La geolocalización no es compatible con este navegador.");
        }
    };

    const submit = (e) => {
        e.preventDefault();
        setSuccessMessage("");

        post(route("register"), {
            onSuccess: () => {
                console.log("Registro exitoso");
                setSuccessMessage("Registro exitoso. ¡Bienvenido!");
                reset(
                    "password",
                    "password_confirmation",
                    "name",
                    "email",
                    "phone",
                    "latitude",
                    "longitude"
                );
            },
            onError: (errors) => {
                console.error("Errores en el registro:", errors);
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Registro" />
                    <h1 className="text-3xl font-bold text-[#2B1F1F] mb-6 text-center">Registro</h1>
                    
                    <form onSubmit={submit} className="space-y-3">
                        {successMessage && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                {successMessage}
                            </div>
                        )}

                        <div className="space-y-1">
                            <InputLabel htmlFor="name" value="Nombre" className="text-sm text-gray-600" />
                            <TextInput 
                                id="name" 
                                name="name" 
                                className="w-full p-3 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#2B1F1F] focus:outline-none" 
                                value={data.name} 
                                onChange={(e) => setData("name", e.target.value)} 
                                required 
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="space-y-1">
                            <InputLabel htmlFor="last_name" value="Apellidos" className="text-sm text-gray-600" />
                            <TextInput 
                                id="last_name" 
                                name="last_name" 
                                className="w-full p-3 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#2B1F1F] focus:outline-none" 
                                value={data.last_name} 
                                onChange={(e) => setData("last_name", e.target.value)} 
                                required 
                            />
                            <InputError message={errors.last_name} />
                        </div>

                        <div className="space-y-1">
                            <InputLabel htmlFor="email" value="Correo Electrónico" className="text-sm text-gray-600" />
                            <TextInput 
                                id="email" 
                                type="email" 
                                name="email" 
                                className="w-full p-3 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#2B1F1F] focus:outline-none" 
                                value={data.email} 
                                onChange={(e) => setData("email", e.target.value)} 
                                required 
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-1">
                            <InputLabel htmlFor="password" value="Contraseña" className="text-sm text-gray-600" />
                            <TextInput 
                                id="password" 
                                type="password" 
                                name="password" 
                                className="w-full p-3 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#2B1F1F] focus:outline-none" 
                                value={data.password} 
                                onChange={(e) => setData("password", e.target.value)} 
                                required 
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="space-y-1">
                            <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" className="text-sm text-gray-600" />
                            <TextInput 
                                id="password_confirmation" 
                                type="password" 
                                name="password_confirmation" 
                                className="w-full p-3 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#2B1F1F] focus:outline-none" 
                                value={data.password_confirmation} 
                                onChange={(e) => setData("password_confirmation", e.target.value)} 
                                required 
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="space-y-1">
                            <InputLabel htmlFor="birth_date" value="Fecha de Nacimiento" className="text-sm text-gray-600" />
                            <TextInput 
                                id="birth_date" 
                                type="date" 
                                name="birth_date" 
                                className="w-full p-3 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#2B1F1F] focus:outline-none" 
                                value={data.birth_date} 
                                onChange={(e) => setData("birth_date", e.target.value)} 
                                required 
                            />
                            <InputError message={errors.birth_date} />
                        </div>

                        <div className="space-y-1">
                            <InputLabel htmlFor="gender" value="Sexo" className="text-sm text-gray-600" />
                            <select 
                                name="gender" 
                                className="w-full p-3 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#2B1F1F] focus:outline-none" 
                                value={data.gender} 
                                onChange={(e) => setData("gender", e.target.value)} 
                                required
                            >
                                <option value="">Seleccione su sexo</option>
                                <option value="Male">Masculino</option>
                                <option value="Female">Femenino</option>
                                <option value="Other">Otro</option>
                            </select>
                            <InputError message={errors.gender} />
                        </div>

                        <div className="space-y-2">
                            <InputLabel value="¿Usted es?" className="text-lg text-gray-700 font-semibold" />
                            <div className="flex space-x-4 p-2 rounded-lg">
                                <label className="flex items-center text-lg">
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        value="artisan" 
                                        checked={data.role === "artisan"} 
                                        onChange={handleRoleChange} 
                                        className="mr-3 w-5 h-5" 
                                        required 
                                    /> 
                                    Artesano
                                </label>
                                <label className="flex items-center text-lg">
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        value="customer" 
                                        checked={data.role === "customer"} 
                                        onChange={handleRoleChange} 
                                        className="mr-3 w-5 h-5" 
                                        required 
                                    /> 
                                    Cliente
                                </label>
                            </div>
                            <InputError message={errors.role} />
                        </div>

                        <div className="space-y-1">
                            <InputLabel htmlFor="residence_municipality" value="Municipio de Residencia" className="text-sm text-gray-600" />
                            <TextInput 
                                id="residence_municipality" 
                                name="residence_municipality" 
                                className="w-full p-3 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#2B1F1F] focus:outline-none" 
                                value={data.residence_municipality} 
                                onChange={(e) => setData("residence_municipality", e.target.value)} 
                                required 
                            />
                            <InputError message={errors.residence_municipality} />
                        </div>

                        {isArtesano && (
                            <>
                                <div className="space-y-1">
                                    <InputLabel htmlFor="neighborhood" value="Barrio de Residencia" className="text-sm text-gray-600" />
                                    <TextInput 
                                        id="neighborhood" 
                                        name="neighborhood" 
                                        className="w-full p-3 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#2B1F1F] focus:outline-none" 
                                        value={data.neighborhood} 
                                        onChange={(e) => setData("neighborhood", e.target.value)} 
                                        required 
                                    />
                                    <InputError message={errors.neighborhood} />
                                </div>

                                <div className="space-y-1">
                                    <InputLabel htmlFor="address" value="Dirección" className="text-sm text-gray-600" />
                                    <TextInput 
                                        id="address" 
                                        name="address" 
                                        className="w-full p-3 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#2B1F1F] focus:outline-none" 
                                        value={data.address} 
                                        onChange={(e) => setData("address", e.target.value)} 
                                        required 
                                    />
                                    <InputError message={errors.address} />
                                </div>
                            </>
                        )}

                        <div className="space-y-1">
                            <InputLabel htmlFor="phone" value="Teléfono de Contacto" className="text-sm text-gray-600" />
                            <TextInput 
                                id="phone" 
                                name="phone" 
                                className="w-full p-3 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#2B1F1F] focus:outline-none" 
                                value={data.phone} 
                                onChange={(e) => setData("phone", e.target.value)} 
                                required 
                            />
                            <InputError message={errors.phone} />
                        </div>

                        <div className="space-y-2">
                            <PrimaryButton 
                                type="button" 
                                onClick={getLocation} 
                                className="w-full bg-[#2B1F1F] text-[#2B1F1F] py-3 rounded hover:bg-[#3C2F2F] transition"
                            >
                                Obtener ubicación GPS
                            </PrimaryButton>
                            <div className="flex space-x-2">
                                <TextInput 
                                    id="latitude" 
                                    name="latitude" 
                                    placeholder="Latitud" 
                                    className="w-1/2 p-3 text-sm border border-[#3C2F2F] rounded focus:ring-1 focus:ring-[#2B1F1F] focus:outline-none" 
                                    value={data.latitude} 
                                    readOnly 
                                    required 
                                />
                                <TextInput 
                                    id="longitude" 
                                    name="longitude" 
                                    placeholder="Longitud" 
                                    className="w-1/2 p-3 text-sm border border-[#3C2F2F] rounded focus:ring-1 focus:ring-[#2B1F1F] focus:outline-none" 
                                    value={data.longitude} 
                                    readOnly 
                                    required 
                                />
                            </div>
                        </div>

                        <div>
                            <PrimaryButton 
                                type="submit" 
                                disabled={processing} 
                                className="w-full bg-[#2B1F1F] text-white py-3 rounded hover:bg-[#3C2F2F] transition"
                            >
                                Registrarse
                            </PrimaryButton>
                        </div>
                    </form>
        </GuestLayout>
    );
}