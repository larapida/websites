import { Request, Response, NextFunction, RequestHandler } from 'express';
import { PrismaClient } from './client';

const client = new PrismaClient();

export const prisma: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.prisma = client;
  next();
};
