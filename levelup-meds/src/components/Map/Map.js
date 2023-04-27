import React, { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 41.1149,
  lng: -85.103,
};

const Map = () => {
  const isLoaded = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDwTWCE5PDB_7J0qq7CWXdtRujQULC0lf4",
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
    ></GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(Map);
