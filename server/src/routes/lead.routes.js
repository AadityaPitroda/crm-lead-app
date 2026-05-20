import { Router } from 'express';
import { getLeadsController } from '../controllers/leads.controller.js';
import { authRequired } from '../middleware/auth.middleware.js';

const router = Router();

// GET /api/leads?pagination/sort/filter/search
router.get('/', authRequired, getLeadsController);

export default router;