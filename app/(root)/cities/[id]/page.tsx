// import CurrentCityWeather from '@/app/components/CurrentCityWeather'
// import React from 'react'

// function page() {
//   return (
//     <div>
//      <CurrentCityWeather />
//     </div>
//   )
// }

// export default page

// pages/cities/[id]/page.tsx
// pages/cities/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import CurrentWeather from "@/app/components/CurrentWeather";
import Forecast from "@/app/components/Forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "@/app/utils/apis";
import { useSearchParams } from "next/navigation";
import CurrentCityWeather from "../../../components/CurrentCityWeather"; // Adjust the path as needed
type UpdateEventProps = {
  params: {
    id: string;
  };
};

const CityPage =  ({ params: { id } }: UpdateEventProps) => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const cityName = id;
  console.log("getttt ", cityName);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cityName) {
          const weatherResponse = await fetch(
            `${WEATHER_API_URL}/weather?q=${cityName}&appid=${WEATHER_API_KEY}`
          );
          const forecastResponse = await fetch(
            `${WEATHER_API_URL}/forecast?q=${cityName}&appid=${WEATHER_API_KEY}`
          );

          if (weatherResponse.ok && forecastResponse.ok) {
            const currentWeatherData = await weatherResponse.json();
            const forecastData = await forecastResponse.json();

            setCurrentWeather(currentWeatherData);
            setForecast(forecastData);
          } else {
            setError("Failed to fetch weather data or forecast data");
          }
        }
      } catch (error) {
        setError("Error fetching data from the server");
      }
    };

    fetchData();
  }, [cityName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
  // const [cityId, setCityId] = useState<string | null>(null);
  // const searchParams = useSearchParams();

  // console.log(id)
  // return (
  //   <div>
  //     {cityId && <CurrentCityWeather cityId={id} />}
  //     {/* Render other components */}
  //   </div>
  // );
};

export default CityPage;
