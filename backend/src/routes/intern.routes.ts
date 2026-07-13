import { Router } from 'express';
import { submitTask, getMyTasks } from '../controllers/intern.controller';
import { protect } from '../middlewares/auth.middleware';
import { isIntern } from '../middlewares/role.middleware';

const router = Router();
router.post('/task', protect, isIntern, submitTask);
router.get('/tasks', protect, isIntern, getMyTasks);
export default router;