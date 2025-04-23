import { Router, type Request, type Response } from 'express';
import cultivationRoutes from './cultivation/cultivation';
import mainRoute from './main/main';

const router = Router();

router.use('/', mainRoute);
router.use('/cultivation', cultivationRoutes);

router.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

export default router;
