import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import app from './app';
import { connectDB } from './db';

const PORT = process.env.PORT ?? 3000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start app', err);
    process.exit(1);
  }
}

start();
