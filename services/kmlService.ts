
import type { Polygon as LeafletPolygon, LatLng } from 'leaflet';

export const generateKML = (polygon: LeafletPolygon): string => {
  const latLngs = polygon.getLatLngs()[0] as LatLng[];

  if (!latLngs || latLngs.length === 0) {
    return '';
  }

  // KML format requires coordinates as longitude,latitude,altitude
  // We close the polygon by adding the first coordinate at the end.
  const coordinatesString = latLngs
    .map(latLng => `${latLng.lng},${latLng.lat},0`)
    .join(' ');
  
  const firstCoordinate = `${latLngs[0].lng},${latLngs[0].lat},0`;

  const kmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Área Desenhada</name>
    <Placemark>
      <name>Polígono</name>
      <Style>
        <LineStyle>
          <color>ff0000ff</color>
          <width>2</width>
        </LineStyle>
        <PolyStyle>
          <color>4dff0000</color>
        </PolyStyle>
      </Style>
      <Polygon>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>
              ${coordinatesString} ${firstCoordinate}
            </coordinates>
          </LinearRing>
        </outerBoundaryIs>
      </Polygon>
    </Placemark>
  </Document>
</kml>`;

  return kmlContent;
};
