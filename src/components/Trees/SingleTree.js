// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthProviderWrapper";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProviderWrapper";

export function SingleTree({ tree, updateSingleTree, deleteSingleTree }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formEdit, setFormEdit] = useState(tree);

  const { user } = useContext(AuthContext);

  // console.log(tree);
  const handleUpdateTree = async (e) => {
    e.preventDefault();

    try {
      await updateSingleTree(tree._id, formEdit);
      setFormError(null);
      setIsEditing(false);
    } catch (e) {
      setFormError(e);
    }
  };
  const handleDeleteTree = () => {
    deleteSingleTree(tree._id);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    if (name === "coordinatesX" || name === "coordinatesY") {
      setFormEdit({
        ...formEdit,
        location: { ...formEdit.location, [name]: event.target.value },
      });
    } else {
      setFormEdit({ ...formEdit, [name]: event.target.value });
    }
  };

  const handleEdit = (e) => {
    setIsEditing(true);
  };

  return (
    <div>
      {!isEditing && (
        <div
          className="tree-entry"
          style={{
            backgroundColor: tree.ownerId ? "#ffeb99" : "#C2E7D9",
          }}
        >
          <h4>Name: {tree.treename}</h4>
          <p>Kind: {tree.kind}</p>
          <p>
            Location: [ {tree.location.coordinatesX} ,
            {tree.location.coordinatesY} ]
          </p>
          Planted Date :{" "}
          {!tree.plantedDate ? (
            <span style={{ fontStyle: "italic" }}>
              "Please edit the planted Date"
            </span>
          ) : (
            tree.plantedDate.split("T")[0]
          )}
          <br />
          <button onClick={handleEdit}>Edit</button>
          {!user.isUser && <button onClick={handleDeleteTree}>Delete!</button>}
        </div>
      )}
      {isEditing && !user.isUser && (
        <form onSubmit={handleUpdateTree}>
          <div
            style={{ backgroundColor: tree.ownerId ? "#ffeb99" : "#C2E7D9" }}
          >
            <h4>Name: {tree.treename}</h4>
            <p>
              Kind:
              <select name="kind" onChange={handleChange}>
                <option value={tree.kind}>{tree.kind}</option>
                <option value="Maple tree">Maple tree</option>
                <option value="Oak">Oak</option>
                <option value="Pine">Pine</option>
                <option value="Spruce">Spruce</option>
              </select>
            </p>
            <p>
              Location: [<label htmlFor="coordinatesX">X: </label>
              <input
                type="number"
                step="0.01"
                id="coordinatesX"
                name="coordinatesX"
                value={formEdit.location.coordinatesX}
                onChange={handleChange}
              />
              , <label htmlFor="coordinatesY">Y: </label>
              <input
                type="number"
                step="0.01"
                name="coordinatesY"
                id="coordinatesY"
                value={formEdit.location.coordinatesY}
                onChange={handleChange}
              />
              ]
            </p>

            <button type="submit">Save</button>
            {formError && formError.message}
          </div>
        </form>
      )}
      {isEditing && user.isUser && (
        <form onSubmit={handleUpdateTree}>
          <div style={{ backgroundColor: "#ffeb99" }}>
            <h4>
              Name:
              <input
                type="text"
                name="treename"
                onChange={handleChange}
                value={formEdit.treename}
              />
            </h4>
            <p>Kind: {formEdit.kind}</p>
            <p>
              Location: [ {formEdit.location.coordinatesX} ,{" "}
              {formEdit.location.coordinatesY} ]
            </p>
            <p>
              Planted date:{" "}
              <input
                type="date"
                name="plantedDate"
                onChange={handleChange}
                value={formEdit.plantedDate}
              />
            </p>
            <button type="submit">Save</button>
            {formError && formError.message}
          </div>
        </form>
      )}
    </div>
  );
}
