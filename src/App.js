
import "./App.css"
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { LayoutComponent } from "./components/LayoutComponent";
import { Login } from "./components/Login";
// import { Profile } from "./components/Profile";
import { Signup } from "./components/Signup";
import { Ranger } from "./components/Ranger";
import { AddNewTree } from "./components/Trees/AddNewTree";
// import { Trees } from "./components/Trees/index";
import { RangerTreeList } from "./components/RangerTreeList";

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
          <Route path="/profile/markedTrees" element={<RangerTreeList />} />
          <Route path="/profile/markedTrees/newtree" element={<AddNewTree />} />
          <Route path="/profile/treedetails" element={<AddNewTree />} />
          {/* <Route path="/profile/plantedTrees" element={} />
          <Route path="/profile/treedetails" element={} /> */}
      </Route>
    </Routes>
  );
}
