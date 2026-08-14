import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { User } from '../models/User.js';
import { Farm } from '../models/Farm.js';
import { Crop } from '../models/Crop.js';
import { Laboratory } from '../models/Laboratory.js';
import { SoilSample } from '../models/SoilSample.js';
import { SoilReport } from '../models/SoilReport.js';
import { Notification } from '../models/Notification.js';
import { AIConsultation } from '../models/AIConsultation.js';
import { generateSoilInterpretation } from '../services/report.service.js';
import { logger } from '../utils/logger.js';

const DEMO_PASSWORD = 'Demo@12345';

async function seed() {
  await connectDatabase();

  logger.info('Clearing existing demo data...');
  await Promise.all([
    User.deleteMany({ email: 'demo@farmersparadise.dev' }),
    Laboratory.deleteMany({}),
  ]);

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 12);

  const user = await User.create({
    name: 'Demo Farmer (Development)',
    email: 'demo@farmersparadise.dev',
    phone: '+91 98765 43210',
    passwordHash,
    language: 'en',
    location: {
      latitude: 28.6139,
      longitude: 77.209,
      address: 'Connaught Place, New Delhi',
      district: 'Central Delhi',
      state: 'Delhi',
      country: 'India',
    },
  });

  const farm = await Farm.create({
    userId: user._id,
    name: 'Green Valley Demo Farm',
    location: {
      latitude: 28.7041,
      longitude: 77.1025,
      address: 'North Delhi Agricultural Zone',
    },
    totalArea: 12.5,
    areaUnit: 'hectares',
    soilType: 'Clay Loam',
    irrigationType: 'Drip',
  });

  const crops = await Crop.insertMany([
    {
      userId: user._id,
      farmId: farm._id,
      name: 'Golden Durum Wheat',
      variety: 'Triticum durum',
      plantingDate: new Date('2025-11-01'),
      expectedHarvestDate: new Date('2026-03-15'),
      area: 4.2,
      status: 'growing',
      healthStatus: 'attention',
      notes: 'Demo crop — yellowing on lower leaves observed',
      images: [],
    },
    {
      userId: user._id,
      farmId: farm._id,
      name: 'Heirloom Vine Tomato',
      variety: 'Solanum lycopersicum',
      plantingDate: new Date('2026-01-10'),
      expectedHarvestDate: new Date('2026-04-01'),
      area: 1.8,
      status: 'growing',
      healthStatus: 'healthy',
      images: [],
    },
    {
      userId: user._id,
      farmId: farm._id,
      name: 'Yellow Mustard',
      variety: 'Brassica juncea',
      plantingDate: new Date('2025-10-15'),
      expectedHarvestDate: new Date('2026-01-30'),
      area: 3.0,
      status: 'harvested',
      healthStatus: 'harvested',
      images: [],
    },
  ]);

  const labs = await Laboratory.insertMany([
    {
      name: 'AgriTech Central Spectrometry Lab',
      description: 'Accredited NIR and wet-chemistry soil diagnostics (Demo Data)',
      address: 'Green Valley Innovation Hub, New Delhi',
      latitude: 28.6289,
      longitude: 77.2065,
      phone: '+91 11 4567 8900',
      email: 'contact@agritech-demo.lab',
      services: ['HPLC Nutrient Assay', 'Microbiome DNA Sequencing', 'Heavy Metal Screen'],
      pricing: 'From ₹800 per sample',
      averageTurnaround: '24 Hours',
      rating: 4.9,
      isVerified: true,
      operatingHours: 'Mon-Sat 8AM-6PM',
    },
    {
      name: 'BioSoil Regional Diagnostics',
      description: 'Regional soil testing with drone sampling support (Demo Data)',
      address: 'North Ridge Agricultural Park, Delhi NCR',
      latitude: 28.7499,
      longitude: 77.1199,
      phone: '+91 11 3456 7890',
      email: 'info@biosoil-demo.lab',
      services: ['Standard N-P-K Test', 'Salinity & EC Profile', 'Drone Soil Sampling'],
      pricing: 'From ₹500 per sample',
      averageTurnaround: '48 Hours',
      rating: 4.8,
      isVerified: true,
      operatingHours: 'Mon-Fri 9AM-5PM',
    },
    {
      name: 'Terra Precision Analytics Center',
      description: 'Full spectroscopic scan and carbon audit (Demo Data)',
      address: 'Eastland Agri-Sciences Institute, Noida',
      latitude: 28.5355,
      longitude: 77.391,
      phone: '+91 120 456 7890',
      email: 'hello@terra-demo.lab',
      services: ['Full Spectroscopic Scan', 'Carbon Sequestration Audit', 'Custom Fertilizer Recipe'],
      pricing: 'From ₹1200 per sample',
      averageTurnaround: 'Same Day Express',
      rating: 4.95,
      isVerified: true,
      operatingHours: 'Mon-Sat 7AM-8PM',
    },
    {
      name: 'Krishi Bhawan Soil Testing Unit',
      description: 'Government-affiliated soil testing (Demo Data)',
      address: 'Krishi Bhawan, New Delhi',
      latitude: 28.6129,
      longitude: 77.2295,
      phone: '+91 11 2345 6789',
      email: 'soil@krishi-demo.gov.in',
      services: ['Basic N-P-K', 'pH & EC', 'Organic Carbon'],
      pricing: 'Subsidized rates',
      averageTurnaround: '72 Hours',
      rating: 4.5,
      isVerified: true,
      operatingHours: 'Mon-Fri 10AM-4PM',
    },
  ]);

  const sample = await SoilSample.create({
    userId: user._id,
    farmId: farm._id,
    laboratoryId: labs[0]._id,
    sampleCode: `FH-${new Date().getFullYear()}-000001`,
    collectionDate: new Date('2026-01-20'),
    submittedDate: new Date('2026-01-22'),
    status: 'report_ready',
    collectionLocation: {
      latitude: 28.7041,
      longitude: 77.1025,
      address: 'Plot A, Green Valley Demo Farm',
    },
    notes: 'Demo soil sample — development seed data',
    expectedReportDate: new Date('2026-01-25'),
  });

  const reportData = {
    soilSampleId: sample._id,
    laboratoryId: labs[0]._id,
    userId: user._id,
    pH: 6.6,
    nitrogen: 142,
    phosphorus: 28.4,
    potassium: 215,
    organicCarbon: 1.45,
    electricalConductivity: 0.42,
    moisture: 27.8,
    micronutrients: { zinc: 0.8, iron: 4.2, manganese: 1.1 },
    interpretation: 'Balanced soil with good organic matter. Slight attention to nitrogen in heavy feeders.',
    recommendations: [
      'Maintain organic mulch cover',
      'Split nitrogen application for tomato blocks',
      'Retest after rabi harvest',
    ],
    suitableCrops: ['Wheat', 'Mustard', 'Tomato', 'Maize'],
  };

  const interpretation = generateSoilInterpretation(reportData as never);
  const report = await SoilReport.create({
    ...reportData,
    summary: interpretation,
  });

  await Notification.insertMany([
    {
      userId: user._id,
      type: 'soil_sample_received',
      title: 'Soil Sample Received',
      message: `Your soil sample ${sample.sampleCode} has been received by the laboratory.`,
      read: true,
      metadata: { sampleCode: sample.sampleCode },
    },
    {
      userId: user._id,
      type: 'report_ready',
      title: 'Soil Report Ready',
      message: `Your soil report for sample ${sample.sampleCode} is now available.`,
      read: false,
      metadata: { sampleCode: sample.sampleCode, reportId: report._id.toString() },
    },
    {
      userId: user._id,
      type: 'crop_health_warning',
      title: 'Crop Health Alert',
      message: `${crops[0].name} requires attention. Review health status and recommendations.`,
      read: false,
      metadata: { cropId: crops[0]._id.toString() },
    },
  ]);

  await AIConsultation.create({
    userId: user._id,
    farmId: farm._id,
    cropId: crops[1]._id,
    messages: [
      {
        role: 'user',
        content: 'My tomato leaves are turning yellow around the edges.',
        timestamp: new Date('2026-02-01'),
      },
      {
        role: 'assistant',
        content:
          'Leaf margin chlorosis may indicate nitrogen mobility issues or irregular watering. Cross-referencing soil pH 6.6 and moisture 27.8%.',
        timestamp: new Date('2026-02-01'),
      },
    ],
    images: [],
    diagnosis: {
      summary: 'Possible early nitrogen deficiency',
      confidence: 'medium',
    },
    recommendations: [
      'Inspect lower vs upper leaf pattern',
      'Verify irrigation consistency',
      'Consult local agronomist if spreading',
    ],
  });

  logger.info('Seed completed successfully!');
  logger.info('Demo credentials: demo@farmersparadise.dev / Demo@12345');
  logger.info(`User ID: ${user._id}`);
  logger.info(`Farm ID: ${farm._id}`);

  await disconnectDatabase();
}

seed().catch(async (error) => {
  logger.error('Seed failed:', error);
  await mongoose.disconnect();
  process.exit(1);
});
