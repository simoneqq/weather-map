import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useThemeContext } from "./contexts/ThemeContext";

export default function MainMap({ dark }: { dark: boolean }) {
  const [position, setPosition] = useState<[number, number]>([52.2297, 21.0122]);

  return (
    <div className="h-full">
      <MapContainer center={position} zoom={13} className="h-full w-full">
        <TileLayer
          url={
            dark
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          attribution="© OpenStreetMap contributors"
        />
        <Marker position={position}>
          <Popup>
            Kliknięte miejsce: <br />
            Lat: {position[0].toFixed(4)} <br />
            Lng: {position[1].toFixed(4)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
