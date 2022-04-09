import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../../consts";

export function AddNewTree({ setMarkedTrees }) {
  const [newTree, setNewTree] = useState({ treename: "New tree", planted: false });
  const handleTreeInput = (event) => {
    setNewTree({ ...newTree, [event.target.name]: event.target.value });
  };

  const handleAddNewTree = async () => {
    if (newTree.location.length === 0) {
      alert("Please enter the location of the tree!");
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/markedtrees`, newTree);
      console.log(response.data);
      setMarkedTrees((oldTrees) => {
        return [...oldTrees, response.data.tree];
      });
    } catch (err) {
      console.log("Error in updating the tree list on the server!", err);
    }
  };
  return (
    <div>
      <input
        name="treename"
        value={newTree.treename}
        onChange={handleTreeInput}
      />
      <button onClick={handleAddNewTree}>Add new tree!</button>
    </div>
  );
}
