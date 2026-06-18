import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const appOptions = { cors: true };
  const serverPort = process.env.PORT || 5001;
  const app = await NestFactory.create(AppModule, appOptions);

  app.setGlobalPrefix('api');

  await app.listen(serverPort);
}
bootstrap();
