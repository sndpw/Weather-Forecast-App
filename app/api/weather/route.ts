import axios from "axios";
import { NextRequest } from "next/server";

interface City {
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  timezone: string;
  country: string;
}

export const GET = async (request: NextRequest) => {
  try {
    const apiUrl =
      "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records";
    const queryParams = new URLSearchParams(request.url.split("?")[1]);

    if (!queryParams.has("limit")) {
      queryParams.append("limit", "100");
    }

    const response = await axios.get(apiUrl, { params: queryParams });

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
