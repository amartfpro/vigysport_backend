import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new HttpException(
        'Token no proporcionado',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const response = await axios.post(
        `${process.env.USERS_SERVICE_URL}/auth/validate`,
        { token },
      );

      if (response.data.valid) {
        next();
      } else {
        throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      throw new HttpException(
        'Error al verificar el token',
        HttpStatus.UNAUTHORIZED,
        { cause: error },
      );
    }
  }
}
