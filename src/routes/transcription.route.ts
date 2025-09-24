import { Router } from 'express';
import { createTranscription, listTranscriptions } from '../controllers/transcription.controller';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middleware/validate';
import { createTranscriptionSchema } from '../validation/transcription.schema';
import { listTranscriptionsSchema } from '../validation/transcription.query.schema';

const router = Router();

// POST /transcription
router.post('/', validate(createTranscriptionSchema), asyncHandler(createTranscription));

// GET /transcription
router.get('/', validate(listTranscriptionsSchema, 'query'), asyncHandler(listTranscriptions));

export default router;
