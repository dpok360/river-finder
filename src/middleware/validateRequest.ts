import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateNearbyQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    lat: Joi.number().min(-90).max(90).required().messages({
      'number.base': 'Latitude must be a number',
      'number.min': 'Latitude must be between -90 and 90',
      'number.max': 'Latitude must be between -90 and 90',
      'any.required': 'Latitude is required',
    }),
    lng: Joi.number().min(-180).max(180).required().messages({
      'number.base': 'Longitude must be a number',
      'number.min': 'Longitude must be between -180 and 180',
      'number.max': 'Longitude must be between -180 and 180',
      'any.required': 'Longitude is required',
    }),
    radius: Joi.number().min(0).max(100).default(10).messages({
      'number.base': 'Radius must be a number',
      'number.min': 'Radius must be greater than 0',
      'number.max': 'Radius cannot exceed 100 kilometers',
    }),
  });

  const { error } = schema.validate(req.query);

  if (error) {
    return res.status(400).json({
      success: false,
      error: 'Invalid coordinates provided',
      message: error.details[0].message,
    });
  }

  next();
};
