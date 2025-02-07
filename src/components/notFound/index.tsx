import React from "react";
import { SIGNIN } from "../../global/routes";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center border border-dark p-5 bg-white shadow rounded">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="mt-3 text-dark">Oops! Page Not Found</h2>
        <p className="text-muted">
          Sorry, the page you are looking for might have been removed, had its
          name changed, or is temporarily unavailable.
        </p>
        <Link to={SIGNIN} className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
