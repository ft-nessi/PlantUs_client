// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthProviderWrapper";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProviderWrapper";

export function SingleTree({ tree, updateSingleTree, deleteSingleTree, errorState }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formEdit, setFormEdit] = useState(tree);

  const user = useContext(AuthContext);

  console.log(tree);
  const handleUpdateTree = () => {
    setIsEditing(false);
    updateSingleTree(tree._id, formEdit);
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
              Possible kinds:{" "}
              <input
                type="text"
                name="kind"
                onChange={handleChange}
                value={formEdit.kind}
              />
            </p>
            <p>
              location: [<label htmlFor="coordinatesX">X: </label>
              <input
                type="number"
                id="coordinatesX"
                name="coordinatesX"
                value={formEdit.location.coordinatesX}
                onChange={handleChange}
              />
              , <label htmlFor="coordinatesY">Y: </label>
              <input
                type="number"
                name="coordinatesY"
                id="coordinatesY"
                value={formEdit.location.coordinatesY}
                onChange={handleChange}
              />
              ]
            </p>

            <button type="submit">Save</button>
            {errorState && errorState}
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
              location: [{formEdit.location.coordinatesX},
              {formEdit.location.coordinatesY}]
            </p>
            <p>
              planted date:
              <input
                type="date"
                name="plantedDate"
                onChange={handleChange}
                value={formEdit.plantedDate}
              />
            </p>
            <button type="submit">Save</button>
            {errorState && errorState}
          </div>
        </form>
      )}
    </div>
  );
}
