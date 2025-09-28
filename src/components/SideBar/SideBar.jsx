import "./SideBar.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import defaultAvatar from "../../assets/avatar.png";

function SideBar() {
  const currentUser = useContext(CurrentUserContext);

  const avatarSrc = currentUser?.avatar || defaultAvatar;
  const displayName = currentUser?.name || "Guest";

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatarSrc} alt="User avatar" />
      <p className="sidebar__username">{displayName}</p>
    </div>
  );
}

export default SideBar;
