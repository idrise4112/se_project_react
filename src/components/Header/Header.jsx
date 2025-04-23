import "./Header.css";
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
      <img className="header__logo" src={logo} alt="WTWR Logo" />
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
        <div className="header__avatar-container">
          <img className="header__avatar" src={avatar} alt="User Avatar" />
          <span className="header__username">Terrence Tegegne</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
