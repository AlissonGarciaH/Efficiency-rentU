'use client';

import L from "leaflet";
import { Circle, MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-expect-error Leaflet default icon requires manual override for Webpack image loading
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[]; // [lat, lng]
  showRadius?: boolean;
  radiusMeters?: number;
}

const Map: React.FC<MapProps> = ({
  center,
  showRadius = true,
  radiusMeters = 500, // 0.5 km default
}) => {
  return (
    <MapContainer
      center={center as L.LatLngExpression || [51, -0.09]}
      zoom={center ? 13 : 2}
      scrollWheelZoom={false}
      style={{
        height: '35vh',
        borderRadius: '0.5rem'
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {center && (
        <>
          <Marker position={center as L.LatLngExpression} />
          {showRadius && (
            <Circle
              center={center as L.LatLngExpression}
              radius={radiusMeters}
              pathOptions={{ color: '#2563eb', fillOpacity: 0.2 }}
            />
          )}
        </>
      )}
    </MapContainer>
  );
};

export default Map;