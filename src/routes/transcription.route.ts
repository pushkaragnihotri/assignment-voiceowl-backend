import { Router } from 'express';
import { createTranscription, listTranscriptions } from '../controllers/transcription.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// POST /transcription
router.post('/', asyncHandler(createTranscription));

// GET /transcription
router.get('/', asyncHandler(listTranscriptions));

export default router;
