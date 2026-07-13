import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { Timesheet } from '../models/Timesheet';
import { z } from 'zod';

const taskSchema = z.object({
  taskTitle: z.string().min(3),
  description: z.string().optional(),
  githubLink: z.string().url().optional(),
  status: z.enum(['Completed', 'In Progress', 'Blocked'])
});

export const submitTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const parsedData = taskSchema.parse(req.body);
    const newEntry = await Timesheet.create({
      internId: req.user?.id,
      ...parsedData
    });
    res.status(201).json({ message: 'Task logged successfully', data: newEntry });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data provided' });
  }
};

export const getMyTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tasks = await Timesheet.find({ internId: req.user?.id }).sort({ date: -1 });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};