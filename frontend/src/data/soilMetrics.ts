export interface SoilMetric {
  id: string;
  name: string;
  symbol: string;
  value: string;
  unit: string;
  status: 'Optimal' | 'Good' | 'Attention Required';
  depth: string;
  description: string;
  optimalRange: string;
}

export const SOIL_METRICS: SoilMetric[] = [
  {
    id: 'ph',
    name: 'Soil Reaction',
    symbol: 'pH',
    value: '6.6',
    unit: 'pH',
    status: 'Optimal',
    depth: '15 - 30 cm',
    description: 'Slightly acidic to neutral. Perfectly balanced for maximum nutrient bio-availability.',
    optimalRange: '6.2 - 7.2'
  },
  {
    id: 'n',
    name: 'Available Nitrogen',
    symbol: 'N',
    value: '142',
    unit: 'kg/ha',
    status: 'Good',
    depth: '0 - 20 cm',
    description: 'Supports vigorous vegetative canopy growth and leaf chlorophyll synthesis.',
    optimalRange: '130 - 180 kg/ha'
  },
  {
    id: 'p',
    name: 'Phosphorus Index',
    symbol: 'P',
    value: '28.4',
    unit: 'mg/kg',
    status: 'Optimal',
    depth: '10 - 25 cm',
    description: 'Accelerates early root establishment and seed formation efficiency.',
    optimalRange: '25 - 35 mg/kg'
  },
  {
    id: 'k',
    name: 'Potassium Reserves',
    symbol: 'K',
    value: '215',
    unit: 'mg/kg',
    status: 'Optimal',
    depth: '15 - 40 cm',
    description: 'Enhances crop disease immunity and stomatal water regulation during dry spells.',
    optimalRange: '200 - 260 mg/kg'
  },
  {
    id: 'moisture',
    name: 'Volumetric Moisture',
    symbol: 'VWC',
    value: '27.8',
    unit: '%',
    status: 'Good',
    depth: 'Root zone',
    description: 'Ideal capillary pressure in rhizosphere layer. No waterlogging detected.',
    optimalRange: '24% - 32%'
  },
  {
    id: 'carbon',
    name: 'Soil Organic Carbon',
    symbol: 'SOC',
    value: '1.45',
    unit: '%',
    status: 'Optimal',
    depth: 'Topsoil',
    description: 'Rich active microbial ecosystem fostering natural humus synthesis and soil structure.',
    optimalRange: '> 1.2%'
  }
];
