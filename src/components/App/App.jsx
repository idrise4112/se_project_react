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
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { updateUserProfile } from "../../utils/api";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
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
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closeActiveModal = () => setActiveModal("");

  const switchModal = (target) => {
    closeActiveModal();
    setTimeout(() => setActiveModal(target), 0);
  };

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

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  const handleRegister = async (data) => {
    setIsLoading(true);
    try {
      await signup(data);
      await handleLogin({ email: data.email, password: data.password });
      closeActiveModal();
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      const res = await signin(data);
      localStorage.setItem("jwt", res.token);
      const user = await checkToken(res.token);
      setCurrentUser(user);
      setIsLoggedIn(true);
      closeActiveModal();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async ({ name, avatar }) => {
    try {
      const updatedUser = await updateUserProfile({ name, avatar });
      setCurrentUser(updatedUser);
      return true; //
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Error updating profile");
      return false;
    }
  };
  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      setCurrentUser(null);
      closeActiveModal();
    } catch (err) {
      console.error("Sign-out failed:", err);
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleAddItem = async ({ name, imageUrl, weather }) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      const newItem = { name, imageUrl, weather };
      const added = await addItem(newItem, token);
      setClothingItems((prev) => [added.data, ...prev]);
      closeActiveModal();
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setIsLoading(false);
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
    setIsLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      await deleteItem(id, token);
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== id)
      );
      closeActiveModal();
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");
    const isLiked = likes.some((id) => id === currentUser?._id);
    const request = isLiked ? removeCardLike : addCardLike;

    request(_id, token)
      .then((response) => {
        const updatedCard = response.data;
        setClothingItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedCard._id ? updatedCard : item
          )
        );
      })
      .catch((err) => console.error("Like toggle error:", err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{
          currentTemperatureUnit,
          handleToggleSwitchChange: () =>
            setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F")),
        }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={() => setActiveModal("add-garment")}
              city={weatherData.city}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={() => setActiveModal("register")}
              isLoggedIn={isLoggedIn}
              onSignOut={handleSignOut}
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
                    onCardLike={handleCardLike}
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
                      handleAddClick={() => setActiveModal("add-garment")}
                      onCardLike={handleCardLike}
                      onSignOut={handleSignOut}
                      isSigningOut={isSigningOut}
                      onUpdate={handleProfileUpdate}
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
                isLoading={isLoading}
              />
            )}

            {activeModal === "login" && (
              <LoginModal
                isOpen={true}
                onClose={closeActiveModal}
                onLogin={handleLogin}
                switchToRegister={() => switchModal("register")}
                isLoading={isLoading}
              />
            )}

            {activeModal === "register" && (
              <RegisterModal
                isOpen={true}
                onClose={closeActiveModal}
                onRegister={handleRegister}
                switchToLogIn={() => switchModal("login")}
                isLoading={isLoading}
              />
            )}

            {activeModal === "preview" && (
              <ItemModal
                onClose={closeActiveModal}
                card={selectedCard}
                activeModal={activeModal}
                handleDeleteClick={handleDeleteClick}
              />
            )}
            <DeleteConfirmationModal
              activeModal={activeModal}
              cardToDelete={cardToDelete}
              onConfirmDelete={handleConfirmDelete}
              onClose={closeActiveModal}
            />
            {activeModal === "preview" && selectedCard && (
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
    </CurrentUserContext.Provider>
  );
}

export default App;
