'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Incident } from '@/types';
import { getCategoryColor, getCategoryIcon, getStatusColor } from '@/lib/data';
import { Eye, ExternalLink } from 'lucide-react';

interface IncidentListProps {
  incidents: Incident[];
  onIncidentClick?: (incident: Incident) => void;
  selectedIncident?: Incident | null;
  userRole?: string;
  onStatusUpdate?: (incidentId: string, newStatus: string) => void;
}

export default function IncidentList({ 
  incidents, 
  onIncidentClick, 
  selectedIncident, 
  userRole = 'public',
  onStatusUpdate 
}: IncidentListProps) {
  const router = useRouter();
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    location: ''
  });

  const categories = [...new Set(incidents.map(i => i.category))];
  const statuses = [...new Set(incidents.map(i => i.status))];
  const locations = [...new Set(incidents.map(i => i.location))];

  const filteredIncidents = incidents.filter(incident => {
    if (filters.category && incident.category !== filters.category) return false;
    if (filters.status && incident.status !== filters.status) return false;
    if (filters.location && incident.location !== filters.location) return false;
    return true;
  });

  const handleStatusUpdate = (incidentId: string, newStatus: string) => {
    onStatusUpdate?.(incidentId, newStatus);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header with view options */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Incidents</h2>
          <button
            onClick={() => router.push('/incidents')}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
            View All Details
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="p-4 border-b">
        <div className="grid grid-cols-3 gap-4">
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Incident List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredIncidents.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No incidents found matching the filters.
          </div>
        ) : (
          filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              onClick={() => onIncidentClick?.(incident)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedIncident?.id === incident.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: getCategoryColor(incident.category) }}
                  >
                    {getCategoryIcon(incident.category)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {incident.category}
                      </h3>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{incident.location}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {incident.text}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(incident.time).toLocaleString()}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2 py-1 rounded text-xs text-white font-medium"
                          style={{ backgroundColor: getStatusColor(incident.status) }}
                        >
                          {incident.status}
                        </span>
                        
                        {userRole !== 'public' && (
                          <select
                            value={incident.status}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleStatusUpdate(incident.id, e.target.value);
                            }}
                            className="text-xs border border-gray-300 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="New">New</option>
                            <option value="Acknowledged">Acknowledged</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        )}
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/incident/${incident.id}`);
                          }}
                          className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors group"
                          title="View details"
                        >
                          <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-blue-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
