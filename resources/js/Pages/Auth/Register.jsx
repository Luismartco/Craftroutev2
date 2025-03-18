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
            <form onSubmit={submit}>
                {successMessage && <div className="success-message">{successMessage}</div>}

                <InputLabel htmlFor="name" value="Nombre" />
                <TextInput id="name" name="name" className="w-full" value={data.name} onChange={(e) => setData("name", e.target.value)} required />
                <InputError message={errors.name} />

                <InputLabel htmlFor="last_name" value="Apellidos" />
                <TextInput id="last_name" name="last_name" className="w-full" value={data.last_name} onChange={(e) => setData("last_name", e.target.value)} required />
                <InputError message={errors.last_name} />

                <InputLabel htmlFor="email" value="Correo Electrónico" />
                <TextInput id="email" type="email" name="email" className="w-full" value={data.email} onChange={(e) => setData("email", e.target.value)} required />
                <InputError message={errors.email} />

                <InputLabel htmlFor="password" value="Contraseña" />
                <TextInput id="password" type="password" name="password" className="w-full" value={data.password} onChange={(e) => setData("password", e.target.value)} required />
                <InputError message={errors.password} />

                <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                <TextInput id="password_confirmation" type="password" name="password_confirmation" className="w-full" value={data.password_confirmation} onChange={(e) => setData("password_confirmation", e.target.value)} required />
                <InputError message={errors.password_confirmation} />

                <InputLabel htmlFor="birth_date" value="Fecha de Nacimiento" />
                <TextInput id="birth_date" type="date" name="birth_date" className="w-full" value={data.birth_date} onChange={(e) => setData("birth_date", e.target.value)} required />
                <InputError message={errors.birth_date} />

                <InputLabel htmlFor="gender" value="Sexo" />
                <select name="gender" className="w-full" value={data.gender} onChange={(e) => setData("gender", e.target.value)} required>
                    <option value="">Seleccione su sexo</option>
                    <option value="Male">Masculino</option>
                    <option value="Female">Femenino</option>
                    <option value="Other">Otro</option>
                </select>
                <InputError message={errors.gender} />

                <InputLabel value="¿Usted es?" />
                <label className="w-full">
                    <input type="radio" name="role" value="artisan" checked={data.role === "artisan"} onChange={handleRoleChange} required /> Artesano
                </label>
                <label className="w-full">
                    <input type="radio" name="role" value="customer" checked={data.role === "customer"} onChange={handleRoleChange} required /> Cliente
                </label>
                <InputError message={errors.role} />

                <InputLabel htmlFor="residence_municipality" value="Municipio de Residencia" />
                <TextInput id="residence_municipality" name="residence_municipality" className="w-full" value={data.residence_municipality} onChange={(e) => setData("residence_municipality", e.target.value)} required />
                <InputError message={errors.residence_municipality} />

                {isArtesano && (
                    <>
                        <InputLabel htmlFor="neighborhood" value="Barrio de Residencia" />
                        <TextInput id="neighborhood" name="neighborhood" className="w-full" value={data.neighborhood} onChange={(e) => setData("neighborhood", e.target.value)} required />
                        <InputError message={errors.neighborhood} />

                        <InputLabel htmlFor="address" value="Dirección" />
                        <TextInput id="address" name="address" className="w-full" value={data.address} onChange={(e) => setData("address", e.target.value)} required />
                        <InputError message={errors.address} />
                    </>
                )}

                <InputLabel htmlFor="phone" value="Teléfono de Contacto" />
                <TextInput id="phone" name="phone" className="w-full" value={data.phone} onChange={(e) => setData("phone", e.target.value)} required />
                <InputError message={errors.phone} />

                <PrimaryButton type="button" onClick={getLocation}>Obtener ubicación GPS</PrimaryButton>
                <TextInput id="latitude" name="latitude" className="w-full" value={data.latitude} readOnly required />
                <TextInput id="longitude" name="longitude" className="w-full" value={data.longitude} readOnly required />

                <PrimaryButton type="submit" disabled={processing}>Registrarse</PrimaryButton>
            </form>
        </GuestLayout>
    );
}
    