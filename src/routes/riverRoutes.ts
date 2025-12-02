import { Router } from 'express';
import { getNearbyRivers } from '../controllers/riverController.js';
import { validateNearbyQuery } from '../middleware/validateRequest.js';

const router = Router();

router.get('/', validateNearbyQuery, getNearbyRivers);

export default router;
