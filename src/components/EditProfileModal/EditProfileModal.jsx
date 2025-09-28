import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfileModal({ isOpen, onClose, onUpdate }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onUpdate({ name, avatar });
    if (success) onClose();
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
      {/* Optional avatar preview */}
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
