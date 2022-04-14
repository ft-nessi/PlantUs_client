import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Trees } from ".";
import { AuthContext } from "../../context/AuthProviderWrapper";
// import { SingleTree } from "./Trees/SingleTree";


export function TreeList() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    function handleNavigateNewTree() {
        navigate("/profile/newtree")
    }

    return (
        <div className="treeslist-outlet">
            <h1>This are your {!user.isUser && ("marked") } trees</h1>
            {!user.isUser && (<button onClick={handleNavigateNewTree}>Add a new Tree!</button>)}
            <Trees />
        </div>
    )
}
