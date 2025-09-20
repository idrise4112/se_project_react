import { useContext } from "react";
import PropTypes from "prop-types";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import defaultAvatar from "../../assets/avatar.png";

function SideBar({ onSignOut, isSigningOut = false }) {
  const currentUser = useContext(CurrentUserContext);

  const avatarSrc = currentUser?.avatar || defaultAvatar;
  const displayName = currentUser?.name || "Guest";

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatarSrc} alt="User avatar" />
      <p className="sidebar__username">{displayName}</p>
      <button
        type="button"
        className="sidebar__logout-button"
        onClick={onSignOut || (() => {})}
        disabled={isSigningOut}
        aria-label="Log Out"
      >
        {isSigningOut ? "Logging Out..." : "Log Out"}
      </button>
    </div>
  );
}

SideBar.propTypes = {
  onSignOut: PropTypes.func,
  isSigningOut: PropTypes.bool,
};

export default SideBar;
