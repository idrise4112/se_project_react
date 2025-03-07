import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card_name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card_image"
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
