import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

// import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ weatherData, clothingItems, onCardClick }) {
  if (!weatherData) return <p>Loading...</p>;
  return (
    <div className="clothes-section">
      <div className="clothes-items__text">
        <p>Your items</p>
        <button className="clothes-add">+ Add New</button>
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
