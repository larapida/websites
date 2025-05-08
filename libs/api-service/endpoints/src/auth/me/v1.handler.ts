import { HttpError } from '@larapida-websites/shared-service-utils';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Route handler that verifies and decodes a JWT token from the Authorization header.
 *
 * - Requires `Authorization: Bearer <token>` header format.
 * - Requires `process.env.SECRETKEY` to be defined.
 * - On success, responds with the decoded token payload.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function for error forwarding
 */
export function handler(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(new HttpError(401, 'Token mancante o malformato'));
  }

  const token = authHeader?.split(' ')[1];

  // Check if SECRETKEY is set
  if (!process.env.SECRETKEY) {
    console.error('IMPOSTARE SECRETKEY');
    next(new HttpError(500, 'Errore interno del server'));
  }

  try {
    const payload = jwt.verify(
      token as string,
      process.env.SECRETKEY as string
    );

    res.json(payload);
  } catch (error) {
    console.error(error);
    next(new HttpError(401, 'Token non valido'));
  }
}
