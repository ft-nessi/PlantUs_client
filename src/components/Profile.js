import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import MyMap from "./MyMap";

export function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log(AuthContext);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      {user && <h2>Welcome, {user.username}</h2>}
      <h3>Foto</h3>
      <h3>motive</h3>
      <MyMap />
    </div>
  );
}
