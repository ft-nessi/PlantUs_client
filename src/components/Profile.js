import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import MyMap from "./MyMap";
import { API_BASE_URL } from "../consts";

export function Profile() {
  const [isEditingMotivation, setIsEditingMotivation] = useState(false);
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
          `${API_BASE_URL}/ranger/markedtrees/all`
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

  function handleCLick() {
    setIsEditingMotivation(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    async function updateProfile() {
      try{
        const response = await axios.put(`${API_BASE_URL}/updateprofile`, )
      }catch(err){

      }
    }
    
  }

  return (
    <div>
      {user && <h2>Welcome, {user.username}</h2>}
      <h3>Foto</h3>
      <div style={{ backgroundColor: "#FFEB99" }}>
        <h3>What's your personal motivation?</h3>
        <h5 style={{ color: "grey", fontStyle: "italic" }}>
          "{!user.motivation && "Please fill in your personal motivation"}
          {user.motivation && `${user.motivation}`}"
        </h5>
        {isEditingMotivation ? (
          <div>
          <input type="text" id="motivation" name="motivation" />
            <button onSubmit={handleSubmit}>Save</button>
          </div>
        ) : (
          <button onClick={handleCLick}>Edit</button>
        )}
      </div>

      <MyMap allTreeState={allTreeState} />
    </div>
  );
}
