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
              <div
                key={index}
                className="w-full h-40 bg-gray-200 rounded-xl"
              />
            ))
          : users.map((user, index) => (
              <div
                key={user.login.uuid}
                className="shadow-md rounded-xl p-4 flex flex-col items-center bg-white border transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => openModal(index)}
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

      <dialog
        ref={dialogRef}
        className="rounded-xl p-0 shadow-xl w-[90%] max-w-2xl backdrop:bg-black/40"
        onClick={handleClickOutside}
      >
        {selectedUser && (
          <div className="p-4 space-y-4 bg-white rounded-xl flex flex-col items-center text-center">
            <img
              src={selectedUser.picture.large}
              alt={`${selectedUser.name.first} ${selectedUser.name.last}`}
              className="w-24 h-24 rounded-full border mb-2"
            />
            <h2 className="text-xl font-semibold">
              {selectedUser.name.title} {selectedUser.name.first} {selectedUser.name.last}
            </h2>
            <p className="text-gray-600">{selectedUser.email}</p>
            <p className="text-sm text-gray-500">
              {selectedUser.location.city}, {selectedUser.location.country}
            </p>

            {/* Mapa con coordenadas */}
            <div className="w-full h-64 rounded overflow-hidden">
              <MapContainer
                center={[
                  parseFloat(selectedUser.location.coordinates.latitude),
                  parseFloat(selectedUser.location.coordinates.longitude),
                ]}
                zoom={6}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={[
                    parseFloat(selectedUser.location.coordinates.latitude),
                    parseFloat(selectedUser.location.coordinates.longitude),
                  ]}
                >
                  <Popup>
                    {selectedUser.location.city}, {selectedUser.location.country}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            <div className="flex justify-between items-center w-full px-4 pt-4">
              <button className="text-2xl" onClick={prevUser}>
                ←
              </button>

              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-[#4B3A3A] text-white rounded hover:bg-opacity-80 transition-colors duration-200"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
              </div>

              <button className="text-2xl" onClick={nextUser}>
                →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
