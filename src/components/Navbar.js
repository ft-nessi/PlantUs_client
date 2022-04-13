import React from "react";
import { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import profileIcon from "../images/profile-icon.png";
import { API_BASE_URL } from "../consts";
import { AuthContext } from "../context/AuthProviderWrapper";
import axios from "axios";

// import "./Navbar.css";

export function Navbar() {
  const { user, removeUserFromContext, isLoading } = useContext(AuthContext);
  const navigate = useNavigate()

  const logout = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/logout`);
      console.log(response.data);
      removeUserFromContext();
      navigate("/");
    } catch (err) {
      console.log("There was an error logging out", err);
    }
  }; 

  return (
    <nav className="navbar">
      <div>
        {!user ? (
          <>
            <div className="auth">
              <button className="auth-login" to="/login">
                Login
              </button>
              <button className="auth-signup" to="/signup">
                Signup
              </button>
            </div>
          </>
        ) : !user.isUser ? (
          <>
            <Link to="/profile">
              <img height="24px" src={profileIcon} alt="Profile Icon" />
            </Link>
            <NavLink to="/profile/markedtrees">Marked Trees</NavLink>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/profile">
              <img height="24px" src={profileIcon} alt="Profile Icon" />
            </Link>
            {/* <NavLink src={profileIcon} to="/profile"></NavLink> */}
            <NavLink to="/profile/mytrees">My Trees</NavLink>
            <button onClick={logout}>Logout</button>
          </>
        )}
        <div className="nav-logo">
          {/* Logo is an actual React component */}
          {/* <Logo /> */}
        </div>
      </div>
    </nav>
  );
};
