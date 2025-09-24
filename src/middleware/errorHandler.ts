import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error('ERROR ➟ ', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  return res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
}
