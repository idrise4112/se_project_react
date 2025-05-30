import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  cardToDelete,
  onConfirmDelete,
  onClose,
  activeModal,
}) {
  return (
    <div
      className={`modal ${
        activeModal === "confirm-modal" ? "modal_opened" : ""
      }`}
    >
      <div className="modal__content">
        <img
          src={cardToDelete?.imageUrl}
          alt="Item to be deleted"
          className="modal__image"
        />

        <p>Are you sure you want to delete {cardToDelete?.name}?</p>

        <button onClick={onClose} className="modal__cancel">
          Cancel
        </button>
        <button
          type="button"
          className="modal__confirm"
          onClick={() => onConfirmDelete(cardToDelete._id)}
        >
          Confirm Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
