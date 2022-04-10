
// import proj4Src from "proj4";
// // import {MapContainer, TileLayer, Marker, Popup} from  'react-leaflet'
// import MyMap from "./MyMap";
// import * as L from "leaflet";

import { useState } from "react";
import { API_BASE_URL } from "../consts";
import axios from "axios";


export function Ranger() {

  const [treeState, setTreeState] = useState({})
  // const map = L.map("map")

  // L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   style:{width: '50vw', height: '55vw'},
  //     maxZoom: 18,
  //     attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //   }).addTo(map);
  
  //   map.setView([0, 0], 0);

  // let secondProjection =
  //   "+proj=lcc +lat_1=29.7 +lat_0=29.7 +lon_0=-5.4 +k_0=0.9996155960000001 +x_0=500000 +y_0=300000 +a=6378249.2 +b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs";
  // let firstProjection = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ";

  // function addMarker() {
  //   let inputX = document.getElementById("x").value;
  //   let inputY = document.getElementById("y").value;
  //   let pj = proj4Src(secondProjection, firstProjection, [inputX, inputY]);
  //   let lng = pj[0];
  //   let lat = pj[1];
  //   let latlng = L.latLng(lat, lng);
  //   L.marker(latlng).addTo(map);
  // }

  function handleChange(event) {
    let value = event.target.value;
    setTreeState({...treeState, [event.target.name]: value })
  }

  async function handleSubmitTree(event) {
    event.preventDefault()
    console.log(treeState);
    const response =  await axios.post(`${API_BASE_URL}/ranger/markedtrees`, treeState, {withCredentials: true})
    console.log(response.data)
    setTreeState({})
  }

  return (
    <div>
      {/* <div id="map"></div> */}
      <form onSubmit={handleSubmitTree}>
        <label htmlFor="kind" >Kind: </label>
        <input type="text" id="kind" name="kind" onChange={handleChange}/>
        <label htmlFor="coordinatesX">X: </label>
        <input type="number" id="coordinatesX" name="coordinatesX" onChange={handleChange}/>
        <label htmlFor="coordinatesY">Y: </label>
        <input type="number" id="coordinatesY" name="coordinatesY" onChange={handleChange}/>
        <button type="submit" >
          Go
        </button>
      </form>
    </div>
  );
}
