import type { Response } from 'express';
import { SoilReport } from '../models/SoilReport.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/response.js';
import { generateSoilInterpretation } from '../services/report.service.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export async function listReports(req: AuthRequest, res: Response): Promise<void> {
  const reports = await SoilReport.find({ userId: req.user!._id })
    .populate('soilSampleId', 'sampleCode status')
    .populate('laboratoryId', 'name')
    .sort({ createdAt: -1 });
  sendSuccess(res, reports);
}

export async function getReport(req: AuthRequest, res: Response): Promise<void> {
  const report = await SoilReport.findOne({
    _id: req.params.id,
    userId: req.user!._id,
  })
    .populate('soilSampleId', 'sampleCode status collectionDate')
    .populate('laboratoryId', 'name address phone');

  if (!report) throw new ApiError(404, 'NOT_FOUND', 'Report not found');

  const interpretation = report.summary ?? generateSoilInterpretation(report);
  if (!report.summary) {
    report.summary = interpretation;
    await report.save();
  }

  sendSuccess(res, { ...report.toObject(), interpretation });
}
