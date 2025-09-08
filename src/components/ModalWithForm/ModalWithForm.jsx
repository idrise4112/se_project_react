import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText = "save",
  secondaryButtonText,
  onSecondaryClick,
  title,
  onClose,
  isOpen,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content-image">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_image"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__button-group">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {secondaryButtonText && (
              <button
                type="button"
                className="modal__submit modal__submit_secondary"
                onClick={onSecondaryClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
