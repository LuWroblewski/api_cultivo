import { Router } from 'express';
import { getAllCrops, createCrop } from '../../controllers/crop/cropController';
import { getAllCropEvents, createCropEvent } from '../../controllers/crop/eventCropController';
import { getCropsAndEvents } from '../../controllers/crop/cropsAndEvents';

const router = Router();

router.get('/', getAllCrops);
router.post('/', createCrop);

router.get('/events', getAllCropEvents);
router.post('/event', createCropEvent);

router.get('/cropsAndEvents', getCropsAndEvents);

export default router;
