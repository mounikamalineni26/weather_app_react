import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import "./WeatherDisplay.css";

const weatherAnimations = {
  "clear": "https://assets10.lottiefiles.com/packages/lf20_touohxv0.json",
  "clouds": "https://assets10.lottiefiles.com/packages/lf20_YXD37q.json",
  "rain": "https://assets10.lottiefiles.com/packages/lf20_jk6c8d.json",
  "thunderstorm": "https://assets10.lottiefiles.com/packages/lf20_jk6c8d.json",
  "snow": "https://assets10.lottiefiles.com/packages/lf20_mk3o8b.json",
  "mist": "https://assets10.lottiefiles.com/packages/lf20_sxk4uc.json",
};

const WeatherDisplay = ({ weather }) => {
  if (!weather) return null;

  const mainWeather = weather.weather[0].main.toLowerCase();
  const animationUrl = weatherAnimations[mainWeather] || weatherAnimations["clear"];

  const round = (num) => Math.round(num * 10) / 10;

  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>

      <Player
        autoplay
        loop
        src={animationUrl}
        style={{ height: "150px", width: "150px" }}
      />

      <p className="description">{weather.weather[0].description}</p>

      <div className="weather-details">
        <p>🌡️ Temp: {round(weather.main.temp)}°C</p>
        <p>💧 Humidity: {weather.main.humidity}%</p>
        <p>🤗 Feels like: {round(weather.main.feels_like)}°C</p>
        <p>💨 Wind: {round(weather.wind.speed)} m/s</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
