import axios, { AxiosResponse } from "axios";
import { Request } from "express"
import { NextRequest, NextResponse } from "next/server";

interface City {
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  timezone: string;
  country: string;
}

// export const GET = async (req: Request) => {
//   try {

//     const apiUrl = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records";
//     const queryParams = new URLSearchParams(req.url.split("?")[1]); // Extract query parameters from request URL

// //     // Add default limit if not provided
//     if (!queryParams.has("limit")) {
//       queryParams.append("limit", "100");
//     }


//     const response = await axios.get(apiUrl, { params: queryParams });
//     const count = response.data.total_count;
//     console.log(count)
//     const cities: City[] = response.data.results.map((result: any) => ({
//       name: result.name,
//       latitude: result.coordinates.lat,
//       longitude: result.coordinates.lon,
//       population: result.population,
//       timezone: result.timezone,
//       country: result.cou_name_en,
//     }));

//     return NextResponse.json(cities, count);
//   } catch (error) {
//     console.error("Error fetching cities data:", error);
//     return NextResponse.error();
//   }
// };
export const GET = async (request: Request) => {
  try {
    const apiUrl = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records";
    const queryParams = new URLSearchParams(request.url.split("?")[1]); // Extract query parameters from request URL

    // Add default limit if not provided
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
