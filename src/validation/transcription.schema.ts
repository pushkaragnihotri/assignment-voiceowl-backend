import Joi from 'joi';

export const createTranscriptionSchema = Joi.object({
  audioUrl: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required()
    .messages({
      'any.required': 'audioUrl is required',
      'string.empty': 'audioUrl cannot be empty',
      'string.uri': 'audioUrl must be a valid http/https URL',
    }),
});
