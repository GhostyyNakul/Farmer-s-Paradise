import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';

export interface AiChatContext {
  cropName?: string;
  cropVariety?: string;
  farmLocation?: string;
  soilInfo?: string;
  previousMessages?: { role: string; content: string }[];
  userMessage: string;
}

export interface AiChatResponse {
  summary: string;
  possibleCauses: string[];
  whatToCheck: string[];
  recommendedActions: string[];
  whenToSeekExpert: string;
  confidence: 'low' | 'medium' | 'high';
  isMock?: boolean;
}

export interface CropAnalysisResponse {
  crop: string;
  possibleIssues: string[];
  visibleSymptoms: string[];
  recommendedNextSteps: string[];
  confidence: 'low' | 'medium' | 'high';
  isMock?: boolean;
}

const SAFETY_SYSTEM_PROMPT = `You are an agricultural assistant for Farmer's Paradise.
Rules:
- Never prescribe specific pesticides or hazardous chemicals without qualified expert consultation.
- Identify possible causes but explain uncertainty clearly.
- Ask for missing information when needed.
- Suggest safe agricultural practices.
- Recommend consulting a qualified agricultural expert when appropriate.
- Never claim certainty without sufficient evidence.
Respond ONLY with valid JSON matching the requested schema.`;

class AiService {
  private genAI: GoogleGenerativeAI | null = null;

  constructor() {
    if (env.GEMINI_API_KEY) {
      this.genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
      logger.info('AI service using Google Gemini');
    } else {
      logger.info('AI service using mock responses (no GEMINI_API_KEY)');
    }
  }

  async chat(context: AiChatContext): Promise<AiChatResponse> {
    if (!this.genAI) {
      return this.mockChatResponse(context);
    }

    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: SAFETY_SYSTEM_PROMPT,
      });

      const prompt = this.buildChatPrompt(context);
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const parsed = this.parseJsonResponse<AiChatResponse>(text);
      return this.validateChatResponse(parsed);
    } catch (error) {
      logger.warn('Gemini chat failed, using mock response', error);
      return this.mockChatResponse(context);
    }
  }

  async analyzeCropImage(
    imagePath: string,
    cropName: string,
    cropVariety?: string
  ): Promise<CropAnalysisResponse> {
    if (!this.genAI) {
      return this.mockCropAnalysis(cropName);
    }

    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: SAFETY_SYSTEM_PROMPT,
      });

      const imageBuffer = await fs.readFile(imagePath);
      const base64 = imageBuffer.toString('base64');
      const mimeType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';

      const prompt = `Analyze this crop image for ${cropName}${cropVariety ? ` (${cropVariety})` : ''}.
Return JSON: { "crop": string, "possibleIssues": string[], "visibleSymptoms": string[], "recommendedNextSteps": string[], "confidence": "low"|"medium"|"high" }
Do not recommend hazardous chemicals. Keep recommendations general and safe.`;

      const result = await model.generateContent([
        prompt,
        { inlineData: { data: base64, mimeType } },
      ]);

      const text = result.response.text();
      const parsed = this.parseJsonResponse<CropAnalysisResponse>(text);
      return {
        crop: parsed.crop ?? cropName,
        possibleIssues: parsed.possibleIssues ?? [],
        visibleSymptoms: parsed.visibleSymptoms ?? [],
        recommendedNextSteps: parsed.recommendedNextSteps ?? [],
        confidence: parsed.confidence ?? 'medium',
      };
    } catch (error) {
      logger.warn('Gemini vision failed, using mock response', error);
      return this.mockCropAnalysis(cropName);
    }
  }

  async explainRecommendation(crop: string, reason: string): Promise<string> {
    if (!this.genAI) return reason;

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(
        `Briefly explain in 1-2 sentences why ${crop} is recommended: ${reason}. Keep it farmer-friendly.`
      );
      return result.response.text().trim();
    } catch {
      return reason;
    }
  }

  private buildChatPrompt(context: AiChatContext): string {
    const parts = [
      `Farmer question: "${context.userMessage}"`,
      context.cropName ? `Crop: ${context.cropName}` : '',
      context.cropVariety ? `Variety: ${context.cropVariety}` : '',
      context.farmLocation ? `Farm location: ${context.farmLocation}` : '',
      context.soilInfo ? `Soil info: ${context.soilInfo}` : '',
    ].filter(Boolean);

    if (context.previousMessages?.length) {
      parts.push('Previous conversation:');
      context.previousMessages.forEach((m) => parts.push(`${m.role}: ${m.content}`));
    }

    parts.push(`Return JSON: { "summary": string, "possibleCauses": string[], "whatToCheck": string[], "recommendedActions": string[], "whenToSeekExpert": string, "confidence": "low"|"medium"|"high" }`);

    return parts.join('\n');
  }

  private parseJsonResponse<T>(text: string): T {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in AI response');
    return JSON.parse(jsonMatch[0]) as T;
  }

  private validateChatResponse(parsed: Partial<AiChatResponse>): AiChatResponse {
    return {
      summary: parsed.summary ?? 'Analysis complete.',
      possibleCauses: parsed.possibleCauses ?? [],
      whatToCheck: parsed.whatToCheck ?? [],
      recommendedActions: parsed.recommendedActions ?? [],
      whenToSeekExpert: parsed.whenToSeekExpert ?? 'Consult a local agricultural expert if symptoms persist.',
      confidence: parsed.confidence ?? 'medium',
    };
  }

  private mockChatResponse(context: AiChatContext): AiChatResponse {
    return {
      summary: `Based on your question about "${context.userMessage.slice(0, 80)}...", several factors could be involved.`,
      possibleCauses: [
        'Nutrient deficiency (especially nitrogen)',
        'Irregular watering or drainage issues',
        'Early pest or disease pressure',
      ],
      whatToCheck: [
        'Inspect lower vs upper leaves for pattern of yellowing',
        'Check soil moisture at root depth',
        'Review recent fertilizer and irrigation schedule',
      ],
      recommendedActions: [
        'Take clear photos of affected leaves in natural light',
        'Test soil if not done recently',
        'Ensure consistent irrigation without waterlogging',
      ],
      whenToSeekExpert: 'If yellowing spreads rapidly or affects new growth, contact a local agronomist.',
      confidence: 'medium',
      isMock: true,
    };
  }

  private mockCropAnalysis(cropName: string): CropAnalysisResponse {
    return {
      crop: cropName,
      possibleIssues: ['Possible nitrogen deficiency', 'Minor leaf stress'],
      visibleSymptoms: ['Yellowing at leaf margins', 'Slight chlorosis on lower leaves'],
      recommendedNextSteps: [
        'Monitor spread over 3-5 days',
        'Verify irrigation schedule',
        'Consider soil test if not recent',
        'Consult local extension officer before applying treatments',
      ],
      confidence: 'medium',
      isMock: true,
    };
  }
}

export const aiService = new AiService();
