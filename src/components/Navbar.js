import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileIconWhite from "../images/profile-icon-white.png";
import logoFontWhite from "../images/logo-font-white.png";
import { API_BASE_URL } from "../consts";
import { AuthContext } from "../context/AuthProviderWrapper";
import axios from "axios";

// import "./Navbar.css";

export function Navbar() {
  const { user, removeUserFromContext} = useContext(AuthContext);
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
            src={logoFontWhite}
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
                  <img
                    height="2em"
                    src={profileIconWhite}
                    style={{ height: "2em", margin: "0 2em 0 0" }}
                    alt="Profile Icon"
                  />
                </Link>
                <button
                  onClick={() =>
                    navigate("profile/markedtrees", { replace: false })
                  }
                >
                  Marked Trees
                </button>
                <button onClick={logout}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <div className="auth">
                <Link to="/profile">
                  <img
                    height="2em"
                    src={profileIconWhite}
                    style={{ height: "2em", margin: "0 2em 0 0" }}
                    alt="Profile Icon"
                  />
                </Link>
                <button
                  onClick={() =>
                    navigate("profile/mytrees", { replace: false })
                  }
                >
                  My Trees
                </button>
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
