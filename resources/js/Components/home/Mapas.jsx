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
        <div style={{display: "flex", justifyContent: "center"}}> 
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px",  width: "auto"}}>
                <div>
                    <h3 style={{ textAlign: "center", color: "#333" }}>Morroa</h3>
                    <div id="map-morroa" style={{ width: "600px", height: "400px",  borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}></div>
                </div>
                <div>
                    <h3 style={{ textAlign: "center", color: "#333" }}>Sampués</h3>
                    <div id="map-sampues" style={{ width: "600px",  height: "400px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}></div>
                </div>
            </div>
        </div>
    );
};

export default MapasMorroaSampues;



