import { Box, Card, Typography } from "@mui/material";
import { convertKelvinToCelsius } from "../utils/convertKelvinToCelsius";
import { convertWindSpeed } from "../utils/convertWindSpeed";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";
import Divider from "@material-ui/core/Divider";

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

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  return (
    <Card
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "space-around",
        alignContent: "center",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Typography variant="h6" className="City">
          {data.city}
        </Typography>
        <img
          src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          alt="weather img"
          className="w-22 h-24"
        />
        <Typography variant="h6" className="parameter-label">
          {data.weather[0].description}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" className="temperature">
          {convertKelvinToCelsius(data.main.temp)}°C
        </Typography>
        <Typography className="parameter-label">Temperature</Typography>
      </div>
      <Divider orientation="vertical" flexItem />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography className="parameter-label">Feels like</Typography>
        <Typography className="parameter-value">
          {convertKelvinToCelsius(data.main.feels_like)}°C
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MdAir size={36} />
        <Typography className="parameter-label">Wind</Typography>
        <Typography>{convertWindSpeed(data.wind.speed)} km/h</Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FiDroplet size={36} color="blue" />
        <Typography className="parameter-label">Humidity</Typography>
        <Typography>{data.main.humidity}%</Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ImMeter size={36} />
        <Typography className="parameter-label">Pressure</Typography>
        <Typography>{data.main.pressure} hPa</Typography>
      </div>
    </Card>
  );
};

export default CurrentWeather;
