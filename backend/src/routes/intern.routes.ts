import { Router } from 'express';
import { submitTask, getMyTasks } from '../controllers/intern.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();
router.post('/task', protect, submitTask);
router.get('/tasks', protect, getMyTasks);
export default router;