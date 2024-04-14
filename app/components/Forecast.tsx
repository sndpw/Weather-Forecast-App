// "use client";
// import React from "react";
// import {
//   Accordion,
//   AccordionItem,
//   AccordionItemHeading,
//   AccordionItemButton,
//   AccordionItemPanel,
// } from "react-accessible-accordion";

// interface ForecastProps {
//   data: {
//     list: {
//       main: {
//         temp_max: number;
//         temp_min: number;
//         pressure: number;
//         humidity: number;
//         sea_level: number;
//         feels_like: number;
//       };
//       weather: {
//         icon: string;
//         description: string;
//       }[];
//       clouds: {
//         all: number;
//       };
//       wind: {
//         speed: number;
//       };
//     }[];
//   };
// }

// const WEEK_DAYS = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// const Forecast = ({ data }: ForecastProps) => {
//   const dayInAWeek = new Date().getDay();
//   const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
//     WEEK_DAYS.slice(0, dayInAWeek)
//   );

//   return (
//     <>
//       <label className="title">Daily</label>
//       <Accordion allowZeroExpanded>
//         {data.list.splice(0, 7).map((item, idx) => (
//           <AccordionItem key={idx}>
//             <AccordionItemHeading>
//               <AccordionItemButton>
//                 <div className="daily-item">
//                   <img
//                     src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
//                     alt="weather img"
//                   />
//                   <label className="day">{forecastDays[idx]}</label>
//                   <label className="description">
//                     {item.weather[0].description}
//                   </label>
//                   <label className="min-max">
//                     {Math.round(item.main.temp_max)}°C /
//                     {Math.round(item.main.temp_min)}°C
//                   </label>
//                 </div>
//               </AccordionItemButton>
//             </AccordionItemHeading>
//             <AccordionItemPanel>
//               <div className="daily-details-grid">
//                 <div className="daily-details-grid-item">
//                   <label>Pressure:</label>
//                   <label>{item.main.pressure}</label>
//                 </div>
//                 <div className="daily-details-grid-item">
//                   <label>Humidity:</label>
//                   <label>{item.main.humidity}</label>
//                 </div>
//                 <div className="daily-details-grid-item">
//                   <label>Clouds:</label>
//                   <label>{item.clouds.all}%</label>
//                 </div>
//                 <div className="daily-details-grid-item">
//                   <label>Wind speed:</label>
//                   <label>{item.wind.speed} m/s</label>
//                 </div>
//                 <div className="daily-details-grid-item">
//                   <label>Sea level:</label>
//                   <label>{item.main.sea_level}m</label>
//                 </div>
//                 <div className="daily-details-grid-item">
//                   <label>Feels like:</label>
//                   <label>{item.main.feels_like}°C</label>
//                 </div>
//               </div>
//             </AccordionItemPanel>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </>
//   );
// };

// export default Forecast;

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { convertKelvinToCelsius } from "../utils/convertKelvinToCelsius";
import { convertWindSpeed } from "../utils/convertWindSpeed";

interface ForecastProps {
  data: {
    list: {
      main: {
        temp_max: number;
        temp_min: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        feels_like: number;
      };
      weather: {
        icon: string;
        description: string;
      }[];
      clouds: {
        all: number;
      };
      wind: {
        speed: number;
      };
    }[];
  };
}

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }: ForecastProps) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, dayInAWeek + 5);

  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Daily
      </Typography>
      <div>
        {data.list.splice(0, 5).map((item, idx) => (
          <Accordion key={idx}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${idx}-content`}
              id={`panel${idx}-header`}
            >
              <div className="flex items-center">
                <img
                  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                  alt="weather img"
                  className="mr-2"
                />
                <Typography className="mr-2">{forecastDays[idx]}</Typography>
                <Typography className="mr-2">
                  {item.weather[0].description}
                </Typography>
                <Typography>
                  {convertKelvinToCelsius(item.main.temp_max)}°C /
                  {convertKelvinToCelsius(item.main.temp_min)}°C
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Typography>Pressure:</Typography>
                  <Typography>{item.main.pressure}</Typography>
                </div>
                <div>
                  <Typography>Humidity:</Typography>
                  <Typography>{item.main.humidity}</Typography>
                </div>
                <div>
                  <Typography>Clouds:</Typography>
                  <Typography>{item.clouds.all}%</Typography>
                </div>
                <div>
                  <Typography>Wind speed:</Typography>
                  <Typography>
                    {convertWindSpeed(item.wind.speed)} km/h
                  </Typography>
                </div>
                <div>
                  <Typography>Sea level:</Typography>
                  <Typography>{item.main.sea_level}m</Typography>
                </div>
                <div>
                  <Typography>Feels like:</Typography>
                  <Typography>
                    {convertKelvinToCelsius(item.main.feels_like)}°C
                  </Typography>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default Forecast;
