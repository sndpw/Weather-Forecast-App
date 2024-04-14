

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   DataGrid,
//   GridSlots,
//   GridToolbarContainer,
//   GridToolbar,
//   GridToolbarQuickFilter,
// } from "@mui/x-data-grid";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { useDemoData } from "@mui/x-data-grid-generator";
// import { Box } from "@mui/material";
// import { DataGridPro, GridLogicOperator } from '@mui/x-data-grid-pro';

// interface City {
//   name: string;
//   latitude: number;
//   longitude: number;
//   population: number;
//   timezone: string;
//   country: string;
// }

// const VISIBLE_FIELDS = ["name", "country", "timezone", "population"];

// interface CustomToolbarProps {
//   setFilterButtonEl: React.Dispatch<
//     React.SetStateAction<HTMLButtonElement | null>
//   >;
// }

// interface Filter {
//   population?: number;
//   country?: string;
// }

// export default function Table() {
//   const [filterButtonEl, setFilterButtonEl] =
//     useState<HTMLButtonElement | null>(null);
//   const [cities, setCities] = useState<City[]>([]);
//   const [filteredCities, setFilteredCities] = useState<City[]>([]);
//   const [offset, setOffset] = useState<number>(0);
//   const [limit, setLimit] = useState<number>(100);
//   const [hasMore, setHasMore] = useState<boolean>(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async (population?: number, country?: string) => {
//     let apiUrl = "api/weather";
//     const params = new URLSearchParams();

//     if (population) {
//       params.append("where", `population > ${population}`);
//     }

//     if (country) {
//       params.append("refine", `cou_name_en:"${country}"`);
//     }

//     params.append("offset", offset.toString());
//     // params.append("limit", limit.toString());

//     apiUrl += `?${params.toString()}`;

//     try {
//       const response = await axios.get<City[]>(apiUrl);

//       const newCities = response.data.map((city, index) => ({
//         ...city,
//         id: `${city.name}-${city.latitude}-${city.longitude}-${index}`,
//       }));

//       setCities(newCities);
//       setFilteredCities(newCities);
//     } catch (error) {
//       console.error("Error fetching cities data:", error);
//     }
//   };

//   const CustomToolbar = () => {
//     const [population, setPopulation] = useState<number | undefined>(undefined);
//     const [country, setCountry] = useState<string | undefined>(undefined);

//     const handleApplyFilters = () => {
//       handleFilterClick({ population, country });
//     };

//     return (
//       <GridToolbarContainer>
//         <GridToolbarQuickFilter />

//         <TextField
//           label="Population"
//           type="number"
//           value={population}
//           onChange={(e) => setPopulation(parseInt(e.target.value))}
//           InputProps={{ inputProps: { min: 0 } }}
//           style={{ marginRight: 10 }}
//         />
//         <TextField
//           label="Country"
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//           style={{ marginRight: 10 }}
//         />
//         <Button variant="contained" onClick={handleApplyFilters}>
//           Apply Filters
//         </Button>
//       </GridToolbarContainer>
//     );
//   };

//   const handleFilterClick = async ({ population, country }: Filter) => {
//     setOffset(0);
//     setHasMore(true);
//     await fetchData(population, country);
//   };

//   return (
//     <Box sx={{ height: 400, width: 1 }}>
//       <DataGrid
//         rows={filteredCities}
//         columns={[
//           { field: "name", headerName: "City", flex: 1 },
//           { field: "country", headerName: "Country", flex: 1 },
//           { field: "timezone", headerName: "Timezone", flex: 1 },
//           { field: "population", headerName: "Population", flex: 1 },
//         ]}
//         slots={{
//           toolbar: CustomToolbar as GridSlots["toolbar"],
//         }}
//         slotProps={{
//           panel: {
//             anchorEl: filterButtonEl,
//           },
//           toolbar: {
//             showQuickFilter: true,
//             setFilterButtonEl,
//           },
//         }}
//       />
//     </Box>
//   );
// }

// Table.tsx
import { WEATHER_API_URL, WEATHER_API_KEY } from "@/app/utils/apis";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  DataGrid,
  GridSlots,
  GridToolbarContainer,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

interface City {
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  timezone: string;
  country: string;
}

const VISIBLE_FIELDS = ["name", "country", "timezone", "population"];

interface CustomToolbarProps {
  setFilterButtonEl: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
}

interface Filter {
  population?: number;
  country?: string;
}

export default function Table() {
  const [filterButtonEl, setFilterButtonEl] =
    useState<HTMLButtonElement | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(100);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (population?: number, country?: string) => {
    let apiUrl = "api/weather";
    const params = new URLSearchParams();

    if (population) {
      params.append("where", `population > ${population}`);
    }

    if (country) {
      params.append("refine", `cou_name_en:"${country}"`);
    }

    params.append("offset", offset.toString());
    // params.append("limit", limit.toString());

    apiUrl += `?${params.toString()}`;

    try {
      const response = await axios.get<City[]>(apiUrl);

      const newCities = response.data.map((city, index) => ({
        ...city,
        id: `${city.name}-${city.latitude}-${city.longitude}-${index}`,
      }));

      setCities(newCities);
      setFilteredCities(newCities);
    } catch (error) {
      console.error("Error fetching cities data:", error);
    }
  };

  const CustomToolbar = () => {
    const [population, setPopulation] = useState<number | undefined>(undefined);
    const [country, setCountry] = useState<string | undefined>(undefined);

    const handleApplyFilters = () => {
      handleFilterClick({ population, country });
    };

    return (
      <GridToolbarContainer>
        <GridToolbarQuickFilter />

        <TextField
          label="Population"
          type="number"
          value={population}
          onChange={(e) => setPopulation(parseInt(e.target.value))}
          InputProps={{ inputProps: { min: 0 } }}
          style={{ marginRight: 10 }}
        />
        <TextField
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <Button variant="contained" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </GridToolbarContainer>
    );
  };

  const handleFilterClick = async ({ population, country }: Filter) => {
    setOffset(0);
    setHasMore(true);
    await fetchData(population, country);
  };

  const handleCityClick = async (city: City) => {
    const { name } = city;
  
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
  
        // Convert route object into string
        const query = new URLSearchParams({
          currentWeatherData: JSON.stringify(currentWeatherData),
          forecastData: JSON.stringify(forecastData),
        }).toString();
  
        // Navigate to weather details page with city name and weather data as query parameters
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
    <Box sx={{ height: 400, width: 1 }}>
      <DataGrid
        rows={filteredCities}
        columns={[
          {
            field: "name",
            headerName: "City",
            flex: 1,
            renderCell: (params) => (
              <a onClick={() => handleCityClick(params.row as City)}>
                {(params.row as City).name}
              </a>
            ),
          },
          { field: "country", headerName: "Country", flex: 1 },
          { field: "timezone", headerName: "Timezone", flex: 1 },
          { field: "population", headerName: "Population", flex: 1 },
        ]}
        slots={{
          toolbar: CustomToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          panel: {
            anchorEl: filterButtonEl,
          },
          toolbar: {
            showQuickFilter: true,
            setFilterButtonEl,
          },
        }}
      />
    </Box>
  );
}
