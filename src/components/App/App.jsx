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
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { signup, signin, checkToken } from "../../utils/auth";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Weather fetch
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

  // Items fetch
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await getItems();
        const items = Array.isArray(result.data) ? result.data : [];
        setClothingItems(items.reverse());
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  // Token check
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, []);

  // Modal handlers
  const handleAddClick = () => setActiveModal("add-garment");
  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const closeActiveModal = () => setActiveModal("");

  // Auth handlers
  const handleRegister = async (data) => {
    try {
      await signup(data);
      await handleLogin({ email: data.email, password: data.password });
      closeActiveModal();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleLogin = async (data) => {
    try {
      const res = await signin(data);
      localStorage.setItem("jwt", res.token);
      const user = await checkToken(res.token);
      setCurrentUser(user);
      setIsLoggedIn(true);
      closeActiveModal();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Item handlers
  const handleAddItem = async ({ name, imageUrl, weather }) => {
    try {
      const token = localStorage.getItem("jwt");
      const newItem = { name, imageUrl, weather };
      const added = await addItem(newItem, token);
      setClothingItems((prev) => [added, ...prev]);
      closeActiveModal();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleDeleteClick = (card) => {
    setCardToDelete(card);
    setActiveModal("confirm-modal");
  };

  const handleConfirmDelete = async (id) => {
    try {
      const token = localStorage.getItem("jwt");
      await deleteItem(id, token);
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== id)
      );
      closeActiveModal();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange: () => {
          setCurrentTemperatureUnit((prevUnit) =>
            prevUnit === "F" ? "C" : "F"
          );
        },
      }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            city={weatherData.city}
            onLoginClick={handleLoginClick}
            onRegisterClick={handleRegisterClick}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />

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
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          {activeModal === "add-garment" && (
            <AddItemModal
              onAddItemModalSubmit={handleAddItem}
              onClose={closeActiveModal}
              isOpen={true}
            />
          )}

          {activeModal === "register" && (
            <RegisterModal
              isOpen={true}
              onClose={closeActiveModal}
              onRegister={handleRegister}
            />
          )}

          {activeModal === "login" && (
            <LoginModal
              isOpen={true}
              onClose={closeActiveModal}
              onLogin={handleLogin}
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
