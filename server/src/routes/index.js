import { Router } from 'express';
import leadsRoutes from './lead.routes.js';
import authRoutes from './auth.routes.js';
import searchRoutes from './search.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/leads', leadsRoutes);
router.use('/search', searchRoutes);

export default router;