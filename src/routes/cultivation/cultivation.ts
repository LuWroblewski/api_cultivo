import { Router, Request, Response } from 'express';
import { createCultivation, getAllCultivations } from '../../controllers/cultivation/cultivationController';

const router = Router();

router.get('/', getAllCultivations);
router.post('/', createCultivation);

export default router;
