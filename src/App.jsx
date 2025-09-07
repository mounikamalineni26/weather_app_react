import React, { useState } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";
import { Player } from "@lottiefiles/react-lottie-player";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    const apiKey = "cdc6f6a293ca1ab5a3ef823609091e00";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const backgroundAnimations = {
    clear: "https://assets10.lottiefiles.com/packages/lf20_touohxv0.json",
    clouds: "https://assets10.lottiefiles.com/packages/lf20_YXD37q.json",
    rain: "https://assets10.lottiefiles.com/packages/lf20_jk6c8d.json",
    snow: "https://assets10.lottiefiles.com/packages/lf20_mk3o8b.json",
    mist: "https://assets10.lottiefiles.com/packages/lf20_sxk4uc.json",
  };

  const getBackgroundAnimation = (weather) => {
    if (!weather) return null;
    const main = weather.weather[0].main.toLowerCase();
    return backgroundAnimations[main] || backgroundAnimations["clear"];
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 relative overflow-hidden">
      
      {/* Background Lottie */}
      {weather && (
        <Player
          autoplay
          loop
          src={getBackgroundAnimation(weather)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            opacity: 0.3,
          }}
        />
      )}

      <h1 className="text-4xl font-bold text-center mt-8 mb-6">Weather App</h1>

      <WeatherForm getWeather={fetchWeather} />

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      {loading && (
        <div className="flex justify-center mt-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && weather && <WeatherDisplay weather={weather} />}
    </div>
  );
}

export default App;
