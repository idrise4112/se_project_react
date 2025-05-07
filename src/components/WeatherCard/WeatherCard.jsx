import "./WeatherCard.css";
import { defaultWeatherOptions, weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData, currentTemperatureUnit }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length > 0) {
    weatherOption = filteredOptions[0];
  } else {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}{" "}
        &deg; {currentTemperatureUnit}
      </p>
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
