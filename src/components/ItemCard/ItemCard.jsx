import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = (e) => {
    console.log(item);
    e.stopPropagation();
    onCardLike(item);
  };

  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="card" key={item._id}>
      <div className="card__image-container" onClick={handleCardClick}>
        <img className="card__image" src={item.imageUrl} alt={item.name} />
        <div className="card__overlay">
          <h2 className="card__name">{item.name}</h2>

          <button
            className={itemLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
            aria-label="Like item"
          />
        </div>
      </div>
    </li>
  );
}

export default ItemCard;
