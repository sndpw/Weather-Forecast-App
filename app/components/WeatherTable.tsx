// "use client";
// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { TablePagination } from "@mui/material";
// import Link from "next/link";

// interface WeatherTableProps {
//   data: any[]; // Define the data prop as an array of any type
// }
// // Sample data

// const rowsPerPageOptions = [5, 10, 25]; // Define rows per page options

// const WeatherTable: React.FC<WeatherTableProps> = ({ data }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]); // Default rows per page

//   const Data = data;

//   const handleChangePage = (
//     event: React.MouseEvent<HTMLButtonElement> | null,
//     newPage: number
//   ) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset page to 0 when changing rows per page
//   };

//   return (
//     <>
//       <Table>
//         <TableCaption>A list of Cities.</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">City Name</TableHead>
//             <TableHead className="w-[50px]"></TableHead>
//             <TableHead className="w-[100px]">Temperature</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {(rowsPerPage > 0
//             ? Data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//             : Data
//           ).map((row, index) => (
//             <TableRow key={index}>
//               <TableCell className="font-medium">
//                 <Link
//                   href={`/cities/${row.name}`}
//                   className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
//                 >
//                   {row.name}
//                 </Link>
//               </TableCell>
//               <TableCell>
//                 <img
//                   src={`http://openweathermap.org/img/w/${row.weather[0].icon}.png`}
//                   alt="wthr img"
//                 />
//               </TableCell>
//               <TableCell> {row.main.temp}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <TablePagination
//         rowsPerPageOptions={rowsPerPageOptions}
//         component="div"
//         count={data.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </>
//   );
// };

// export default WeatherTable;

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination, Autocomplete, TextField } from "@mui/material";
import Link from "next/link";

interface WeatherTableProps {
  data: any[]; // Define the data prop as an array of any type
}

const rowsPerPageOptions = [5, 10, 25];

const WeatherTable: React.FC<WeatherTableProps> = ({ data }) => {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchValue, setSearchValue] = useState<string>("");
  console.log(data);
  // const handleChangePage = (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   newPage: number
  // ) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const filteredData = data.filter((city) =>
  //   city.name.toLowerCase().includes(searchValue.toLowerCase())
  // );

  return (
    <>
      <Autocomplete
        options={data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        })}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search City"
            variant="outlined"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        )}
      />
      {/* <Table>
        <TableCaption>A list of Cities.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">City Name</TableHead>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="w-[100px]">Temperature</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(rowsPerPage > 0
            ? filteredData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : filteredData
          ).map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <Link
                  href={`/cities/${row.name}`}
                  className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
                >
                  {row.name}
                </Link>
              </TableCell>
              <TableCell>
                <img
                  src={`http://openweathermap.org/img/w/${row.weather[0].icon}.png`}
                  alt="weather img"
                />
              </TableCell>
              <TableCell>{row.main.temp}</TableCell>
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
      /> */}
    </>
  );
};

export default WeatherTable;
