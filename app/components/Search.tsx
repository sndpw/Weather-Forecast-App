import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "@/app/utils/apis";
import { Card, Typography } from "@mui/material";

const Search = ({
  onSearchChange,
}: {
  onSearchChange: (searchData: any) => void;
}) => {
  const [search, setSearch] = useState<any>(null);

  const loadOptions = (inputValue: string) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city: any) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData: any) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row">
        <section className="md:w-1/2 md:pr-4">
          <div className="py-5 md:px-6">
            <div className="wrapper grid grid-cols-1 gap-5 md:gap-8">
              <div className="flex flex-col justify-center">
                <h1 className="h1-bold">Welcome to Weather Forecast</h1>
                <p className="p-regular-20 md:p-regular-24">
                  Discover the World's Weather at Your Fingertips. Simply Search
                  for Your City and Uncover Comprehensive Forecasts Tailored
                  Just for You.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="md:w-1/2 mb-48 md:mb-0">
          <div className="px-2 md:p-6">
            <AsyncPaginate
              placeholder="Search..."
              debounceTimeout={600}
              value={search}
              onChange={handleOnChange}
              loadOptions={loadOptions}
            />
          </div>
        </section>
      </div>
    </Card>
  );
};

export default Search;
