export interface Incident {
  id: string;
  text: string;
  category: string;
  type: string;
  location: string;
  time: string;
  status: 'New' | 'Acknowledged' | 'Resolved';
  coordinates?: [number, number]; // [longitude, latitude]
}

export type UserRole = 'public' | 'police' | 'medical' | 'firefighter';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface FilterOptions {
  category: string[];
  status: string[];
  location: string[];
  dateRange: {
    start: string;
    end: string;
  };
}
