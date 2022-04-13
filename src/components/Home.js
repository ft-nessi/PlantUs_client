import MyMap from "./MyMap";
// import { Trees } from "../Trees/index";

export function Home() {
  return (
    <div className="home">
      <h1>Home Page</h1>
      <div className="map">
        <MyMap />
      </div>
      {/* <Trees /> */}
    </div>
  );
}
