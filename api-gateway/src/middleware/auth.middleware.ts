import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const publicRoutes = [
      { method: 'GET', path: /^\/products/ },
      { method: 'POST', path: /^\/users$/ },
      { method: 'POST', path: /^\/auth\/login$/ },
    ];

    const isPublic = publicRoutes.some(
      (route) => req.method === route.method && route.path.test(req.path),
    );

    if (isPublic) {
      return next();
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No se proporcionó un token.');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req['user'] = decoded;
      next();
    } catch (error) {
      console.error('Token inválido: ', error);
      throw new UnauthorizedException('Token inválido');
    }
  }
}
