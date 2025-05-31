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
import currentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
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

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const handleAddItem = async ({ name, imageUrl, weather }) => {
    const newItem = { name, imageUrl, weather };
    const added = await addItem(newItem); // Assuming addItem makes an API request and returns the new item
    setClothingItems((prev) => [...prev, added]); // Keeping clothingItems in sync
    setActiveModal("");
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
    await deleteItem(id); // Ensure delete request happens first
    setClothingItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
    setActiveModal(""); // Close the modal after deletion
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <currentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange: () => {
          currentTemperatureUnit === "F"
            ? setCurrentTemperatureUnit("C")
            : setCurrentTemperatureUnit("F");
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
    </currentTemperatureUnitContext.Provider>
  );
}

export default App;
