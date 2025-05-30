import "./ItemModal.css";
import "../ModalWithForm/ModalWithForm.css";

const ItemModal = ({ activeModal, onClose, card, handleDeleteClick }) => {
  const handleClick = () => {
    handleDeleteClick(card);
  };

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close modal"
        ></button>
        <img
          src={card.imageUrl}
          alt={card.name || "Image preview"}
          className="modal__image"
        />
        <p className="modal__caption">{card.name}</p>
        <div className="modal__footer">
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            onClick={handleClick}
            type="button"
            className="modal__delete-item"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
