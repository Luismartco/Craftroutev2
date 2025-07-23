import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const MapasMorroaSampues = () => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            const locations = {
                morroa: { lat: 9.3337, lon: -75.3022 },
                sampues: { lat: 9.1835, lon: -75.3812 }
            };

            const mapMorroa = window.L.map("map-morroa").setView([locations.morroa.lat, locations.morroa.lon], 13);
            window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            }).addTo(mapMorroa);
            window.L.marker([locations.morroa.lat, locations.morroa.lon]).addTo(mapMorroa).bindPopup("Morroa").openPopup();

            const mapSampues = window.L.map("map-sampues").setView([locations.sampues.lat, locations.sampues.lon], 13);
            window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            }).addTo(mapSampues);
            window.L.marker([locations.sampues.lat, locations.sampues.lon]).addTo(mapSampues).bindPopup("Sampués").openPopup();
        }
    }, []);

    return (
        <div className="flex justify-center px-4 py-8"> 
            <div className="grid gird-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl" >
                <div>
                    <h3 className="text-center">Morroa</h3>
                    <div id="map-morroa" 
                    className="w-full h-[300px] md:h-[400px] rounded-lg shadow-md"></div>
                </div>
                <div>
                    <h3 className="text-center">Sampués</h3>
                    <div id="map-sampues" className="w-full h-[300px] md:h-[400px] rounded-lg shadow-md"></div>
                </div>
            </div>
        </div>
    );
};

export default MapasMorroaSampues;



