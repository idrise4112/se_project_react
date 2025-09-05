import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  city,
  onLoginClick,
  onRegisterClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const renderAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          className="header__avatar"
          src={currentUser.avatar}
          alt="User Avatar"
        />
      );
    }
    const initial = currentUser?.name?.charAt(0).toUpperCase() || "?";
    return <div className="header__avatar-placeholder">{initial}</div>;
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {city || "Loading..."}
      </p>
      <div className="header__actions">
        <ToggleSwitch />

        <button
          className="header__button"
          onClick={handleAddClick}
          aria-label="Add New Garment"
        >
          +Add Clothes
        </button>

        {isLoggedIn ? (
          <Link to="/profile" className="header__link">
            <div className="header__avatar-container">
              {renderAvatar()}
              <span className="header__username">{currentUser?.name}</span>
            </div>
          </Link>
        ) : (
          <div className="header__auth-buttons">
            <button onClick={onRegisterClick}>Sign Up</button>
            <button onClick={onLoginClick}>Log In</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
