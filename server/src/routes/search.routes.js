import { Router } from 'express';
import { globalSearchController } from '../controllers/search.controller.js';
import { authRequired } from '../middleware/auth.middleware.js';

const router = Router();

// GET /api/search/global?q=query&limit=10
router.get('/global', authRequired, globalSearchController);

export default router;