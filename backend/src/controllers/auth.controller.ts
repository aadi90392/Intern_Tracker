import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const signupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'intern']).default('admin') 
});

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = signupSchema.parse(req.body);
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'Email already in use' });
      return;
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    
   
    const user = await User.create({ name, email, password: hashedPassword, role });
    
    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    res.status(400).json({ error: 'Invalid format or missing fields' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = authSchema.parse(req.body);
    const user = await User.findOne({ email });
    
    if (!user || !user.password) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    res.status(200).json({ token, role: user.role, name: user.name });
  } catch (error) {
    res.status(400).json({ error: 'Invalid format' });
  }
};