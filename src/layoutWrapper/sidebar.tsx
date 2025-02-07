import { NavLink } from "react-router-dom";
import { USERS, ACTIVITY_LOG } from "../global/routes";
import styles from "./styles.module.scss";

const Sidebar = () => {
  return (
    <div
      className="left-panel"
      style={{
        backgroundColor: "#007bff",
        padding: "10px",
        minHeight: "100vh",
      }}
    >
      <ul className="nav-links" style={{ listStyle: "none", padding: 0 }}>
        <li>
          <NavLink
            to={USERS}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <i className="fas fa-users p-2"></i>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ACTIVITY_LOG}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <i className="fas fa-list p-2"></i>
            Activity Log
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
