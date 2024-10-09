import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from 'esri-leaflet-geocoder';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({ address }) => {
  const map = useMap(); // Access Leaflet map instance
  const [position, setPosition] = useState([60, 19]); // Default coordinates

  useEffect(() => {
    if (!address) return; // Avoid running if address is not provided
    
    // Geocode the address
    ELG.geocode().text(address).run((err, results) => {
      if (err || results?.results?.length === 0) {
        console.error('Geocoding error:', err);
        return;
      }
      
      const { lat, lng } = results.results[0].latlng; // Extract latitude and longitude
      setPosition([lat, lng]); // Update marker position
      map.flyTo([lat, lng], 6); // Fly to the new position on the map
    });
  }, [address, map]); // Only re-run when address changes or map is initialized

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>{address}</Popup>
    </Marker>
  );
};

export default GeoCoderMarker;
