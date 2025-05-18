import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ cardToDelete, onConfirmDelete, onClose }) {
  return (
    <div className="modal">
      <div className="modal__content">
        <p>Are you sure you want to delete {cardToDelete?.name}?</p>
        <button onClick={onClose} className="modal__cancel">
          Cancel
        </button>
        <button
          onClick={() => handleDeleteClick(cardToDelete)}
          className="modal__confirm"
        >
          Confirm Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
