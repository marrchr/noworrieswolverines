import { Map, Marker } from "pigeon-maps";
import "./Location.css";

function Location() {
  return (
    <div className="location">
      <div className="location-info">
        <div className="message flow">
          <div style={{ fontSize: "1.25rem" }}>
            Chris has missed a check-in. Here is their last recorded location.
          </div>
          <div>
            You can try contacting Chris at:
            <br />
            <a href="tel:1-734-320-2495">734-320-2495</a>
          </div>
        </div>
      </div>
      <Map
        style={{ height: "100%" }}
        defaultCenter={[42.2767576, -83.7386578]}
        defaultZoom={18}
      >
        <Marker width={50} anchor={[42.2767576, -83.7386578]} />
      </Map>
    </div>
  );
}

export default Location;
