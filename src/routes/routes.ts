import { Router, type Request, type Response } from 'express';
import cultivationRoutes from './crop/crop';
import mainRoute from './main/main';

const router = Router();

router.use('/', mainRoute);
router.use('/crop', cultivationRoutes);

router.use((req: Request, res: Response) => {
  res.redirect('/404');
});

export default router;
