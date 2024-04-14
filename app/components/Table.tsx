import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DataGrid,
  GridSlots,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Link from "next/link";

interface City {
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  timezone: string;
  country: string;
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
  const [hasMore, setHasMore] = useState<boolean>(true);

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
      <GridToolbarContainer style={{ padding: 8 }}>
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
    setHasMore(true);
    await fetchData(population, country);
  };

  return (
    <Box sx={{ height: 600, width: "auto" }}>
      <DataGrid
        sx={{ m: 3 }}
        rows={filteredCities}
        columns={[
          {
            field: "name",
            headerName: "City",
            flex: 1,
            renderCell: (params) => (
              <Link href={`/cities/${(params.row as City).name}`}>
                {(params.row as City).name}
              </Link>
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
