
import "./App.css"
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { LayoutComponent } from "./components/LayoutComponent";
import { Login } from "./components/Login";
// import { Profile } from "./components/Profile";
import { Signup } from "./components/Signup";
import { Ranger } from "./components/Ranger";

export default function App() {
  useEffect(() => {
    // getCrsfToken();
  }, []);

  return (
    <Routes>
      <Route element={<LayoutComponent />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Ranger />} />
          {/* <Route path="/profile/markedTrees" element={} />
          <Route path="/profile/treedetails" element={} />
          <Route path="/profile/plantedTrees" element={} />
          <Route path="/profile/treedetails" element={} /> */}
      </Route>
    </Routes>
  );
}
