import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProviderWrapper";
// import { AddNewTree } from "./AddNewTree";
import { SingleTree } from "./SingleTree";

export function Trees() {
  const [allTrees, setAllTrees] = useState([]);
  const [errorState, setErrorState] = useState()


  const navigate = useNavigate();
  const user = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // router.get /ranger/markedtrees - find all trees with the ranger's id
  useEffect(() => {
    async function fetchAllTrees() {
      try {
        if (!user.isUser) {
          const { data } = await axios.get(`${API_BASE_URL}/ranger/markedtrees`);
          console.log(data);
          if (!data.trees) return;
          setAllTrees(data.trees);
        } else if (user.isUser) {
          const { data } = await axios.get(`${API_BASE_URL}/owner/mytrees`);
          console.log(data);
          if (!data.trees) return;
          setAllTrees(data.trees);
        }
      } catch (err) {
        console.log("There is an error");
        console.error(err);
        console.log(err.response.data);
      }
    }
    fetchAllTrees();
  }, [navigate]);

  // router.put /ranger/markedtrees - find a tree with a specific id and update it
  const updateSingleTree = async (idToUpdate, updatedTree) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/ranger/markedtrees`,
        updatedTree
      );
      console.log(response.data);
      setAllTrees((oldTrees) => {
        return oldTrees.map((tree) => {
          if (idToUpdate === tree._id) {
            return updatedTree;
          }
          return tree;
        });
      });
    } catch (err) {
      setErrorState(err)
      console.log("Error in updating the tree on the server", err);
    }
  };
  // router.delete /ranger/markedtrees find a tree with that id and delete it
  const deleteSingleTree = async (idToDelete) => {
    console.log(idToDelete)
    try {
      const response = await axios.post(
        `${API_BASE_URL}/ranger/markedtrees/delete`,
        { _id: idToDelete }
      );
      console.log(response.data);
      setAllTrees((oldTrees) => {
        return oldTrees.filter((tree) => {
          return idToDelete !== tree._id;
        });
      });
    } catch (err) {
      console.error("Error in deleting the tree from the server", err);
    }
  };

  return (
    <div>
      {/* <AddNewTree setAllTrees={setAllTrees} /> */}
      {allTrees.map((tree) => (
        <div>
        <SingleTree
          key={tree._id}
          tree={tree}
          updateSingleTree={updateSingleTree}
          deleteSingleTree={deleteSingleTree}
          errorState={errorState}
        />
        </div>
      ))}

    </div>
  );
}
