import React, { useContext, useState, useEffect } from "react";
import "./Profile.css";

import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import SideBar from "../SideBar/SideBar.jsx";

// Context
import CurrentUserContext from "../../contexts/CurrentUserContext";

// Modal Component
const EditProfileModal = ({ isOpen, onClose, currentUser, onUpdate }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, avatar }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedUser = await response.json();
      onUpdate(updatedUser);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="modal__label">
            Name
            <input
              id="name"
              type="text"
              className="modal__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label htmlFor="avatar" className="modal__label">
            Avatar URL
            <input
              id="avatar"
              type="url"
              className="modal__input"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
            />
          </label>

          {avatar && (
            <img
              src={avatar}
              alt="Avatar preview"
              className="modal__avatar-preview"
            />
          )}

          <button
            type="submit"
            className="modal__button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
          <button type="button" className="modal__cancel" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

// Main Profile Component
function Profile({
  clothingItems,
  weatherData,
  onCardClick,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(currentUser);

  useEffect(() => {
    setUpdatedUser(currentUser);
  }, [currentUser]);

  const userItems = clothingItems.filter(
    (item) => item.owner === updatedUser?._id
  );

  const handleProfileUpdate = (newUserData) => {
    setUpdatedUser(newUserData);
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <button
          onClick={() => setEditModalOpen(true)}
          className="profile__edit-button"
          disabled={isEditModalOpen}
        >
          Edit Profile
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
        currentUser={updatedUser}
        onUpdate={handleProfileUpdate}
      />
    </div>
  );
}

export default Profile;
