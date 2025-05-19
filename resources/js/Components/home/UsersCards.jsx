import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix para los íconos de los marcadores
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function UserCards() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=5")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const openModal = (index) => {
    setSelectedIndex(index);
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
    setSelectedIndex(null);
  };

  const handleClickOutside = (e) => {
    if (e.target === dialogRef.current) {
      closeModal();
    }
  };

  const nextUser = () => {
    setSelectedIndex((prev) => (prev + 1) % users.length);
  };

  const prevUser = () => {
    setSelectedIndex((prev) => (prev - 1 + users.length) % users.length);
  };

  const selectedUser = selectedIndex !== null ? users[selectedIndex] : null;

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
