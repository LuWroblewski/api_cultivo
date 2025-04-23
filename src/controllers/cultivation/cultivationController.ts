import { Request, Response } from 'express';
import db from '../../db';
import * as yup from 'yup';
import { cultivationSchema } from '../../schemas/cultivation/cultivationSchema';

export const getAllCultivations = async (req: Request, res: Response) => {
  try {
    const cultivations = await db('crops').select('*');

    res.status(200).json({
      status: 200,
      message: 'Cultivations found.',
      data: cultivations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: 500,
      message: 'Error fetching cultivations.',
      data: [],
    });
  }
};

export const createCultivation = async (req: Request, res: Response) => {
  try {
    const data = await cultivationSchema.validate(req.body, { abortEarly: false });

    const newCultivation = await db('crops').insert(data).returning('*');

    res.status(201).json({
      status: 201,
      message: 'Cultivation created successfully.',
      data: newCultivation,
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
      data: [error],
    });
  }
};
