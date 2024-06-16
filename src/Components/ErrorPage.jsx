import React from "react";

import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="error-page">
      <h1>404 Page Not Found/Unable to fetch API Data</h1>
      <Link to="/">
        <button className="error-btn">Go Back to Home Page</button>
      </Link>
    </div>
  );
}
