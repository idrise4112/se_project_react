import "./ItemModal.css";
import "../ModalWithForm/ModalWithForm.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemModal = ({ activeModal, onClose, card, handleDeleteClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card?.owner === currentUser?._id;

  const handleDelete = (e) => {
    e.stopPropagation();
    handleDeleteClick(card);
  };

  // Debug log to confirm props
  console.log("ItemModal props:", { activeModal, card });

  // Prevent rendering if modal isn't active or card is missing
  if (activeModal !== "preview" || !card) return null;

  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close modal"
        />
        <img
          src={card.imageUrl}
          alt={card.name || "Image preview"}
          className="modal__image"
        />
        <p className="modal__caption">{card.name}</p>
        <div className="modal__footer">
          <p className="modal__weather">Weather: {card.weather}</p>
          {isOwn && (
            <button
              onClick={handleDelete}
              type="button"
              className="modal__delete-item"
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
