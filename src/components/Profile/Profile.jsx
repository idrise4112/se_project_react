import React, { useContext, useState, useEffect } from "react";
import "./Profile.css";

import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import { updateUserProfile } from "../../utils/api";

function Profile({
  clothingItems,
  weatherData,
  onCardClick,
  handleAddClick,
  onCardLike,
  onSignOut,
  isSigningOut,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(currentUser);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setUpdatedUser(currentUser);
  }, [currentUser]);

  const userItems = clothingItems.filter(
    (item) => item.owner === updatedUser?._id
  );

  const handleProfileUpdate = async ({ name, avatar }) => {
    setIsSubmitting(true);
    try {
      const newUserData = await updateUserProfile({ name, avatar });
      setUpdatedUser(newUserData);
      setEditModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onSignOut={onSignOut} isSigningOut={isSigningOut} />
        <button
          onClick={() => setEditModalOpen(true)}
          className="profile__edit-button"
          disabled={isEditModalOpen}
        >
          Change profile data
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
        onUpdate={handleProfileUpdate}
      />
    </div>
  );
}

export default Profile;
