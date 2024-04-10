import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
// import Link from "@material-ui/core/Link";
import { TablePagination } from "@mui/material";
import { fetchCitiesData, City } from "@/app/api/route";
import CurrentWeather from "@/app/components/CurrentWeather";
import Forecast from "@/app/components/Forecast";

const rowsPerPageOptions = [5, 10, 25];

const CitiesTable: React.FC<{ CurrentWeather: any; forecast: any }> = ({
  CurrentWeather,
  forecast,
}) => {
  const [data, setData] = useState<City[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      const citiesData: City[] = await fetchCitiesData();
      setData(citiesData);
    }
    fetchData();
  }, []);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = data.filter((city) =>
    city.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <h1>A list of Cities.</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="w-[100px]">City</TableCell>
            <TableCell className="w-[50px]">Country</TableCell>
            <TableCell className="w-[50px]">Population</TableCell>
            <TableCell className="w-[100px]">Timezone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? filteredData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : filteredData
          ).map((row, index) => (
            <TableRow key={index}>
              {/* <Link
                onClick={() => {
                  if (CurrentWeather && forecast) {
                    return (
                      <>
                        <CurrentWeather data={CurrentWeather} />
                        <Forecast data={forecast} />
                      </>
                    );
                  }
                }}
              > */}
                <TableCell className="font-medium">{row.name}</TableCell>
              {/* </Link> */}
              <TableCell className="font-medium">{row.country}</TableCell>
              <TableCell className="font-medium">{row.population}</TableCell>
              <TableCell className="font-medium">{row.timezone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CitiesTable;
