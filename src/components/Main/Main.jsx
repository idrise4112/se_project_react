import { useContext } from "react";

import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import "./Main.css";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  handleDeleteClick,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard
        weatherData={weatherData}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <section className="cards">
        <p className="cards__text">
          Today is
          {currentTemperatureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp.C}{" "}
          &deg; {currentTemperatureUnit}/ You may want to wear :
        </p>
        <ul className="cards__list">
          {clothingItems

            .filter((item) => {
              return item.weather === weatherData.type;
            })

            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                handleDeleteClick={handleDeleteClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
