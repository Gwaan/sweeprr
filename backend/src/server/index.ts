import { di } from './di';
import { FastifyInstance } from 'fastify';
import path from 'node:path';
import AutoLoad from '@fastify/autoload';

export default async function createServer(fastify: FastifyInstance) {
  // Auto-load plugins
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    dirNameRoutePrefix: false,
  });
  // Setup DI
  await di(fastify);
}
