
import React, { useState, useRef, useCallback } from 'react';
import type { Polygon as LeafletPolygon, FeatureGroup as LeafletFeatureGroup } from 'leaflet';
import MapComponent from './components/MapComponent';
import ControlPanel from './components/ControlPanel';
import { generateKML } from './services/kmlService';

const App: React.FC = () => {
  const [drawnPolygon, setDrawnPolygon] = useState<LeafletPolygon | null>(null);
  const featureGroupRef = useRef<LeafletFeatureGroup>(null);

  const handlePolygonCreated = useCallback((polygon: LeafletPolygon) => {
    if (featureGroupRef.current) {
      featureGroupRef.current.clearLayers();
      featureGroupRef.current.addLayer(polygon);
    }
    setDrawnPolygon(polygon);
  }, []);

  const handleClearDrawing = useCallback(() => {
    if (featureGroupRef.current) {
      featureGroupRef.current.clearLayers();
    }
    setDrawnPolygon(null);
  }, []);
  
  const handleGenerateKML = useCallback(() => {
    if (!drawnPolygon) {
      alert("Por favor, desenhe uma área no mapa primeiro.");
      return;
    }

    const kmlData = generateKML(drawnPolygon);
    const blob = new Blob([kmlData], { type: 'application/vnd.google-earth.kml+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'area.kml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [drawnPolygon]);

  return (
    <div className="relative h-screen w-screen bg-gray-900">
      <MapComponent 
        onPolygonCreated={handlePolygonCreated}
        featureGroupRef={featureGroupRef}
      />
      <ControlPanel
        onGenerateKML={handleGenerateKML}
        onClearDrawing={handleClearDrawing}
        isPolygonDrawn={!!drawnPolygon}
      />
    </div>
  );
};

export default App;
