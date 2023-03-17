import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";



// Display our Navbar
export default function Navbar() {
  const navigate = useNavigate();
  //Deletes the cookie when user logout
    const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <img src="../../R2Mongo.png" alt="..." />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
      <Button onClick={logout} variant="danger">Logout</Button>{' '}

            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
