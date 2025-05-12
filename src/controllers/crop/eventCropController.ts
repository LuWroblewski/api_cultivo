import { Request, Response } from 'express';
import db from '../../db';
import * as yup from 'yup';
import { cropEventSchema } from '../../schemas/cropSchema';
import { JsonResponse } from '../../types/jsonType';

export const getAllCropEvents = async (req: Request, res: Response) => {
  try {
    const cropEvents = await db('crop_events').select('*').orderBy('event_date', 'desc');

    const response: JsonResponse = {
      status: 200,
      message: 'Crop events found.',
      data: cropEvents,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);

    const response: JsonResponse = {
      status: 500,
      message: 'Error fetching crop events.',
      data: [],
    };

    res.status(500).json(response);
  }
};

export const createCropEvent = async (req: Request, res: Response) => {
  try {
    const data = await cropEventSchema.validate(req.body, { abortEarly: false });

    const newEvent = await db('crop_events').insert(data).returning('*');

    const response: JsonResponse = {
      status: 201,
      message: 'Crop event created successfully.',
      data: newEvent,
    };

    res.status(201).json(response);
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      const formattedErrors = error.errors.map((message) => ({ message }));

      const response: JsonResponse = {
        status: 400,
        message: 'Validation error.',
        data: formattedErrors,
      };

      res.status(400).json(response);
    }

    console.error(error);

    const response: JsonResponse = {
      status: 500,
      message: 'Internal server error.',
      data: [String(error)],
    };

    res.status(500).json(response);
  }
};
