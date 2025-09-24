import { Router } from 'express';
import { createTranscription, listTranscriptions } from '../controllers/transcription.controller';

const router = Router();

// POST /transcription
router.post('/', createTranscription);

// GET /transcription
router.get('/', listTranscriptions);

export default router;
