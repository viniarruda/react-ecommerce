import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';

// Import from compiled dist/src/ where path aliases are resolved by tsc-alias
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { AppModule } = require('../dist/src/app.module');

const server = express();
let app: any;

async function bootstrap() {
  if (app) return app;
  app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    logger: ['error', 'warn'],
  });
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.init();
  return app;
}

export default async function handler(req: Request, res: Response) {
  await bootstrap();
  server(req, res);
}
