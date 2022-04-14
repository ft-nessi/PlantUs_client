import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import logoWhite from "../images/logo-white.png";
import profileIcon from "../images/profile-icon.png";


export function LayoutComponent() {
  return (
    <div className="container">
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="outlet-container">
        <Outlet />
      </div>

      <footer className="footer-container">
        <p> Made by Ironhackers</p>
        <div>
          <img className="logo-footer" src={profileIcon} alt="Logo" />
        
        </div>
        {/* <div className="footer-left">
          <div><div></div></div>
        </div> */}
      </footer>
    </div>
  );
}
