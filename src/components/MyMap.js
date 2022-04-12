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

// const ironhackLogo = new L.Icon({
// 	iconUrl: 'https://i1.wp.com/www.alliron.vc/wp-content/uploads/2018/05/logo-ironhack-1.png',
// 	iconSize: [68, 65],
// });

const center = [51.505, -0.09];
const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
];

function MyMap({allTreeState}) {
  //Some random co-ordinate
  const position = [51.2, 10];
  console.log(allTreeState, Number(allTreeState[0].location.coordinatesX));

  //Do not forget to set a width and height style to your map. Else it won't show up
  return (
    <div>
      <MapContainer
        style={{ width: "50vw", height: "30vh" }}
        center={position}
        zoom={3}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          <LayersControl.Overlay name="Marker with popup">
            <Marker position={center}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Layer group with circles">
            <LayerGroup>
              <Circle
                center={[51.2, 10.4]}
                pathOptions={{ fillColor: "blue" }}
                radius={200}
              />
              <Circle
                center={[51.2, 10.2]}
                pathOptions={{ fillColor: "red" }}
                radius={100}
                // stroke={false}
              />
              <Circle
                center={[51.2, 10.21]}
                pathOptions={{ fillColor: "red" }}
                radius={200}
                stroke={false}
              />
            <FeatureGroup pathOptions={{ color: "purple" }}>
              <Popup>Popup in FeatureGroup</Popup>
              <LayerGroup>
              {allTreeState.forEach((tree) => {
                console.log(tree)
                return (<Circle
                  center={[Number(tree.location.coordinatesX), Number(tree.location.coordinatesY)]}
                  pathOptions={{ color: "green", fillColor: "green" }}
                  radius={100}
                />)
              })}
              <Circle
                  center={[50, 10]}
                  pathOptions={{ color: "green", fillColor: "green" }}
                  radius={100}
                />
              </LayerGroup>
            </FeatureGroup>
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
