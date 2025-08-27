'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import IncidentDetails from '@/components/IncidentDetails';
import { Incident } from '@/types';

export default function IncidentDetailsPage() {
  const params = useParams();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('public');

  useEffect(() => {
    // Get user role from localStorage (set during login)
    const role = localStorage.getItem('userRole') || 'public';
    setUserRole(role);
  }, []);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/incidents/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Incident not found');
          } else {
            setError('Failed to load incident details');
          }
          return;
        }

        const incidentData = await response.json();
        setIncident(incidentData);
      } catch (err) {
        setError('Failed to load incident details');
        console.error('Error fetching incident:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchIncident();
    }
  }, [params.id]);

  const handleStatusUpdate = async (incidentId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/incidents/${incidentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update local state
        setIncident(prev => prev ? { ...prev, status: newStatus as any } : null);
        
        // Show success message (you might want to add a toast notification here)
        console.log('Status updated successfully');
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading incident details...</p>
        </div>
      </div>
    );
  }

  if (error || !incident) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error || 'Incident not found'}
          </h1>
          <p className="text-gray-600 mb-6">
            The incident you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <IncidentDetails
      incident={incident}
      userRole={userRole}
      onStatusUpdate={handleStatusUpdate}
    />
  );
}