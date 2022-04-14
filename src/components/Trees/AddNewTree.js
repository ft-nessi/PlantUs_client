import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../consts";

export function AddNewTree({ setAllTrees }) {
  const navigate = useNavigate();
  const [treeState, setTreeState] = useState({});

  function handleChange(event) {
    let value = event.target.value;
    setTreeState({ ...treeState, [event.target.name]: value });
  }

  const handleSubmitTree = async (event) => {
    event.preventDefault();
    if (treeState.kind.length === 0) {
      alert("Please select the possible kinds of the tree!");
      return;
    }
    try {
      console.log(treeState);
      const response = await axios.post(
        `${API_BASE_URL}/ranger/markedtrees`,
        treeState,
        { withCredentials: true }
      );
      console.log(response.data);
      // setAllTrees((oldTrees) => {
      //   return [...oldTrees, response.data.tree];
      // });
      setTreeState({});
      navigate("/profile/markedtrees");
    } catch (err) {
      console.log("Error in updating the tree list on the server!", err);
    }
  };

  return (
    <div className="newtree-container">
      <div className="newtree-description">
        <h2>
          Please enter the kind of the tree and the X- and Y-coordinates to add
          a tree in the map.
        </h2>
      </div>
      <div className="newtree-form-kind">
        <form className="newtree-form" onSubmit={handleSubmitTree}>
          <label className="label" htmlFor="kind">
            Kind:{" "}
          </label>
          <select name="kind" id="kind" onChange={handleChange}>
            <option value="">Please select</option>
            <option value="Maple tree">Maple tree</option>
            <option value="Oak">Oak</option>
            <option value="Pine">Pine</option>
            <option value="Spruce">Spruce</option>
          </select>
          <br />

          <div className="newtree-form-x">
            <label className="label" htmlFor="coordinatesX">
              X-coordinate:{" "}
            </label>
            <input
              type="number"
              step="0.01"
              id="coordinatesX"
              name="coordinatesX"
              onChange={handleChange}
            />
            <br />
          </div>
          <div className="newtree-form-y">
            <label className="label" htmlFor="coordinatesY">
              Y-coordinate:{" "}
            </label>
            <input
              type="number"
              step="0.01"
              id="coordinatesY"
              name="coordinatesY"
              onChange={handleChange}
            />
            {/* <br /> */}
          </div>
          <button type="submit">Add new tree!</button>
        </form>
      </div>
    </div>
  );
}
