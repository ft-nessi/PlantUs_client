import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import * as L from "leaflet";

//Don't forget to import the css
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProviderWrapper";
import { updateTree } from "./Trees/index";
import axios from "axios";
import { API_BASE_URL } from "../consts";

function getIcon(_iconSize, ownerId) {
  if (ownerId) {
    return L.icon({
      iconUrl: require("../Icons/Favicon.plantedTree.png"),
      iconSize: _iconSize,
    });
  } else {
    return L.icon({
      iconUrl: require("../Icons/Favicon.markedTree.png"),
      iconSize: _iconSize,
    });
  }
}

function MyMap({ allTreeState = [] }) {
  //Some random co-ordinate
  const [treesHomepage, setTreesHomepage] = useState([]);
  const position = [51.2, 10];
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function handleHomeMap() {
      try {
        const response = await axios.get(`${API_BASE_URL}/alltrees`);
        setTreesHomepage(response.data.trees);
      } catch (err) {
        console.log("Error in updating the tree on the server", err);
      }
    }
    handleHomeMap();
  }, []);

  // function handleCLick() {
  //   navigate("/profile/markedTrees");
  // }

  function getHandleToAddIdFunction(tree) {
    return async function handleToAddId(e) {
      e.preventDefault();
      await updateTree({ ...tree, ownerId: user._id }, user, () => {});
      alert("New tree was added to myTrees");
      navigate("/profile/mytrees");
    };
  }

  if (allTreeState.length) {
    // console.log(allTreeState, Number(allTreeState[0].location.coordinatesX));
  }

  const isLoggedIn = Boolean(user);
  const isOwner = isLoggedIn && user.isUser;
  const isRanger = isLoggedIn && !user.isUser;

  //Do not forget to set a width and height style to your map. Else it won't show up
  return (
    <div className="mymap">
      <MapContainer
        style={{ width: "91vw", height: "50vh", padding: "1em", display: "flex", alignItems: "center", position:"relative" }}
        center={position}
        zoom={4}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | <a href="https://www.flaticon.com/free-icons/add" title="add icons">Add icons created by Those Icons - Flaticon</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <a href="https://www.flaticon.com/free-icons/add" title="add icons">Add icons created by Those Icons - Flaticon</a> */}
        {!isLoggedIn &&
          treesHomepage.map((tree) => {
            return (
              <div key={tree._id}>
                <Marker
                  position={[
                    Number(tree.location.coordinatesX),
                    Number(tree.location.coordinatesY),
                  ]}
                  icon={getIcon(60, tree.ownerId)}
                >
                  <Popup>
                    <p>
                      {tree.ownerId && "This tree was planted"}
                      {!tree.ownerId && "This tree needs to be planted"}
                    </p>
                  </Popup>
                </Marker>
              </div>
            );
          })}
        {isLoggedIn && (
          <LayersControl position="topright">
            <LayersControl.Overlay checked name="All Trees">
              <LayerGroup>
                {isLoggedIn &&
                  allTreeState.map((tree) => {
                    return (
                      <div key={tree._id}>
                        <Marker
                          position={[
                            Number(tree.location.coordinatesX),
                            Number(tree.location.coordinatesY),
                          ]}
                          icon={getIcon(60, tree.ownerId)}
                        >
                          <Popup>
                            Treename: {tree.treename}
                            <br />
                            Kind:{tree.kind}
                            <br />
                            {tree.plantedDate &&
                              `Planted Date: ${tree.plantedDate}`}
                            {isOwner && !tree.ownerId && (
                              <button onClick={getHandleToAddIdFunction(tree)}>
                                Add to myTrees
                              </button>
                            )}
                          </Popup>
                        </Marker>
                      </div>
                    );
                  })}
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay
              name={isOwner ? "Trees to be planted" : "Marked Trees"}
            >
              <LayerGroup>
                {isOwner &&
                  allTreeState
                    .filter((tree) => {
                      return !tree.ownerId;
                    })
                    .map((tree) => {
                      return (
                        <div key={tree._id}>
                          <Marker
                            position={[
                              Number(tree.location.coordinatesX),
                              Number(tree.location.coordinatesY),
                            ]}
                            icon={getIcon(60, tree.ownerId)}
                          >
                            <Popup>
                              Treename: {tree.treename}
                              <br />
                              Kind:{tree.kind}
                              <br />
                              Planted Date: {tree.plantedDate}
                              <br />
                              <button onClick={getHandleToAddIdFunction(tree)}>
                                Add to myTrees
                              </button>
                            </Popup>
                          </Marker>
                        </div>
                      );
                    })}
                {isRanger &&
                  allTreeState
                    .filter((tree) => {
                      return !tree.rangerId === user._id;
                    })
                    .map((tree) => {
                      return (
                        <div key={tree._id}>
                          <Marker
                            position={[
                              Number(tree.location.coordinatesX),
                              Number(tree.location.coordinatesY),
                            ]}
                            icon={getIcon(60, tree.ownerId)}
                          >
                            <Popup>
                              Treename: {tree.treename}
                              <br />
                              Kind:{tree.kind}
                            </Popup>
                          </Marker>
                        </div>
                      );
                    })}
              </LayerGroup>
            </LayersControl.Overlay>
            {isOwner && (
              <LayersControl.Overlay name="My planted Trees">
                <LayerGroup>
                  {isOwner &&
                    allTreeState
                      .filter((tree) => {
                        return tree.ownerId === user._id;
                      })
                      .map((tree) => {
                        return (
                          <div key={tree._id}>
                            <Marker
                              position={[
                                Number(tree.location.coordinatesX),
                                Number(tree.location.coordinatesY),
                              ]}
                              icon={getIcon(60, tree.ownerId)}
                            >
                              <Popup>
                                Treename: {tree.treename}
                                <br />
                                Kind:{tree.kind}
                                <br />
                                {tree.plantedDate &&
                                  `Planted Date: ${tree.plantedDate}`}
                              </Popup>
                            </Marker>
                          </div>
                        );
                      })}
                </LayerGroup>
              </LayersControl.Overlay>
            )}
          </LayersControl>
        )}
      </MapContainer>
    </div>
  );
}

export default MyMap;
