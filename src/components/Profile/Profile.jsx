import React, { useContext, useState } from "react";
import "./Profile.css";

import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  clothingItems,
  weatherData,
  onCardClick,
  handleAddClick,
  onCardLike,
  onSignOut,
  isSigningOut,
  onUpdate,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <button
          onClick={() => setEditModalOpen(true)}
          className="profile__edit-button"
          disabled={isEditModalOpen}
        >
          Change profile data
        </button>
        <button
          type="button"
          className="profile__logout-button"
          onClick={onSignOut}
          disabled={isSigningOut}
          aria-label="Log Out"
        >
          {isSigningOut ? "Logging Out..." : "Log Out"}
        </button>
      </section>

      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          weatherData={weatherData}
          clothingItems={userItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdate={onUpdate}
      />
    </div>
  );
}

export default Profile;
