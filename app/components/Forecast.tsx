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
      <Typography variant="h5" style={{ padding: 15 }}>
        Forecast For 5 Days
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
                <Typography className="mr-5">{forecastDays[idx]}</Typography>
                <img
                  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                  alt="weather img"
                  className="mr-2"
                />
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
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <Typography>Pressure:</Typography>
                    <Typography>{item.main.pressure}hPa</Typography>
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
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default Forecast;
