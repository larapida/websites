import { NextFunction, Request, Response } from 'express';
import { HttpError } from '@larapida-websites/shared-service-utils';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Handles user login by validating email and password, and returns a signed JWT token on success.
 *
 * @example
 * // POST /api/v1/auth/login
 * // Body: { "email": "user@example.com", "password": "secret" }
 *
 * @param req - Express request object containing `email` and `password` in the body
 * @param res - Express response object used to send back token or error
 * @returns A JSON response with a JWT token if authentication succeeds, or an error message otherwise
 */
export async function handler(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body ?? {};

  // Check if both email and password are provided
  if (!email || !password) {
    next(new HttpError(400, 'Email e password sono richiesti'));
  }

  try {
    // Retrieve user by email
    const user = await req.prisma.user.findUnique({ where: { email } });

    // If user does not exist or password is invalid, return an error
    if (!user || !bcrypt.compareSync(password, user.password)) {
      next(new HttpError(401, 'Credenziali non valide'));
    }

    // Check if SECRET_KEY is set
    if (!process.env.SECRET_KEY) {
      console.error('IMPOSTARE SECRET_KEY');
      next(new HttpError(500, 'Errore interno del server'));
    }

    // Create JWT payload
    const payload = {
      id: user?.id,
      isAdmin: user?.isAdmin,
    };

    // Sign JWT token with 7-day expiration
    const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
      expiresIn: '7d',
    });

    // Send token in response
    res.json({ token });
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    next(new HttpError(500, 'Errore interno del server'));
  }
}
