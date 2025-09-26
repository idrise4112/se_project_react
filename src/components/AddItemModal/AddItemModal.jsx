import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

export default function AddItemModal({
  isOpen,
  onClose,
  onAddItemModalSubmit,
  isLoading,
}) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit(values)
      .then(() => {
        setValues({ name: "", imageUrl: "", weather: "" });
      })
      .catch((error) => {
        console.error("Submission error:", error);
      });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? "Adding..." : "Add garment"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label
            key={type}
            htmlFor={type}
            className="modal__label modal__label_type_radio"
          >
            <input
              id={type}
              type="radio"
              className="modal__radio-input"
              name="weather"
              value={type}
              onChange={handleChange}
              checked={values.weather === type}
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
}
