import { Request, Response } from 'express';
import db from '../../db';
import * as yup from 'yup';
import { cropEventSchema } from '../../schemas/cropSchema';

export const getAllCropEvents = async (req: Request, res: Response) => {
  try {
    const cropEvents = await db('crop_events').select('*').orderBy('event_date', 'desc');

    res.status(200).json({
      status: 200,
      message: 'Crop events found.',
      data: cropEvents,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: 500,
      message: 'Error fetching crop events.',
      data: [],
    });
  }
};

export const createCropEvent = async (req: Request, res: Response) => {
  try {
    const data = await cropEventSchema.validate(req.body, { abortEarly: false });

    const newEvent = await db('crop_events').insert(data).returning('*');

    res.status(201).json({
      status: 201,
      message: 'Crop event created successfully.',
      data: newEvent,
    });
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      const formattedErrors = error.errors.map((message) => ({
        message,
      }));

      res.status(400).json({
        status: 400,
        message: 'Validation error.',
        data: formattedErrors,
      });
    }

    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error.',
      data: [String(error)],
    });
  }
};
