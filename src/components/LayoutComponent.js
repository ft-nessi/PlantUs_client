import axios from "axios";
import { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import { AuthContext } from "../context/AuthProviderWrapper";

export function LayoutComponent() {
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
    <div className="container">
      <nav className={"navbar"}>
        {!user ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        ) : !user.isUser ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/profile/markedtrees">Marked Trees</NavLink>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/profile/mytrees">My Trees</NavLink>
            <button onClick={logout}>Logout</button>
          </>
        )}
        <div className="nav-logo">
          {/* Logo is an actual React component */}
          {/* <Logo /> */}
        </div>
      </nav>
      <Outlet />
      {/* <footer className="footer-container"> Made by Ironhackers </footer> */}
    </div>
  );
}
