import 'reflect-metadata';
import type { IncomingMessage, ServerResponse } from 'node:http';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

import { AppModule } from '../src/app.module.js';

/**
 * Vercel Function entrypoint. Every path is rewritten here (see vercel.json)
 * so Nest's own routing handles everything. The Nest app is built once and
 * reused across invocations on the same warm Fluid Compute instance.
 */
const server = express();
let bootstrapped: Promise<void> | null = null;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  bootstrapped ??= bootstrap();
  await bootstrapped;
  server(req, res);
}
