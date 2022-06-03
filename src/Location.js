import { Map, Marker } from "pigeon-maps";

function Location() {
  return (
    <Map
      style={{ height: "100%" }}
      defaultCenter={[42.2767576, -83.7386578]}
      defaultZoom={18}
    >
      <Marker width={50} anchor={[42.2767576, -83.7386578]} />
    </Map>
  );
}

export default Location;
