import 'dotenv/config';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), AuthModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
