// IMPORTANT: _register must be the FIRST import.
// In CJS output, imports execute in declaration order,
// so aliases are registered before any NestJS module is loaded.
import './_register';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';
import { AppModule } from '../src/app.module';

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
