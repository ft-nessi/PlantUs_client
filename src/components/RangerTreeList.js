import { useNavigate } from "react-router-dom";
import { Trees } from "./Trees";
// import { SingleTree } from "./Trees/SingleTree";


export function RangerTreeList() {
    const navigate = useNavigate()

    function handleNavigateNewTree() {
        navigate("/profile/markedTrees/newtree")
    }

    return (
        <div>
            <h1>This are your marked trees</h1>
            <button onClick={handleNavigateNewTree}>Add a new Tree!</button>
            <Trees />
        </div>
    )
}
