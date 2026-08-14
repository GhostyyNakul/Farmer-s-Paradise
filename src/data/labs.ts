export interface SoilLab {
  id: string;
  name: string;
  rating: number;
  distanceKm: number;
  location: string;
  turnaroundTime: string;
  certified: boolean;
  services: string[];
  phone: string;
  lat: number;
  lng: number;
}

export const SOIL_LABS: SoilLab[] = [
  {
    id: 'lab-1',
    name: 'AgriTech Central Spectrometry Lab',
    rating: 4.9,
    distanceKm: 4.2,
    location: 'Green Valley Innovation Hub',
    turnaroundTime: '24 Hours',
    certified: true,
    services: ['HPLC Nutrient Assay', 'Microbiome DNA Sequencing', 'Heavy Metal Screen'],
    phone: '+1 (800) 555-FARM',
    lat: 34.05,
    lng: -118.25
  },
  {
    id: 'lab-2',
    name: 'BioSoil Regional Diagnostics',
    rating: 4.8,
    distanceKm: 8.7,
    location: 'North Ridge Agricultural Park',
    turnaroundTime: '48 Hours',
    certified: true,
    services: ['Standard N-P-K Test', 'Salinity & EC Profile', 'Drone Soil Sampling'],
    phone: '+1 (800) 555-SOIL',
    lat: 34.12,
    lng: -118.32
  },
  {
    id: 'lab-3',
    name: 'Terra Precision Analytics Center',
    rating: 4.95,
    distanceKm: 14.1,
    location: 'Eastland Agri-Sciences Institute',
    turnaroundTime: 'Same Day Express',
    certified: true,
    services: ['Full Spectroscopic Scan', 'Carbon Sequestration Audit', 'Custom Fertilizer Recipe'],
    phone: '+1 (800) 555-TERRA',
    lat: 34.01,
    lng: -118.15
  }
];
