import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface City {
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  timezone: string;
  country: string;
}

export const GET = async (request: Request) => {
  try {
    const response = await axios.get(
      "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=population>1000000&limit=100&offset=0&refine=cou_name_en%3A%22India%22&refine=timezone%3A%22Asia%2FKolkata%22"
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
    return new Response(JSON.stringify(cities));
  } catch (error) {
    console.error("Error fetching cities data:", error);
    return new Response("Error fetching cities data", { status: 500 });
  }
};
