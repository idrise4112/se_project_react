import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText = "save",
  title,
  onClose,
  isOpen,
  onSubmit,
}) {
  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content-image">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_image"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
