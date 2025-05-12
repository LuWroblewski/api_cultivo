import { Request, Response } from 'express';
import db from '../../db';
import { JsonResponse } from '../../types/jsonType';

export const getCropsAndEvents = async (req: Request, res: Response) => {
  try {
    const crops = await db('crops').select('*');

    const cropsWithEvents = await Promise.all(
      crops.map(async (crop) => {
        const events = await db('crop_events')
          .where({ crop_id: crop.id })
          .select('id', 'event_type', 'event_date')
          .orderBy('event_date', 'asc');

        return {
          ...crop,
          events,
        };
      })
    );

    const response: JsonResponse = {
      status: 200,
      message: 'Crops with events found.',
      data: cropsWithEvents,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);

    const response: JsonResponse = {
      status: 500,
      message: 'Error fetching crops with events.',
      data: [],
    };

    res.status(500).json(response);
  }
};

export const getCropAndEventsByUUID = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  try {
    const crop = await db('crops').where({ id: uuid }).first();

    if (!crop) {
      const response: JsonResponse = {
        status: 404,
        message: 'Crop not found.',
        data: [],
      };

      res.status(404).json(response);
    }

    const events = await db('crop_events')
      .where({ crop_id: crop.id })
      .select('id', 'event_type', 'event_date')
      .orderBy('event_date', 'asc');

    const response: JsonResponse = {
      status: 200,
      message: 'Crop with events found.',
      data: [{ ...crop, events }],
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);

    const response: JsonResponse = {
      status: 500,
      message: 'Error fetching crop with events.',
      data: [],
    };

    res.status(500).json(response);
  }
};
