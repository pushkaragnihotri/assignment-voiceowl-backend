import { Router } from 'express';
import { createTranscription } from '../controllers/transcription.controller';

const router = Router();

// POST /transcription
router.post('/', createTranscription);

export default router;
