import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Profile from "../Profile/Profile";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItem, deleteItem } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Fetch weather data with error handling
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeather(coordinates, APIkey);
        setWeatherData(filterWeatherData(data));
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherData();
  }, []);

  // Fetch clothing items with error handling
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setClothingItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  // const handleAddClick = () => {
  //   setActiveModal("add-garment");
  // };

  const handleAddItem = async ({ name, imageUrl, weather }) => {
    try {
      const newItem = { name, imageUrl, weather };
      const added = await addItem(newItem);
      setClothingItems((prev) => [...prev, added]);
      closeActiveModal();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    setCardToDelete(card);
    setActiveModal("confirm-modal");
  };

  const handleConfirmDelete = async (id) => {
    try {
      await deleteItem(id);
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== id)
      );
      closeActiveModal();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const closeActiveModal = () => {
    try {
      setActiveModal("");
    } catch (error) {
      console.error("Error closing modal:", error);
    }
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange: () => {
          try {
            setCurrentTemperatureUnit((prevUnit) =>
              prevUnit === "F" ? "C" : "F"
            );
          } catch (error) {
            console.error("Error toggling temperature unit:", error);
          }
        },
      }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} city={weatherData.city} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleDeleteClick={handleDeleteClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                />
              }
            />
          </Routes>
          <Footer />
          {activeModal === "add-garment" && (
            <AddItemModal
              onAddItemModalSubmit={handleAddItem}
              onClose={closeActiveModal}
              isOpen={activeModal === "add-garment"}
            />
          )}
          <DeleteConfirmationModal
            activeModal={activeModal}
            cardToDelete={cardToDelete}
            onConfirmDelete={handleConfirmDelete}
            onClose={closeActiveModal}
          />
          {activeModal === "preview" && (
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              handleDeleteClick={handleDeleteClick}
            />
          )}
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
