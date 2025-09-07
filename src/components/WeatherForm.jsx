import React, { useState } from "react";
import "./WeatherForm.css";

const WeatherForm = ({ getWeather }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      getWeather(city);
      setCity("");
    }
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="city-input"
        />
        <button type="submit" className="get-weather-btn mt-3">
          Get Weather
        </button>
      </form>
    </div>
  );
};

export default WeatherForm;
