'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Incident } from '@/types';
import { getCategoryColor, getCategoryIcon, getStatusColor } from '@/lib/data';
import { ArrowLeft, Search, ExternalLink } from 'lucide-react';

export default function IncidentsPage() {
  const router = useRouter();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await fetch('/api/incidents');
      if (response.ok) {
        const data = await response.json();
        setIncidents(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredIncidents = incidents.filter(incident =>
    incident.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => router.push('/')} className="p-2 hover:bg-gray-100 rounded">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold">All Incidents ({filteredIncidents.length})</h1>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              🗺️ Map View
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              onClick={() => router.push(`/incident/${incident.id}`)}
              className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: getCategoryColor(incident.category) }}
                  >
                    {getCategoryIcon(incident.category)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{incident.category}</h3>
                    <p className="text-xs text-gray-500">{incident.type}</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{incident.text}</p>
              
              <div className="text-xs text-gray-500 mb-3">
                📍 {incident.location} • 📅 {new Date(incident.time).toLocaleDateString()}
              </div>

              <span
                className="px-2 py-1 rounded text-xs text-white font-medium"
                style={{ backgroundColor: getStatusColor(incident.status) }}
              >
                {incident.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}