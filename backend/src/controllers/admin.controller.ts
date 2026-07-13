import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { Timesheet } from '../models/Timesheet';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const addInternSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
});

export const addIntern = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, password } = addInternSchema.parse(req.body);

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ error: 'Email already in use' });
      return;
    }

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