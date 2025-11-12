import { MapPin } from "lucide-react";
import MainMap from "./components/MainMap";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

function App() {

  return (
    <div className="relative h-screen bg-neutral-50 flex flex-col">
      <div>
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between md:px-8">
          <div className="flex gap-2 items-center">
            <MapPin className="text-yellow-400" size={30} />
            <h1 className="text-2xl">WeatherMap</h1>
          </div>
          <p className="absolute left-1/2 -translate-x-1/2 text-neutral-600 dark:text-neutral-300 text-lg">
            Click anywhere to get weather data
          </p>
          <ThemeSwitcher />
        </div>
      </div>
      <div className="flex-1 w-full">
        <MainMap dark={false} />
      </div>
    </div>
  );
}

export default App;
