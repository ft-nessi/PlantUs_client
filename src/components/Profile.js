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
  const [userEditState, setUserEditState] = useState(user);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUpdatedUser() {
      try {
        const response = await axios.get(`${API_BASE_URL}/user`);
        setUserEditState(response.data.user);
        console.log(user);
      } catch (err) {
        console.log("Error in updating the tree on the server", err);
      }
    }
    getUpdatedUser();
  }, [user]);

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
    setUserEditState({
      ...userEditState,
      [event.target.name]: event.target.value,
    });
  };

  function handleCLick() {
    setIsEditingMotivation(true);
  }

  async function handleUserImage(event) {
    console.log("Event submit image", event);
    event.preventDefault();
    let image = event.target.imageUrl.files[0];
    let imageFormData = new FormData();
    imageFormData.append("imageUrl", image);

    async function sendImage() {
      let response = await axios.post(`${API_BASE_URL}/upload`, imageFormData, {
        withCredentials: true,
      });
      console.log("saved", response.data);
      setUserEditState(response.data.updatedUser);
    }
    sendImage();
  }

  async function handleSubmit(event) {
    console.log("Event motivation", event);

    event.preventDefault();
    setIsEditingMotivation(false);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/updatemotivation`,
        userEditState
      );
      console.log(userEditState.motivation, response.data.updatedUser);
      setUserEditState(response.data.updatedUser);
      console.log(user);
    } catch (err) {
      console.log("Error in updating the tree on the server", err);
    }
  }

  return (
    <div className="profile">
      <div className="welcome">
        <div className="welcome-section">
          {user && <h2>Welcome, {user.username}!</h2>}
          <h3>Foto</h3>
          {userEditState?.imageUrl ? (
            <img
              src={userEditState.imageUrl}
              alt="profile pic"
              style={{ height: "100px" }}
            />
          ) : null}
          <form
            className="profile-form"
            method="POST"
            onSubmit={handleUserImage}
            encType="multipart/form-data"
          >
            <input
              className="input"
              type="file"
              name="imageUrl"
              accept="image/png, image/jpg"
            />
            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="motivation">
          <h4>What's your personal motivation?</h4>
          {isEditingMotivation ? (
            <div>
              <input
                type="text"
                id="motivation"
                name="motivation"
                onChange={handleChangeMotivation}
              />
              <button className="motivation-save-btn" onClick={handleSubmit}>
                Save
              </button>
            </div>
          ) : (
            <>
              <h5 style={{ color: "grey", fontStyle: "italic" }}>
                "
                {!userEditState?.motivation
                  ? "We would love to hear about your motivation to plant trees."
                  : userEditState.motivation}
                "
              </h5>
              <button onClick={handleCLick}>Edit</button>
            </>
          )}
        </div>
      </div>
      <div className="welcome-trees">
        <h3>Please mark the location for new trees in the map:</h3>
      </div>

      <MyMap className="map" allTreeState={allTreeState} />
    </div>
  );
}
