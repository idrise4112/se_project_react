import avatar from "../../assets/avatar.png";
import "./SideBar.css";
function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">Idris Ellams</p>
    </div>
  );
}

export default SideBar;
