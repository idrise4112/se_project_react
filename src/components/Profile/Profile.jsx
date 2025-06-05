import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import "./Profile.css";

function Profile({ clothingItems, weatherData, onCardClick, handleAddClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          weatherData={weatherData}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
