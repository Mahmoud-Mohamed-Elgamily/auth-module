import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserEntity } from '../auth/entity/user.entity';
import { AuthService } from '../auth/auth.service';

export interface ExpressRequest extends Request {
  user?: UserEntity;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers['authorization'].split(' ')[1];

    try {
      const decode = verify(token, 'JWT_SECRET') as { email: string };
      const user = await this.authService.findByEmail(decode.email);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
