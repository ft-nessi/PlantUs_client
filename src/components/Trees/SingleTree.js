// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthProviderWrapper";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProviderWrapper";

export function SingleTree({ tree, updateSingleTree, deleteSingleTree }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formEdit, setFormEdit] = useState(tree);

  const user = useContext(AuthContext);

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
        <div style={{ backgroundColor: tree.ownerId ? "green" : "grey" }}>
          <h2>Name:{tree.treename}</h2>
          <p>Possible kinds: {tree.kind}</p>
          <p>
            location: {tree.location.coordinatesX},{tree.location.coordinatesY}
          </p>
          <button onClick={handleEdit}>Edit</button>
          {!user.isUser && <button onClick={handleDeleteTree}>Delete!</button>}
        </div>
      )}
      {isEditing && !user.isUser && (
        <form onSubmit={handleUpdateTree}>
          <div style={{ backgroundColor: tree.ownerId ? "green" : "grey" }}>
            <h2>Name:{tree.treename}</h2>
            <p>
              Possible kinds:
              <select name="kind">
                <option value="Please select">Please select</option>
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
          <div style={{ backgroundColor: "green" }}>
            <h2>
              Name:
              <input
                type="text"
                name="treename"
                onChange={handleChange}
                value={formEdit.treename}
              />
            </h2>
            <p>Possible kinds:{formEdit.kind}</p>
            <p>
              Location: [{formEdit.location.coordinatesX},
              {formEdit.location.coordinatesY}]
            </p>
            <p>
              Planted date:
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
