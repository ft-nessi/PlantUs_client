import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";


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
        {/* <div className="footer-left">
          <div><div></div></div>
        </div> */}
      </footer>
    </div>
  );
}
