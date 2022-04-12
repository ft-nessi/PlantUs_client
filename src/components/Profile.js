import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import MyMap from "./MyMap";
import { API_BASE_URL } from "../consts";

export function Profile() {
  const [allTreeState, setAllTreeState] = useState([]);
  const navigate = useNavigate();
  const { user, isLoading } = useContext(AuthContext);
  console.log(AuthContext);
  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    async function fetchAllTrees() {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/ranger/markedtrees`
        );
        console.log(data);
        if (!data.trees) return;
        setAllTreeState(data.trees);
      } catch (err) {
        console.log("There is an error");
        console.error(err);
        console.log(err.response.data);
      }
    }
    fetchAllTrees();
  }, [navigate]);

  return (
    <div>
      {user && <h2>Welcome, {user.username}</h2>}
      <h3>Foto</h3>
      <h3>motive</h3>
      <MyMap allTreeState={allTreeState} />
    </div>
  );
}
