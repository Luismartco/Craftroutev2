import { useNavigate } from "react-router-dom";

export default function MainIngreso() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] p-6">
      <div className="bg-white p-12 rounded-lg shadow-lg w-[480px] flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#2B1F1F] mb-6 text-center">CraftRoute</h1>
        <p className="text-lg text-gray-700 mb-4">Si ya usas CraftRoute:</p>
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-[#2B1F1F] text-white py-4 rounded hover:bg-[#4B3A3A] transition mb-6"
        >
          Iniciar sesión
        </button>
        <p className="text-lg text-gray-700 mb-4">Si es tu primera vez usando CraftRoute:</p>
        <button
          onClick={() => navigate("/register")}
          className="w-full bg-[#2B1F1F] text-white py-4 rounded hover:bg-[#4B3A3A] transition"
        >
          Crear una cuenta
        </button>
      </div>
    </div>
  );
}
