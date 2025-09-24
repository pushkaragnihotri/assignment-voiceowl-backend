import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export function validate(schema: ObjectSchema, property: 'body' | 'query' = 'body') {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      return next({
        status: 400,
        message: error.details.map((d) => d.message).join(', '),
      });
    }

    next();
  };
}
