import { useNavigate } from "react-router-dom";
import { Trees } from ".";
// import { SingleTree } from "./Trees/SingleTree";


export function TreeList() {
    const navigate = useNavigate()

    function handleNavigateNewTree() {
        navigate("/profile/newtree")
    }

    return (
        <div>
            <h1>This are your marked trees</h1>
            <button onClick={handleNavigateNewTree}>Add a new Tree!</button>
            <Trees />
        </div>
    )
}
