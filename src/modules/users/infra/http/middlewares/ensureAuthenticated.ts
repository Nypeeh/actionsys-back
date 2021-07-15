import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '@config/auth'

import { AppError } from '@errors/AppError'

interface ITokenPayload {
  sub: string
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authToken = request.headers.authorization

  if (!authToken) throw new Error('JWT token is missing')

  const [, token] = authToken.split(' ')

  try {
    const { sub } = verify(token, authConfig.jwt.secret) as ITokenPayload

    request.user = {
      id: Number(sub),
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT token', 401)
  }
}
