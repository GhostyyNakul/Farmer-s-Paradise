import { Laboratory } from '../models/Laboratory.js';

export interface NearbyLabResult {
  id: string;
  name: string;
  distance: number;
  services: string[];
  turnaround: string;
  rating: number;
  isVerified: boolean;
  coordinates: { lat: number; lng: number };
  address: string;
  phone?: string;
  email?: string;
  description?: string;
  pricing?: string;
  operatingHours?: string;
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function haversineDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

class LabService {
  async findNearby(lat: number, lng: number, radiusKm: number): Promise<NearbyLabResult[]> {
    const labs = await Laboratory.find({ isVerified: true });

    return labs
      .map((lab) => ({
        id: lab._id.toString(),
        name: lab.name,
        distance: haversineDistanceKm(lat, lng, lab.latitude, lab.longitude),
        services: lab.services,
        turnaround: lab.averageTurnaround ?? '48 Hours',
        rating: lab.rating,
        isVerified: lab.isVerified,
        coordinates: { lat: lab.latitude, lng: lab.longitude },
        address: lab.address,
        phone: lab.phone,
        email: lab.email,
        description: lab.description,
        pricing: lab.pricing,
        operatingHours: lab.operatingHours,
      }))
      .filter((lab) => lab.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);
  }
}

export const labService = new LabService();
