import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import MyMap from "./MyMap";
import { API_BASE_URL } from "../consts";

export function Profile() {
  const [isEditingMotivation, setIsEditingMotivation] = useState(false);
  const [allTreeState, setAllTreeState] = useState([]);
  const { user, isLoading } = useContext(AuthContext);
  const [userEditState, setUserEditState] = useState(user)
  const navigate = useNavigate();
  
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

  const handleChangeMotivation = (event) => {
    setUserEditState({...userEditState, [event.target.name]: event.target.value },
      );
      
   
  };

  function handleCLick() {
    setIsEditingMotivation(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
      setIsEditingMotivation(false);
      try {
        const response = await axios.put(`${API_BASE_URL}/updatemotivation`, userEditState);
        console.log(userEditState.motivation, response.data.updatedUser);
        setUserEditState(response.data.updatedUser)
        console.log(user)
      } catch (err) {
        console.log("Error in updating the tree on the server", err);
    }

  }

  return (
    <div>
      {user && <h2>Welcome, {user.username}</h2>}
      <h3>Foto</h3>
      <div style={{ backgroundColor: "#FFEB99" }}>
        <h3>What's your personal motivation?</h3>
        {isEditingMotivation ? (
          <div>
            <input type="text" id="motivation" name="motivation" onChange={handleChangeMotivation}/>
            <button onClick={handleSubmit}>Save</button>
          </div>
        ) : (<><h5 style={{ color: "grey", fontStyle: "italic" }}>
            "{!userEditState.motivation ? ("Please fill in your personal motivation") : userEditState.motivation }"
          </h5>
          <button onClick={handleCLick}>Edit</button></>
        )}
      </div>

      <MyMap allTreeState={allTreeState} />
    </div>
  );
}
