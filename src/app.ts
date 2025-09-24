import express from 'express';
import transcriptionRouter from './routes/transcription.route';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(express.json());

// health
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// transcription routes
app.use('/transcription', transcriptionRouter);

// global error handler
app.use(errorHandler);

export default app;
