import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe} from '@nestjs/common';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import { DecodeURIPipe } from './pipes/decodeURI.pipe';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(
    path.resolve(path.join(__dirname, '..', 'client/public')));
  await app.listen(3002);
}
bootstrap();
