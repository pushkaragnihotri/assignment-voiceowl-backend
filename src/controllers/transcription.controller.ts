import { Request, Response } from 'express';
import { createAndTranscribe } from '../services/transcription.service';

export const createTranscription = async (req: Request, res: Response) => {
  const { audioUrl } = req.body ?? {};

  if (!audioUrl || typeof audioUrl !== 'string') {
    return res.status(400).json({ error: 'audioUrl (string) is required' });
  }

  try {
    const record = await createAndTranscribe(audioUrl);
    return res.status(201).json({
      _id: record._id,
      audioUrl: record.audioUrl,
      transcription: record.transcription,
      status: record.status,
      createdAt: record.createdAt
    });
  } catch (err) {
    console.error('Transcription failed:', err);
    return res.status(500).json({ error: 'Failed to process transcription' });
  }
};
