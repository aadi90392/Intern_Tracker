import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { Timesheet } from '../models/Timesheet';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

export const addIntern = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newIntern = await User.create({ name, email, password: hashedPassword, role: 'intern' });
    res.status(201).json({ message: 'Intern added', id: newIntern._id });
  } catch (error) {
    res.status(400).json({ error: 'Failed to add intern' });
  }
};

export const getAllTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tasks = await Timesheet.find().populate('internId', 'name email').sort({ date: -1 });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};