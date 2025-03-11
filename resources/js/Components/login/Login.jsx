export default function MainLogin() {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] p-6">
        <div className="bg-white p-12 rounded-lg shadow-lg w-[480px] flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Iniciar Sesión</h1>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-4 mb-5 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-4 mb-6 border border-gray-300 rounded"
          />
          <button className="w-full bg-[#2B1F1F] text-white py-4 rounded hover:bg-opacity-90 transition">
            Iniciar sesión
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
          ¿No has creado una cuenta? <a href="/register" className="text-blue-600 hover:underline">Registrate</a>
        </p>
        </div>
      </div>
    );
}
