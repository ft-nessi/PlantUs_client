import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import logoWhite from "../images/logo-minimal-white.png";

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
        <div className="footer-left">
          <p> Made by Ironhackers</p>
        </div>
        <div className="logo-footer">
          <img className="logo-white-footer" src={logoWhite} alt="Logo" />
        </div>
        <div className="footer-right">
          <p>Vanessa Fernandes Branco <br/>
          Lysann Küttner</p>
        </div>
      </footer>
    </div>
  );
}
