import Joi from 'joi';

export const listTranscriptionsSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'completed', 'failed')
    .optional()
    .messages({
      'any.only': 'status must be one of: pending, completed, failed',
    }),

  limit: Joi.number().integer().min(1).max(100).optional().messages({
    'number.base': 'limit must be a number',
    'number.min': 'limit must be at least 1',
    'number.max': 'limit cannot be more than 100',
  }),

  skip: Joi.number().integer().min(0).optional().messages({
    'number.base': 'skip must be a number',
    'number.min': 'skip must be at least 0',
  }),
});
