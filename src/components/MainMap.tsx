import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

function ClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

async function getCityName(lat: number, lon: number) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
    {
      headers: {
        "User-Agent": "WeatherMap (szymonrocznik@gmail.com)"
      }
    }
  );
  const data = await res.json();

  return data.address.city || data.address.town || data.address.village;
}

export default function MainMap() {
  const [position, setPosition] = useState<[number, number]>([52.2297, 21.0122]);
  const [city, setCity] = useState<string>("");
  const { theme } = useTheme();

  useEffect(() => {
    (async () => {
      const name = await getCityName(position[0], position[1]);
      setCity(name);
    })();
  }, [position])

  const customIcon = L.divIcon({
    className: "",
    html: `
      <div class="bg-white dark:bg-neutral-800 shadow-lg rounded-xl p-3 w-64 text-center border border-neutral-200 dark:border-neutral-700">
        <h3 class="text-base font-semibold text-neutral-800 dark:text-neutral-100">Wybrana lokalizacja</h3>
        <h4 class="text-lg font-bold">${city}</h4>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          Lat: ${position[0].toFixed(3)} <br> Lng: ${position[1].toFixed(3)}
        </p>
      </div>
    `,
    iconAnchor: [0 / 0, 0 / 0],
  });

  return (
    <div className="h-full">
      <MapContainer center={position} zoom={13} className="h-full w-full">
        <TileLayer
          url={
            theme == "dark"
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          attribution="© OpenStreetMap contributors"
        />
        
        <Marker position={position} icon={customIcon}></Marker>

        <ClickHandler onMapClick={(lat, lng) => setPosition([lat, lng])} />
      </MapContainer>
    </div>
  );
}
