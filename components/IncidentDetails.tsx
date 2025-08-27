'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Incident } from '@/types';
import { getCategoryColor, getCategoryIcon, getStatusColor } from '@/lib/data';
import { ArrowLeft, MapPin, Clock, User, AlertCircle, CheckCircle, Info, Edit3 } from 'lucide-react';

interface IncidentDetailsProps {
  incident: Incident;
  userRole?: string;
  onStatusUpdate?: (incidentId: string, newStatus: string) => void;
}

export default function IncidentDetails({ 
  incident, 
  userRole = 'public',
  onStatusUpdate 
}: IncidentDetailsProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(incident.status);

  const handleStatusUpdate = () => {
    if (selectedStatus !== incident.status) {
      onStatusUpdate?.(incident.id, selectedStatus);
    }
    setIsEditing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New':
        return <AlertCircle className="w-5 h-5" />;
      case 'Acknowledged':
        return <Info className="w-5 h-5" />;
      case 'Resolved':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const { date, time } = formatDateTime(incident.time);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold"
                style={{ backgroundColor: getCategoryColor(incident.category) }}
              >
                {getCategoryIcon(incident.category)}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {incident.category} Incident
                </h1>
                <p className="text-sm text-gray-500">ID: {incident.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Primary Information */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Incident Description */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Incident Description
              </h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {incident.text}
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Timeline
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Incident Reported</div>
                    <div className="text-sm text-gray-600">{date} at {time}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Type: {incident.type}
                    </div>
                  </div>
                </div>
                
                {incident.status !== 'New' && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Info className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Status Updated</div>
                      <div className="text-sm text-gray-600">
                        Marked as {incident.status}
                      </div>
                    </div>
                  </div>
                )}
                
                {incident.status === 'Resolved' && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Incident Resolved</div>
                      <div className="text-sm text-gray-600">
                        Case has been closed
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Additional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-lg">{getCategoryIcon(incident.category)}</span>
                    <span className="text-gray-900">{incident.category}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Incident Type</label>
                  <div className="mt-1 text-gray-900">{incident.type}</div>
                </div>
                
                {incident.coordinates && (
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-500">Coordinates</label>
                    <div className="mt-1 text-gray-900 font-mono text-sm">
                      Lat: {incident.coordinates[1].toFixed(6)}, Lng: {incident.coordinates[0].toFixed(6)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Status Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Status</h3>
                {userRole !== 'public' && !isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Edit3 className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-3">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="New">New</option>
                    <option value="Acknowledged">Acknowledged</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={handleStatusUpdate}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setSelectedStatus(incident.status);
                      }}
                      className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-full text-white"
                    style={{ backgroundColor: getStatusColor(incident.status) }}
                  >
                    {getStatusIcon(incident.status)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{incident.status}</div>
                    <div className="text-sm text-gray-500">Current status</div>
                  </div>
                </div>
              )}
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">{incident.location}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Reported location
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            {userRole !== 'public' && (
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm">
                    📋 Add Note
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm">
                    📞 Contact Reporter
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm">
                    🚨 Escalate Priority
                  </button>
                  <button 
                    onClick={() => router.push('/')}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm"
                  >
                    🗺️ View on Map
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}