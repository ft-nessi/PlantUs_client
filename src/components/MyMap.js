import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
} from "react-leaflet";
// import * as L from "leaflet";

//Don't forget to import the css
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProviderWrapper";
import { updateTree } from "./Trees/index";

// const ironhackLogo = new L.Icon({
// 	iconUrl: 'https://i1.wp.com/www.alliron.vc/wp-content/uploads/2018/05/logo-ironhack-1.png',
// 	iconSize: [68, 65],
// });

const center = [51.505, -0.09];
const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
];

function MyMap({ allTreeState = [] }) {
  //Some random co-ordinate
  const position = [51.2, 10];
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  function handleCLick() {
    navigate("/profile/markedTrees");
  }

  function getHandleToAddIdFunction(tree) {
    return async function handleToAddId(e) {
      e.preventDefault();
      await updateTree({ ...tree, ownerId: user._id }, user, () => {});
      alert("New tree was added to myTrees");
      navigate("/profile/mytrees");
    };
  }

  if (allTreeState.length) {
    console.log(allTreeState, Number(allTreeState[0].location.coordinatesX));
  }

  const isLoggedIn = Boolean(user);
  const isOwner = isLoggedIn && user.isUser;
  const isRanger = isLoggedIn && !user.isUser;

  //Do not forget to set a width and height style to your map. Else it won't show up
  return (
    <div>
      <MapContainer
        style={{ width: "100vw", height: "60vh" }}
        center={position}
        zoom={3}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          <LayersControl.Overlay checked name="All Trees">
            <LayerGroup>
              <Marker position={center}>
                {allTreeState.map((tree) => {
                  console.log(tree);
                  return (
                    <div key={tree._id}>
                      <Circle
                        center={[
                          Number(tree.location.coordinatesX),
                          Number(tree.location.coordinatesY),
                        ]}
                        pathOptions={{ color: "green", fillColor: "green" }}
                        radius={100}
                      >
                        <Popup>
                          {tree.treename}, {tree.kind} <br />
                          <button onClick={handleCLick}>To marked trees</button>
                        </Popup>
                      </Circle>
                    </div>
                  );
                })}
              </Marker>
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="markedTrees">
            <LayerGroup>
              <Marker position={center}>
                {allTreeState.map((tree) => {
                  console.log(
                    "Why am I not happening",
                    isOwner,
                    tree,
                    tree.ownerId
                  );
                  if (isOwner && !tree.ownerId) {
                    return (
                      <div key={tree._id}>
                        <Circle
                          center={[
                            Number(tree.location.coordinatesX),
                            Number(tree.location.coordinatesY),
                          ]}
                          pathOptions={{ color: "green", fillColor: "green" }}
                          radius={100}
                        >
                          <Popup>
                            {tree.treename}, {tree.kind} <br />
                            <button onClick={handleCLick}>
                              To marked trees
                            </button>
                            <button onClick={getHandleToAddIdFunction(tree)}>
                              Add to my trees
                            </button>
                          </Popup>
                        </Circle>
                      </div>
                    );
                  }
                })}
              </Marker>
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Feature group">
            <FeatureGroup pathOptions={{ color: "purple" }}>
              <Popup>Popup in FeatureGroup</Popup>
              <Circle center={[51.2, 10.4]} radius={200} />
              <Popup>Hey</Popup>
              <Circle center={[51.2, 10.6]} radius={200} />
              <Rectangle bounds={rectangle} />
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}

export default MyMap;
