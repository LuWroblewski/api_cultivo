import { Request, Response } from 'express';
import db from '../../db';
import * as yup from 'yup';
import { cropSchema } from '../../schemas/cropSchema';
import { JsonResponse } from '../../types/jsonType';

export const getAllCrops = async (req: Request, res: Response) => {
  try {
    const cultivations = await db('crops').select('*');

    const response: JsonResponse = {
      status: 200,
      message: 'Crops found.',
      data: cultivations,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);

    const response: JsonResponse = {
      status: 500,
      message: 'Error fetching Crops.',
      data: [],
    };

    res.status(500).json(response);
  }
};

export const createCrop = async (req: Request, res: Response) => {
  try {
    const data = await cropSchema.validate(req.body, { abortEarly: false });

    const newCultivation = await db('crops').insert(data).returning('*');

    const response: JsonResponse = {
      status: 201,
      message: 'Crop created successfully.',
      data: newCultivation,
    };

    res.status(201).json(response);
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      const formattedErrors = error.errors.map((message) => ({
        message,
      }));

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
