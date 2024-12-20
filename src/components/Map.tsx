import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { fromLonLat } from 'ol/proj';

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Initialisiere die Karte
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new TileWMS({
              url: 'https://ows.terrestris.de/osm/service?',
              params: {
                LAYERS: 'OSM-WMS',
                TILED: true
              },
              serverType: 'geoserver'
            })
          })
        ],
        view: new View({
          center: fromLonLat([7.0982, 50.7374]),
          zoom: 12
        })
      });

      return () => map.setTarget(undefined);
    }
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: '400px', height: '400px' }}
    />
  );
};

export default MapComponent;
