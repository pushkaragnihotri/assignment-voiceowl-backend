import { Request, Response } from 'express';
import { createAndTranscribe, getAllTranscriptions } from '../services/transcription.service';

export const createTranscription = async (req: Request, res: Response) => {
  const { audioUrl } = req.body;

  const record = await createAndTranscribe(audioUrl);

  return res.status(201).json({
    _id: record._id,
    audioUrl: record.audioUrl,
    transcription: record.transcription,
    status: record.status,
    createdAt: record.createdAt,
  });
};

export const listTranscriptions = async (req: Request, res: Response) => {
  const { status, limit, skip } = req.query;

  const records = await getAllTranscriptions(
    { status: status as string | undefined },
    {
      limit: limit ? parseInt(limit as string, 10) : undefined,
      skip: skip ? parseInt(skip as string, 10) : undefined,
    }
  );

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
