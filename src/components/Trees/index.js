import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProviderWrapper";
// import { AddNewTree } from "./AddNewTree";
import { SingleTree } from "./SingleTree";

export async function updateTree(updatedTree, user, onAfterRequest) {
  try {
    if (!user.isUser) {
      const response = await axios.put(
        `${API_BASE_URL}/ranger/markedtrees`,
        updatedTree
      );
      console.log("response data", response.data);
      onAfterRequest(response);
    } else if (user.isUser) {
      const response = await axios.put(
        `${API_BASE_URL}/owner/mytrees`,
        updatedTree
      );
      console.log("response data", response.data);
      onAfterRequest(response);
    }
  } catch (err) {
    console.log("Error in updating the tree on the server", err);
  }
}

export function Trees() {
  const [allTrees, setAllTrees] = useState([]);

  const navigate = useNavigate();
  const { user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user, navigate, isLoading]);

  // router.get /ranger/markedtrees - find all trees with the ranger's id
  useEffect(() => {
    async function fetchAllTrees() {
      try {
        console.log("Yo", user);
        if (!user.isUser) {
          const { data } = await axios.get(
            `${API_BASE_URL}/ranger/markedtrees`
          );
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
  }, [user, navigate]);

  const updateSingleTree = async (idToUpdate, updatedTree) => {
    updateTree(updatedTree, user, (response) => {
      setAllTrees((oldTrees) => {
        return oldTrees.map((tree) => {
          if (idToUpdate === tree._id) {
            return response.data.update;
          }
          return tree;
        });
      });
    });
  };
  // router.put /ranger/markedtrees - find a tree with a specific id and update it
  // const updateSingleTree = async (idToUpdate, updatedTree) => {
  //   try {
  //     const response = await axios.put(
  //       `${API_BASE_URL}/ranger/markedtrees`,
  //       updatedTree
  //     );
  //     console.log(response.data);
  //     setAllTrees((oldTrees) => {
  //       return oldTrees.map((tree) => {
  //         if (idToUpdate === tree._id) {
  //           return updatedTree;
  //         }
  //         return tree;
  //       });
  //     });
  //   } catch (err) {
  //     setErrorState(err)
  //     console.log("Error in updating the tree on the server", err);
  //   }
  // };
  // router.delete /ranger/markedtrees find a tree with that id and delete it
  const deleteSingleTree = async (idToDelete) => {
    console.log(idToDelete);
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
        <div className="single-tree">
          <SingleTree
            key={tree._id}
            tree={tree}
            updateSingleTree={updateSingleTree}
            deleteSingleTree={deleteSingleTree}
          />
          {/* <MyMap tree={tree} updateSingleTree={updateSingleTree}/> */}
        </div>
      ))}
    </div>
  );
}
