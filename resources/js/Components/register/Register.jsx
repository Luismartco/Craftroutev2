import { useState } from "react";

export default function MainRegister() {
  const [role, setRole] = useState("cliente");
  const [location, setLocation] = useState({ lat: "", lon: "" });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    } else {
      alert("La geolocalización no es compatible con este navegador.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="bg-white p-12 rounded-lg shadow-lg w-[480px] flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#2B1F1F] mb-6 text-center">Registro</h1>
        <input type="text" placeholder="Nombre" className="w-full p-3 mb-4 border border-gray-300 rounded" />
        <input type="text" placeholder="Apellido" className="w-full p-3 mb-4 border border-gray-300 rounded" />
        <input type="email" placeholder="Correo electrónico" className="w-full p-3 mb-4 border border-gray-300 rounded" />
        <input type="password" placeholder="Contraseña" className="w-full p-3 mb-4 border border-gray-300 rounded" />
        <input type="password" placeholder="Confirmar contraseña" className="w-full p-3 mb-4 border border-gray-300 rounded" />
        <input type="date" className="w-full p-3 mb-4 border border-gray-300 rounded" />
        <select className="w-full p-3 mb-4 border border-gray-300 rounded">
          <option value="">Seleccione su sexo</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>
        <p className="text-[#2B1F1F] text-center py-2 text-2xl font-bold">¿Usted es?</p>
        <div className="w-full flex justify-center gap-20 mb-4">
          <label className="flex items-center">
            <input type="radio" name="role" value="artesano" className="mr-2" onChange={() => setRole("artesano")} /> Artesano
          </label>
          <label className="flex items-center">
            <input type="radio" name="role" value="cliente" className="mr-2" onChange={() => setRole("cliente")} defaultChecked /> Cliente
          </label>
        </div>
        {role === "artesano" ? (
          <>
            <input type="text" placeholder="Barrio de residencia" className="w-full p-3 mb-4 border border-gray-300 rounded" />
            <input type="text" placeholder="Dirección" className="w-full p-3 mb-4 border border-gray-300 rounded" />
            <input type="text" placeholder="Teléfono de contacto" className="w-full p-3 mb-4 border border-gray-300 rounded" />
            <button onClick={getLocation} className="w-full bg-[#4B3A3A] text-white py-3 rounded hover:bg-blue-600 transition mb-4">Obtener ubicación GPS</button>
            <p className="text-sm text-[#2B1F1F] text-center mb-2">Los siguientes campos son obligatorios, debe darle en el botón de ‘Obtener’ y aceptar en el aviso para tener en consideración su ubicación GPS.</p>
            <div className="w-full flex justify-between">
              <input type="text" value={location.lat} readOnly placeholder="Latitud" className="w-[48%] p-3 border border-gray-300 rounded bg-gray-100" />
              <input type="text" value={location.lon} readOnly placeholder="Longitud" className="w-[48%] p-3 border border-gray-300 rounded bg-gray-100" />
            </div>
          </>
        ) : (
          <input type="text" placeholder="Ciudad de residencia" className="w-full p-3 mb-4 border border-gray-300 rounded" />
        )}
        <button className="w-full bg-[#2B1F1F] text-white py-4 rounded hover:bg-opacity-90 transition mt-4">Registrarse</button>
        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes cuenta? <a href="/login" className="text-blue-600 hover:underline">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}

