import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { tokenkey } from "../utils/auth";
import { SIGNIN, DASHBOARD } from "../global/routes";
import * as LogoutActions from "../components/login/loginActions";

const TopHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(LogoutActions.logoutRequest());
    localStorage.removeItem(tokenkey);
    navigate(SIGNIN);
  };
  
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <Link className="navbar-brand" to={DASHBOARD}>
          EASTERN
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="d-flex">
            <button
              className="btn btn-outline-danger"
              type="submit"
              onClick={handleLogOut}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopHeader;
