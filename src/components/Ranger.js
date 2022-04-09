
import proj4Src from "proj4";


export function Ranger() {
  let secondProjection =
    "+proj=lcc +lat_1=29.7 +lat_0=29.7 +lon_0=-5.4 +k_0=0.9996155960000001 +x_0=500000 +y_0=300000 +a=6378249.2 +b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs";
  let firstProjection = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ";

  function addMarker() {
    let inputX = document.getElementById("x").value;
    let inputY = document.getElementById("y").value;
    let pj = proj4Src(secondProjection, firstProjection, [inputX, inputY]);
    let lng = pj[0];
    let lat = pj[1];
    let latlng = L.latLng(lat, lng);
    L.marker(latlng).addTo(map);
  }

  return (
    <div>
      <div id="map"></div>
      <div>
        <label for="x">X: </label>
        <input type="number" id="x" />
        <label for="y">Y: </label>
        <input type="number" id="y" />
        <button type="button" onclick={addMarker()}>
          Go
        </button>
      </div>
    </div>
  );
}
