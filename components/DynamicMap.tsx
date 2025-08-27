import dynamic from 'next/dynamic';
import { Incident } from '@/types';

interface MapComponentProps {
  incidents: Incident[];
  onIncidentClick?: (incident: Incident) => void;
  selectedIncident?: Incident | null;
}

// Dynamically import the Map component with no SSR
const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
});

export default function MapWrapper(props: MapComponentProps) {
  return <DynamicMap {...props} />;
}