// components/EditProfileModal.jsx
import React, { useState, useEffect } from "react";
import "./EditProfileModal.css";

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

export default EditProfileModal;
