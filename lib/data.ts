import { Incident } from '@/types';

// Mock coordinates for Bangalore locations
const locationCoordinates: Record<string, [number, number]> = {
  'Indiranagar': [77.6408, 12.9716],
  'HSR Layout': [77.6413, 12.9141],
  'Electronic City': [77.6726, 12.8458],
  'Brigade Road': [77.5946, 12.9716],
  'Whitefield': [77.7248, 12.9692],
  'Hebbal': [77.5946, 13.0507],
  'BTM Layout': [77.6101, 12.9165],
  'Koramangala': [77.6245, 12.9349],
  'MG Road': [77.5946, 12.9716],
  'Yeshwanthpur': [77.5483, 13.0160],
};

// Mock users for authentication
export const mockUsers = [
  {
    id: '1',
    name: 'Police Officer',
    role: 'police' as const,
    email: 'police@example.com',
    password: 'password123'
  },
  {
    id: '2',
    name: 'Medical Staff',
    role: 'medical' as const,
    email: 'medical@example.com',
    password: 'password123'
  },
  {
    id: '3',
    name: 'Firefighter',
    role: 'firefighter' as const,
    email: 'fire@example.com',
    password: 'password123'
  }
];

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Fire': '#ef4444',
    'Medical': '#10b981',
    'Crime': '#f59e0b',
    'Accident': '#8b5cf6',
    'Traffic': '#3b82f6',
    'Garbage': '#6b7280',
    'Pollution': '#059669',
    'Potholes': '#dc2626'
  };
  return colors[category] || '#6b7280';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'New': '#ef4444',
    'Acknowledged': '#f59e0b',
    'Resolved': '#10b981'
  };
  return colors[status] || '#6b7280';
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Fire': '🔥',
    'Medical': '🏥',
    'Crime': '🚔',
    'Accident': '🚗',
    'Traffic': '🚦',
    'Garbage': '🗑️',
    'Pollution': '🌫️',
    'Potholes': '🕳️'
  };
  return icons[category] || '📋';
}

export function getRoleBasedCategories(role: string): string[] {
  const roleCategories: Record<string, string[]> = {
    'police': ['Crime', 'Accident'],
    'medical': ['Medical'],
    'firefighter': ['Fire'],
    'public': ['Fire', 'Medical', 'Crime', 'Accident', 'Traffic', 'Garbage', 'Pollution', 'Potholes']
  };
  return roleCategories[role] || [];
}

export async function loadIncidents(): Promise<Incident[]> {
  try {
    const response = await fetch('/api/incidents');
    const data = await response.json();
    return data.map((incident: any, index: number) => ({
      ...incident,
      id: index.toString(),
      coordinates: locationCoordinates[incident.location] || [77.5946, 12.9716] // Default to Bangalore center
    }));
  } catch (error) {
    console.error('Error loading incidents:', error);
    return [];
  }
}

export function filterIncidentsByRole(incidents: Incident[], role: string): Incident[] {
  if (role === 'public') return incidents;
  
  const allowedCategories = getRoleBasedCategories(role);
  return incidents.filter(incident => allowedCategories.includes(incident.category));
}

export function filterIncidents(incidents: Incident[], filters: any): Incident[] {
  return incidents.filter(incident => {
    if (filters.category && filters.category.length > 0 && !filters.category.includes(incident.category)) {
      return false;
    }
    if (filters.status && filters.status.length > 0 && !filters.status.includes(incident.status)) {
      return false;
    }
    if (filters.location && filters.location.length > 0 && !filters.location.includes(incident.location)) {
      return false;
    }
    return true;
  });
}
