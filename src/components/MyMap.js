import {MapContainer, TileLayer, Marker, Popup} from  'react-leaflet'
//Don't forget to import the css
import  'leaflet/dist/leaflet.css'

  
function MyMap() {
    //Some random co-ordinate
	const position = [51.2, 10]

    //Do not forget to set a width and height style to your map. Else it won't show up
	return (
	<div>
		<MapContainer  
			style={{width: '50vw', height: '55vw'}} 
			center={position}  zoom={5}  
			scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker  position={position}>
				<Popup>
					A pretty CSS3 popup. <br  /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	</div>
	)
}

export default MyMap
