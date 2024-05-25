import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserEntity } from '../auth/entity/user.entity';

export interface ExpressRequest extends Request {
  user?: UserEntity;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    console.log('received new request');
    // more log details goes here
    // we can integrate something like datadog or have our custom logging table and it can be accessed here
    next();
  }
}
