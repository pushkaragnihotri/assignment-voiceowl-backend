import TranscriptionModel, { ITranscription } from '../models/transcription.model';
import { config } from '../config';

/**
 * Mock audio download with random failure.
 */
async function mockDownloadAudio(audioUrl: string): Promise<Buffer> {
  const random = Math.random();
  if (random < 0.3) {
    throw new Error('Network error while downloading audio');
  }
  return Buffer.from(`audio-data-from-${audioUrl}`);
}

/** Retry wrapper with exponential backoff, using config */
async function retryDownload(audioUrl: string): Promise<Buffer> {
  const retries = config.retries.audioDownloadMax;
  const baseDelayMs = config.retries.audioDownloadBaseDelayMs;

  let attempt = 0;
  while (attempt <= retries) {
    try {
      return await mockDownloadAudio(audioUrl);
    } catch (err) {
      attempt++;
      if (attempt > retries) throw err;

      const delay = baseDelayMs * Math.pow(2, attempt - 1);
      console.warn(`Download failed (attempt ${attempt}), retrying in ${delay}ms`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error('Download retries exhausted');
}

/** Mock transcription */
async function mockTranscribeAudio(audio: Buffer): Promise<string> {
  return `mock transcription of ${audio.toString().slice(0, 30)}...`;
}

/** Full flow: save record → download with retry → transcribe → update */
export async function createAndTranscribe(audioUrl: string): Promise<ITranscription> {
  // initial record
  const doc = await TranscriptionModel.create({
    audioUrl,
    status: 'pending',
    transcription: ''
  });

  try {
    const audio = await retryDownload(audioUrl);
    const text = await mockTranscribeAudio(audio);

    doc.transcription = text;
    doc.status = 'completed';
    await doc.save();
  } catch (err) {
    doc.status = 'failed';
    await doc.save();
    throw err;
  }

  return doc;
}
