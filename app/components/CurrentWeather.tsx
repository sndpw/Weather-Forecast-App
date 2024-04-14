// import React from "react";

// interface CurrentWeatherProps {
//   data: {
//     city: string;
//     weather: {
//       icon: string;
//       description: string;
//     }[];
//     main: {
//       temp: number;
//       feels_like: number;
//       humidity: number;
//       pressure: number;
//     };
//     wind: {
//       speed: number;
//     };
//   };
// }

// const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
//   return (
//     <div className="weather">
//       <div className="top">
//         <div>
//           <p className="city">{data.city}</p>
//           <p className="weather-description">{data.weather[0].description}</p>
//         </div>
//         <img
//           src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
//           alt="weather img"
//         />
//       </div>
//       <div className="bottom">
//         <p className="temperature">{Math.round(data.main.temp)}°C</p>
//         <div className="details">
//           <div className="parameter-row">
//             <span className="parameter-label">Details</span>
//           </div>
//           <div className="parameter-row">
//             <span className="parameter-label">Feels like</span>
//             <span className="parameter-value">
//               {Math.round(data.main.feels_like)}°C
//             </span>
//           </div>
//           <div className="parameter-row">
//             <span className="parameter-label">Wind</span>
//             <span className="parameter-value">{data.wind.speed} m/s</span>
//           </div>
//           <div className="parameter-row">
//             <span className="parameter-label">Humidity</span>
//             <span className="parameter-value">{data.main.humidity}%</span>
//           </div>
//           <div className="parameter-row">
//             <span className="parameter-label">Pressure</span>
//             <span className="parameter-value">{data.main.pressure} hPa</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurrentWeather;

import React from "react";
import { Box, Typography } from "@mui/material";
import { convertKelvinToCelsius } from "../utils/convertKelvinToCelsius";
import { convertWindSpeed } from "../utils/convertWindSpeed";

interface CurrentWeatherProps {
  data: {
    city: string;
    weather: {
      icon: string;
      description: string;
    }[];
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    wind: {
      speed: number;
    };
  };
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <Box className="weather bg-white p-6 rounded-lg shadow-md">
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h6" className="city">
            {data.city}
          </Typography>
          <Typography variant="body1" className="weather-description">
            {data.weather[0].description}
          </Typography>
        </Box>
        <img
          src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          alt="weather img"
          className="w-12 h-12"
        />
      </Box>
      <Box className="mt-4">
        <Typography variant="h4" className="temperature">
          {convertKelvinToCelsius(data.main.temp)}°C
        </Typography>
        <Box className="details mt-2">
          <Typography variant="subtitle1" className="parameter-label">
            Details
          </Typography>
          <Box>
            <Typography className="parameter-label">Feels like</Typography>
            <Typography className="parameter-value">
              {convertKelvinToCelsius(data.main.feels_like)}°C
            </Typography>
          </Box>
          <Box>
            <Typography className="parameter-label">Wind</Typography>
            <Typography className="parameter-value">
              {convertWindSpeed(data.wind.speed)} km/h
            </Typography>
          </Box>
          <Box>
            <Typography className="parameter-label">Humidity</Typography>
            <Typography className="parameter-value">
              {data.main.humidity}%
            </Typography>
          </Box>
          <Box>
            <Typography className="parameter-label">Pressure</Typography>
            <Typography className="parameter-value">
              {data.main.pressure} hPa
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CurrentWeather;
