'use client';

import { useEffect, useState } from 'react';
import { Incident } from '@/types';
import { getCategoryColor, getCategoryIcon } from '@/lib/data';

interface MapComponentProps {
  incidents: Incident[];
  onIncidentClick?: (incident: Incident) => void;
  selectedIncident?: Incident | null;
}

export default function MapComponent({ incidents, onIncidentClick, selectedIncident }: MapComponentProps) {
  const [isClient, setIsClient] = useState(false);
  const [mapComponents, setMapComponents] = useState<any>(null);
  const [L, setL] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    
    const loadMapLibraries = async () => {
      try {
        // Only load in browser
        if (typeof window === 'undefined') return;
        
        // Load Leaflet and React-Leaflet
        const [leafletModule, reactLeafletModule] = await Promise.all([
          import('leaflet'),
          import('react-leaflet')
        ]);
        
        const leaflet = leafletModule.default;
        
        // Fix Leaflet default icon issue
        delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
        
        // Load CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
        document.head.appendChild(link);
        
        setL(leaflet);
        setMapComponents({
          MapContainer: reactLeafletModule.MapContainer,
          TileLayer: reactLeafletModule.TileLayer,
          Marker: reactLeafletModule.Marker,
          Popup: reactLeafletModule.Popup,
        });
      } catch (err) {
        console.error('Failed to load map libraries:', err);
        setError('Failed to load map');
      }
    };
    
    loadMapLibraries();
  }, []);

  // Create custom icon for incidents
  const createCustomIcon = (category: string) => {
    if (!L) return undefined;
    
    const color = getCategoryColor(category);
    const icon = getCategoryIcon(category);
    
    return L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: white;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        ">${icon}</div>
      `,
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  // Loading state
  if (!isClient || !mapComponents || !L) {
    return (
      <div className="w-full h-full rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full h-full rounded-lg overflow-hidden bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️ Map Error</div>
          <div className="text-sm text-gray-600">Using list view instead</div>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = mapComponents;
  const defaultCenter: [number, number] = [12.9716, 77.5946]; // Bangalore coordinates

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={10}
        style={{ width: '100%', height: '100%' }}
        className="leaflet-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {incidents.map((incident) => {
          if (!incident.coordinates) return null;
          
          const customIcon = createCustomIcon(incident.category);
          
          return (
            <Marker
              key={incident.id}
              position={[incident.coordinates[1], incident.coordinates[0]]}
              icon={customIcon}
              eventHandlers={{
                click: () => {
                  onIncidentClick?.(incident);
                }
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{getCategoryIcon(incident.category)}</span>
                    <span className="font-semibold text-gray-800">{incident.category}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{incident.text}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{incident.location}</span>
                    <span 
                      className="px-2 py-1 rounded text-white text-xs"
                      style={{ backgroundColor: getCategoryColor(incident.status) }}
                    >
                      {incident.status}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}