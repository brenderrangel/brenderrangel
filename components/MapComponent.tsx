
import React from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import type { LatLngExpression, Polygon, FeatureGroup as LeafletFeatureGroup } from 'leaflet';

interface MapComponentProps {
  onPolygonCreated: (polygon: Polygon) => void;
  featureGroupRef: React.RefObject<LeafletFeatureGroup>;
}

const MapComponent: React.FC<MapComponentProps> = ({ onPolygonCreated, featureGroupRef }) => {
  const center: LatLngExpression = [-14.235, -51.9253]; // Center of Brazil

  const handleCreated = (e: any) => {
    onPolygonCreated(e.layer as Polygon);
  };

  return (
    <MapContainer center={center} zoom={4} scrollWheelZoom={true} className="h-full w-full z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
            polygon: {
              allowIntersection: false,
              shapeOptions: {
                color: '#3b82f6', // A nice blue color
              },
            },
          }}
          edit={{
            edit: false,
            remove: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default MapComponent;
