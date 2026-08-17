import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';

export interface ImageUploadResult {
  url: string;
  publicId?: string;
  provider: 'cloudinary' | 'local';
}

class ImageService {
  private cloudinaryConfigured = false;

  constructor() {
    if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET) {
      cloudinary.config({
        cloud_name: env.CLOUDINARY_CLOUD_NAME,
        api_key: env.CLOUDINARY_API_KEY,
        api_secret: env.CLOUDINARY_API_SECRET,
      });
      this.cloudinaryConfigured = true;
    }
  }

  async upload(filePath: string, folder = 'farmers-paradise'): Promise<ImageUploadResult> {
    if (this.cloudinaryConfigured) {
      try {
        const result = await cloudinary.uploader.upload(filePath, { folder });
        await this.safeUnlink(filePath);
        return {
          url: result.secure_url,
          publicId: result.public_id,
          provider: 'cloudinary',
        };
      } catch (error) {
        logger.warn('Cloudinary upload failed, falling back to local storage', error);
      }
    }

    const filename = path.basename(filePath);
    return {
      url: `/uploads/${filename}`,
      provider: 'local',
    };
  }

  async uploadBuffer(buffer: Buffer, filename: string, folder = 'farmers-paradise'): Promise<ImageUploadResult> {
    if (this.cloudinaryConfigured) {
      const result = await new Promise<{
        secure_url: string;
        public_id: string;
      }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder }, (err, res) => {
          if (err || !res) reject(err ?? new Error('Upload failed'));
          else resolve(res);
        });
        stream.end(buffer);
      });
      return { url: result.secure_url, publicId: result.public_id, provider: 'cloudinary' };
    }

    const uploadsDir = path.resolve('uploads');
    await fs.mkdir(uploadsDir, { recursive: true });
    const localPath = path.join(uploadsDir, filename);
    await fs.writeFile(localPath, buffer);
    return { url: `/uploads/${filename}`, provider: 'local' };
  }

  private async safeUnlink(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch {
      // ignore
    }
  }
}

export const imageService = new ImageService();
