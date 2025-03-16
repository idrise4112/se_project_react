import "./WeatherCard.css";
import { defaultWeatherOptions, weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    // return (
    //   option.day === weatherData.isDay &&
    //   option.condition === weatherData.condition
    // );
    return {
      day: weatherData.isDay,
      condition: weatherData.condition,
    };
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = filteredOptions[0];
  } else {
    weatherOption =
      defaultWeatherOptions[weatherData.isNight ? "night" : "day"];
  }

  console.log(weatherOption);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"} time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
