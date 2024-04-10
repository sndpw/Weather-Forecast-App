'use client'
import React, { useState } from "react";
import Search from "@/app/components/Search";
import CurrentWeather from "@/app/components/CurrentWeather";
import Forecast from "@/app/components/Forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "@/app/utils/apis";

import CitiesTable from "@/app/components/CitiesTable";

function App() {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);

  const handleOnSearchChange = (searchData: any) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      <CitiesTable CurrentWeather={currentWeather} forecast={forecast} />
    </div>
  );
}

export default App;
