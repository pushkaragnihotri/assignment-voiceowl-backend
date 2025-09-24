import express from 'express';
import transcriptionRouter from './routes/transcription.route';

const app = express();
app.use(express.json());

// health
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// transcription routes
app.use('/transcription', transcriptionRouter);

export default app;
