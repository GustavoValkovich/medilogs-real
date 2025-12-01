import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface JwtPayloadExtended {
  sub?: string | number;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers?.authorization as string | undefined;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'No autorizado' });
  const token = auth.slice('Bearer '.length);
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    // eslint-disable-next-line no-console
    console.error('JWT_SECRET is not configured');
    return res.status(500).json({ message: 'Server misconfiguration' });
  }
  try {
    const payload = jwt.verify(token, secret) as JwtPayloadExtended;
    (req as any).user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

export default authMiddleware;
