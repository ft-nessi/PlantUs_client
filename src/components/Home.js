import MyMap from "./MyMap";
// import { Trees } from "../Trees/index";

export function Home() {
  return (
    <div className="home">
      <h1>Plant a tree with us!</h1>
      <h3>
        Help us with planting one tree at a time. <br /> Join our
        PlantUs-Community and sign up today!
        <br />
      </h3>
      <div className="map">
        <MyMap />
      </div>
      {/* <Trees /> */}
    </div>
  );
}
