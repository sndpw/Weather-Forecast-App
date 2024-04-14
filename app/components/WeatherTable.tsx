"use client";

import Table from "./Table";
import Search from "./Search";
import { useRouter } from "next/navigation";
import { WEATHER_API_URL, WEATHER_API_KEY } from "@/app/utils/apis";


export default function WeatherTable() {
  const router = useRouter();

  const handleOnSearchChange = async (searchData: any) => {
    const [name] = searchData.label.split(" ");
    console.log(searchData);

    try {
      const weatherResponse = await fetch(
        `${WEATHER_API_URL}/weather?q=${name}&appid=${WEATHER_API_KEY}`
      );
      const forecastResponse = await fetch(
        `${WEATHER_API_URL}/forecast?q=${name}&appid=${WEATHER_API_KEY}`
      );

      if (weatherResponse.ok && forecastResponse.ok) {
        const currentWeatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();
        const query = new URLSearchParams({
          currentWeatherData: JSON.stringify(currentWeatherData),
          forecastData: JSON.stringify(forecastData),
        }).toString();

        router.push(`/cities/${name}`);
      } else {
        console.error(
          "Failed to fetch weather data or forecast data for city:",
          name
        );
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  return (
    <div>
      <Search onSearchChange={handleOnSearchChange} />
      <Table />
    </div>
  );
}
