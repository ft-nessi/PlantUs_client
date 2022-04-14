import React from "react";
import { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import profileIcon from "../images/profile-icon.png";
import logoWhite from "../images/logo-white.png";
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
      <div className="logo">
        <Link to="/">
          <img
            src={logoWhite}
            style={{ height: "3em", margin: "1em" }}
            alt="Profile Icon"
          />
        </Link>
      </div>
      <div>
        <div>
          {!user ? (
            <>
              <div className="auth">
                {/* <button type="button" className="auth-login" to="/login">
                Login
              </button> */}
                <button onClick={() => navigate("login", { replace: false })}>
                  Login
                </button>
                <button onClick={() => navigate("signup", { replace: false })}>
                  Signup
                </button>
              </div>
            </>
          ) : !user.isUser ? (
            <>
              <div className="auth">
                <Link to="/profile">
                  <img height="24px" src={profileIcon} alt="Profile Icon" />
                </Link>
                <NavLink to="/profile/markedtrees">Marked Trees</NavLink>
                <button onClick={logout}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <div className="auth">
                <Link to="/profile">
                  <img
                    height="24px"
                    src={profileIcon}
                    style={{ height: "2em", margin: "1.5em" }}
                    alt="Profile Icon"
                  />
                </Link>
                <NavLink to="/profile/mytrees" style={{ color: "white" }}>
                  My Trees
                </NavLink>
                <button className="auth" onClick={logout}>
                  Logout
                </button>
              </div>
            </>
          )}
          <div className="nav-logo">
            {/* Logo is an actual React component */}
            {/* <Logo /> */}
          </div>
        </div>
      </div>
    </nav>
  );
};
