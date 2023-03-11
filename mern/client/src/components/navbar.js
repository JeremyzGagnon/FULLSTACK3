import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {isLoggedIn ? (
          <NavLink className="navbar-brand" to="/">
          <img src="../../R2Mongo.png"alt="..."></img>
          </NavLink>
        ) : (
          <NavLink className="navbar-brand" to="#">
        <img style={{"width" : 50 + '%'}} src="../../R2Mongo.png"alt="..."></img>
        </NavLink>
        )}
        
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
            {isLoggedIn ? (
               <NavLink className="nav-link" to="/create">
               Create Agent
             </NavLink>
            ) : (
              <NavLink className="nav-link" to="#">
                Create Agent
              </NavLink>
            )}
             
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
