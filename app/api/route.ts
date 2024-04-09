import axios, { AxiosResponse } from "axios";

export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY || "",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "ac253d845b2f0baa375baf3b55f8cb24";

export interface City {
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  timezone: string;
  country: string;
}

export async function fetchCitiesData(): Promise<City[]> {
  try {
    const response: AxiosResponse<any> = await axios.get(
      'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=population>1000000&limit=100&offset=0&refine=cou_name_en%3A"India"&refine=timezone%3A"Asia%2FKolkata"',
    );

    const cities: City[] = response.data.results.map((result: any) => {
      return {
        name: result.name,
        latitude: result.coordinates.lat,
        longitude: result.coordinates.lon,
        population: result.population,
        timezone: result.timezone,
        country: result.cou_name_en,
      };
    });

    return cities;
  } catch (error) {
    console.error("Error fetching cities data:", error);
    throw error;
  }
}
