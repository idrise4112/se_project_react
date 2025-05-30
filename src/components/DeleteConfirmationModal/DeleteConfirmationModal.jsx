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
      <div className="modal__content-confirm">
        <p className="modal__confirm-text">
          Are you sure you want to delete {cardToDelete?.name}? This action is
          irreversible.
        </p>

        <button onClick={onClose} className="modal__cancel">
          Cancel
        </button>
        <button
          type="button"
          className="modal__confirm"
          onClick={() => onConfirmDelete(cardToDelete._id)}
        >
          Yes, delete item
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
