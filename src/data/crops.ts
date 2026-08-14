export interface CropData {
  id: string;
  name: string;
  scientificName: string;
  suitability: number;
  waterRequirement: 'Low' | 'Medium' | 'High';
  growingPeriod: string;
  soilCompatibility: string;
  expectedYield: string;
  description: string;
  keyNutrients: string[];
  imageUrl: string;
  idealPh: string;
}

export const CROPS: CropData[] = [
  {
    id: 'wheat',
    name: 'Golden Durum Wheat',
    scientificName: 'Triticum durum',
    suitability: 96,
    waterRequirement: 'Medium',
    growingPeriod: '110 - 130 days',
    soilCompatibility: 'Clay Loam (Rich Organic Soil)',
    expectedYield: '4.8 Tons / Hectare',
    description: 'Optimal nitrogen response in your soil profile. Low pest threat detected for the upcoming autumn transition window.',
    keyNutrients: ['N: High', 'P: Moderate', 'K: High'],
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
    idealPh: '6.2 - 7.0'
  },
  {
    id: 'mustard',
    name: 'Yellow Mustard',
    scientificName: 'Brassica juncea',
    suitability: 91,
    waterRequirement: 'Low',
    growingPeriod: '90 - 105 days',
    soilCompatibility: 'Sandy Loam to Clay',
    expectedYield: '2.1 Tons / Hectare',
    description: 'High drought resilience and excellent taproot aeration effect for deep soil layers. High market value index.',
    keyNutrients: ['N: Moderate', 'S: Critical', 'K: Moderate'],
    imageUrl: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=800',
    idealPh: '6.0 - 7.5'
  },
  {
    id: 'tomato',
    name: 'Heirloom Vine Tomato',
    scientificName: 'Solanum lycopersicum',
    suitability: 88,
    waterRequirement: 'High',
    growingPeriod: '75 - 90 days',
    soilCompatibility: 'Well-drained Loam',
    expectedYield: '38 Tons / Hectare',
    description: 'Requires controlled calcium balancing to prevent blossom rot. High return investment for precision drip systems.',
    keyNutrients: ['Ca: High', 'K: Very High', 'P: Moderate'],
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800',
    idealPh: '6.0 - 6.8'
  }
];
