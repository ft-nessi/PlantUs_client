
import "./App.css"
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { LayoutComponent } from "./components/LayoutComponent";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { AddNewTree } from "./components/Trees/AddNewTree";
import { RangerTreeList } from "./components/RangerTreeList";
import { Profile } from "./components/Profile";
import { AuthContext } from "./context/AuthProviderWrapper"

export default function App() {
  useEffect(() => {
    // getCrsfToken();
  }, []);

  const { user, isLoading } = useContext(AuthContext);
  console.log(user)

  if(isLoading) {
    return null;
  }

  const isLoggedIn = Boolean(user);
  const isUser = isLoggedIn && user.isUser;
  const isRanger = isLoggedIn && !user.isUser;

  return (
    <Routes>
      <Route element={<LayoutComponent />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        {isUser && <Route path= "/profile/mytrees" element={<RangerTreeList />} />}
        {isRanger && <Route path= "/profile/markedtrees" element={<RangerTreeList />}/>}
          <Route path="/profile/newtree" element={<AddNewTree />} />
          {/* <Route path="/profile/plantedTrees" element={} />
          <Route path="/profile/treedetails" element={} /> */}
      </Route>
    </Routes>
  );
}
