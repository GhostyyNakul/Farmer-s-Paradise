import fs from 'fs/promises';
import { createApp } from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

async function start() {
  await fs.mkdir('uploads', { recursive: true });
  await connectDatabase();

  const app = createApp();
  app.listen(env.PORT, () => {
    logger.info(`Farmer's Paradise API running on http://localhost:${env.PORT}`);
  });
}

start().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});
