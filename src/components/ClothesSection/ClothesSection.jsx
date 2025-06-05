import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { Link } from "react-router-dom";

// import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({
  weatherData,
  clothingItems,
  onCardClick,
  handleAddClick,
}) {
  if (!weatherData) return <p>Loading...</p>;
  return (
    <div className="clothes__section">
      <div className="clothes__items-text">
        <p>Your items</p>
        <button
          className="clothes__add"
          onClick={handleAddClick}
          aria-label="Add New"
        >
          + Add New
        </button>
      </div>
      <ul className="cards__list">
        {clothingItems
          .filter((item) => item.weather === weatherData.type)
          .map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
