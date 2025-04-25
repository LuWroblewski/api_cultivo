import { Request, Response } from 'express';
import db from '../../db';

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

    res.status(200).json({
      status: 200,
      message: 'Crops with events found.',
      data: cropsWithEvents,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: 500,
      message: 'Error fetching crops with events.',
      data: [],
    });
  }
};
