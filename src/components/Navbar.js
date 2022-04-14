import React from "react";
import { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import profileIconDark from "../images/profile-icon-dark.png";
import logoDark from "../images/logo-minimal-dark.png";
import { API_BASE_URL } from "../consts";
import { AuthContext } from "../context/AuthProviderWrapper";
import axios from "axios";

// import "./Navbar.css";

export function Navbar() {
  const { user, removeUserFromContext, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

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
            src={logoDark}
            style={{ height: "2.5em", margin: "1em" }}
            alt="Logo Navbar"
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
                  <img height="1.5em" src={profileIconDark} alt="Profile Icon" />
                </Link>

                <button onClick={() => navigate("profile/markedtrees", { replace: false })}>
                    Marked Trees
                </button>
                {/* <NavLink
                  className="nav-link"
                  to="/profile/markedtrees"
                  style={{ textDecoration: "none", color: "darkslategrey" }}
                >
                  Marked Trees
                </NavLink> */}
                <button onClick={logout}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <div className="auth">
                <Link to="/profile">
                  <img
                    height="2em"
                    src={profileIconDark}
                    style={{ height: "1.5em", margin: "1.5em" }}
                    alt="Profile Icon"
                  />
                </Link>
                <NavLink
                  className="nav-link"
                  to="/profile/mytrees"
                  style={{ color: "white" }}
                >
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
}
