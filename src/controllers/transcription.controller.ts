import { Request, Response } from 'express';
import { createAndTranscribe, getAllTranscriptions } from '../services/transcription.service';

export const createTranscription = async (req: Request, res: Response) => {
  const { audioUrl } = req.body ?? {};

  if (!audioUrl || typeof audioUrl !== 'string') {
    res.status(400);
    throw new Error('audioUrl (string) is required');
  }

  const record = await createAndTranscribe(audioUrl);

  return res.status(201).json({
    _id: record._id,
    audioUrl: record.audioUrl,
    transcription: record.transcription,
    status: record.status,
    createdAt: record.createdAt,
  });
};

export const listTranscriptions = async (_req: Request, res: Response) => {
  const records = await getAllTranscriptions();

  return res.json(
    records.map((r) => ({
      _id: r._id,
      audioUrl: r.audioUrl,
      transcription: r.transcription,
      status: r.status,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }))
  );
};
