import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access Denied. Admins only.' });
  }
};

export const isIntern = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === 'intern') {
    next();
  } else {
    res.status(403).json({ error: 'Access Denied. Interns only.' });
  }
};