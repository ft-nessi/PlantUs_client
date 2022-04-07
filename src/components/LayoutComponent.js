// import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
export function LayoutComponent() {
  // const { user } = useContext(AuthContext);

  // const determineStyle = ({ isActive })
  return (
    <div className="container">
      <nav className="site-nav">
        <div className="navbar">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </div>
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
