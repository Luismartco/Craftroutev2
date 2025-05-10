import { useEffect, useState } from "react";

export default function UserCards() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=5")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-full h-40 bg-gray-200 rounded-xl" />
            ))
          : users.map((user) => (
              <div
                key={user.login.uuid}
                className="shadow-md rounded-xl p-4 flex flex-col items-center bg-white border transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={user.picture.large}
                  alt={`${user.name.first} ${user.name.last}`}
                  className="w-24 h-24 rounded-full mb-3 border"
                />
                <div className="text-center">
                  <h3 className="text-lg font-semibold">
                    {user.name.first} {user.name.last}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {user.location.city}, {user.location.country}
                  </p>
                </div>
              </div>
            ))}
      </div>

      {/* Contenedor del botón centrado */}
      <div className="flex justify-center mt-4">
        <button className="px-6 py-2 bg-[#2B1F1F] text-white rounded hover:bg-opacity-80 transition-colors duration-200">
          Ver más
        </button>
      </div>
    </>
  );
}
