import { SoilSample } from '../models/SoilSample.js';

export async function generateSampleCode(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `FH-${year}-`;

  const lastSample = await SoilSample.findOne({ sampleCode: new RegExp(`^${prefix}`) })
    .sort({ sampleCode: -1 })
    .select('sampleCode');

  let nextNumber = 1;
  if (lastSample?.sampleCode) {
    const parts = lastSample.sampleCode.split('-');
    const lastNum = parseInt(parts[2] ?? '0', 10);
    nextNumber = lastNum + 1;
  }

  return `${prefix}${String(nextNumber).padStart(6, '0')}`;
}

export function getSampleProgress(status: string): number {
  const progressMap: Record<string, number> = {
    created: 10,
    submitted: 25,
    received: 45,
    testing: 70,
    report_ready: 100,
    cancelled: 0,
  };
  return progressMap[status] ?? 0;
}

export function estimateReportDate(submittedDate?: Date, turnaroundDays = 3): Date | undefined {
  if (!submittedDate) return undefined;
  const date = new Date(submittedDate);
  date.setDate(date.getDate() + turnaroundDays);
  return date;
}
