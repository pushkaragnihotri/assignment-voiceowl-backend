export const config = {
  port: process.env.PORT ?? 3000,
  mongoUri: process.env.MONGO_URI,
  retries: {
    audioDownloadMax: parseInt(process.env.AUDIO_DOWNLOAD_MAX_RETRIES || '3', 10),
    audioDownloadBaseDelayMs: parseInt(process.env.AUDIO_DOWNLOAD_BASE_DELAY_MS || '300', 10),
  },
};
