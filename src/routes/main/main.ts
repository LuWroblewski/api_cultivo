import type { Request, Response } from 'express';
import { Router } from 'express';
import { JsonResponse } from '../../types/jsonType';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const response: JsonResponse = {
    status: 200,
    message: 'Root route accessed successfully.',
  };

  res.status(200).json(response);
});

router.get('/health', (req: Request, res: Response) => {
  const response: JsonResponse = {
    status: 200,
    message: 'Server is healthy.',
    data: {
      server: 'Server is running smoothly.',
    },
  };

  res.status(200).json(response);
});

router.get('/404', (req: Request, res: Response) => {
  const response: JsonResponse = {
    status: 404,
    message: 'Page not found.',
    data: [],
  };

  res.status(404).json(response);
});

export default router;
