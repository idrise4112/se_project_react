import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function EditProfileModal({
  isOpen,
  onClose,
  currentUser,
  onUpdate,
  // EditProfileModalSubmit,
}) {
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
      const token = localStorage.getItem("jwt");
      const response = await fetch("/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, avatar }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const result = await response.json();
      const updatedUser = result.data || result;
      onUpdate(updatedUser);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Save Changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
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
      {/* {avatar && (
        <img
          src={avatar}
          alt="Avatar preview"
          className="modal__avatar-preview"
        />
      )} */}
    </ModalWithForm>
  );
}
