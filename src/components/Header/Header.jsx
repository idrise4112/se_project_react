import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, city }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
        <Link to="/profile" className="header__link">
          <div className="header__avatar-container">
            <img className="header__avatar" src={avatar} alt="User Avatar" />
            <span className="header__username">Idris Ellams</span>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
