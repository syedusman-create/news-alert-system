'use client';

import { useState, useEffect } from 'react';
import { User, Incident } from '@/types';
import LoginForm from '@/components/LoginForm';
import MapComponent from '@/components/DynamicMap';
import IncidentList from '@/components/IncidentList';
import { loadIncidents, filterIncidentsByRole } from '@/lib/data';
import { LogOut, User as UserIcon, Shield, MapPin, AlertTriangle } from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIncidents().then(data => {
      setIncidents(data);
      setFilteredIncidents(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user && incidents.length > 0) {
      const filtered = filterIncidentsByRole(incidents, user.role);
      setFilteredIncidents(filtered);
    }
  }, [user, incidents]);

  const handleLogin = (userData: User, token: string) => {
    setUser(userData);
    // In a real app, you'd store the token in localStorage or cookies
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedIncident(null);
  };

  const handleIncidentClick = (incident: Incident) => {
    setSelectedIncident(selectedIncident?.id === incident.id ? null : incident);
  };

  const handleStatusUpdate = (incidentId: string, newStatus: string) => {
    setIncidents(prev => 
      prev.map(incident => 
        incident.id === incidentId 
          ? { ...incident, status: newStatus as 'New' | 'Acknowledged' | 'Resolved' }
          : incident
      )
    );
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading incidents...</p>
        </div>
      </div>
    );
  }

  const getRoleDisplayName = (role: string) => {
    const roleNames: Record<string, string> = {
      'public': 'Public User',
      'police': 'Police Officer',
      'medical': 'Medical Staff',
      'firefighter': 'Firefighter'
    };
    return roleNames[role] || role;
  };

  const getRoleIcon = (role: string) => {
    const icons: Record<string, any> = {
      'public': UserIcon,
      'police': Shield,
      'medical': AlertTriangle,
      'firefighter': AlertTriangle
    };
    return icons[role] || UserIcon;
  };

  const RoleIcon = getRoleIcon(user.role);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">News Alert System</h1>
                <p className="text-sm text-gray-500">Real-time incident monitoring</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RoleIcon className="h-4 w-4" />
                <span>{getRoleDisplayName(user.role)}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Incident Map</h2>
              <div className="h-96">
                <MapComponent
                  incidents={filteredIncidents}
                  onIncidentClick={handleIncidentClick}
                  selectedIncident={selectedIncident}
                />
              </div>
            </div>
          </div>

          {/* Incident List Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Incidents</h2>
              <IncidentList
                incidents={filteredIncidents}
                onIncidentClick={handleIncidentClick}
                selectedIncident={selectedIncident}
                userRole={user.role}
                onStatusUpdate={handleStatusUpdate}
              />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                <p className="text-2xl font-semibold text-gray-900">{filteredIncidents.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {filteredIncidents.filter(i => i.status === 'New').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Acknowledged</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {filteredIncidents.filter(i => i.status === 'Acknowledged').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {filteredIncidents.filter(i => i.status === 'Resolved').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
