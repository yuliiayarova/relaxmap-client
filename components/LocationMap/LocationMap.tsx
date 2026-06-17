import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import clsx from 'clsx';
import css from './LocationMap.module.css';

interface LocationMapProps {
  locationName: string;
  coordinates: { lat: number; lng: number };
}

const customMarkerIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

export default function LocationMap({
  coordinates,
  locationName,
}: LocationMapProps) {
  if (
    !coordinates ||
    coordinates.lat === 0 ||
    coordinates.lng === 0 ||
    typeof coordinates.lat !== 'number' ||
    typeof coordinates.lng !== 'number'
  ) {
    return (
      <div className="container">
        <p className="map-error">Координати відсутні</p>
      </div>
    );
  }

  const position: LatLngTuple = [coordinates.lat, coordinates.lng];

  return (
    <section className={clsx(css['section-location-map'])}>
      {/* Lat: {coordinates.lat} Lng: {coordinates.lng} */}
      <div className="container">
        <div className={clsx(css['map-wrapper'])}>
          <MapContainer
            center={position}
            zoom={10}
            scrollWheelZoom={false}
            zoomControl={false}
            attributionControl={false}
            className={clsx(css['map-container'])}
          >
            <TileLayer
              // Ссылка на слой от Google
              url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            />
            {/**/}
            {/*
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/**/}
            <Marker position={position} icon={customMarkerIcon}>
              <Popup>
                <div className="map-popup-content">
                  <strong>{locationName}</strong>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
