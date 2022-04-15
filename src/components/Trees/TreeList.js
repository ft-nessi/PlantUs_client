import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Trees } from "./index";
import { AuthContext } from "../../context/AuthProviderWrapper";
// import { SingleTree } from "./Trees/SingleTree";


export function TreeList() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    function handleNavigateNewTree() {
        navigate("/profile/newtree")
    }

    return (
      <div className="treelist-outlet">
        <div className="treelist-text">
          <h2>
            Here you'll find all the trees you have already{" "}
            {!user.isUser && "marked"}
            {user.isUser && "planted"}
          </h2>
          {!user.isUser && (
            <button onClick={handleNavigateNewTree}>Add a new Tree!</button>
          )}
        </div>
        <div className="trees">
          <Trees />
        </div>
      </div>
    );
}
