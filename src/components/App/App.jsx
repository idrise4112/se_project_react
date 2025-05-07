import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import currentTemperatureUnitContext from "../contexts/currentTemperatureUnitContext";
import AddItemModal from "./AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const [currentTemperatureUnit, setcurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setcurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    setClothingItems((prevItems) => [
      { name, link: imageUrl, weather },
      ...prevItems,
    ]);
    closeActiveModal();
  };
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <currentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} city={weatherData.city} />

          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            currentTemperatureUnit={currentTemperatureUnit}
            clothingItems={clothingItems}
          />
          <Footer />
          {activeModal === "add-garment" && (
            <AddItemModal
              onClose={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
          )}
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
          />
        </div>
      </div>
    </currentTemperatureUnitContext.Provider>
  );
}

export default App;
