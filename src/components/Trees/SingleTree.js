// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthProviderWrapper";


export function SingleTree({ tree, updateSingleTree, deleteSingleTree }) {
  // const user = useContext(AuthContext);
  console.log(tree)
  const handleUpdateTodo = () => {
    updateSingleTree(tree._id, tree);
  };
  const handleDeleteTree = () => {
    deleteSingleTree(tree._id);
  };
  return (
    <div>
      <div style={{ backgroundColor: tree.ownerId ? "green" : "grey" }}>
        <h2>Name:{tree.treename}</h2>
        <p>Possible kinds: {tree.kind}</p>
        <p>location: {tree.location.coordinatesX},{tree.location.coordinatesY}</p>
        <button onClick={handleUpdateTodo}>Edit</button>
        <button onClick={handleDeleteTree}>Delete!</button>
      </div>
    </div>
  );
}
