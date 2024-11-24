import { di } from './di';
import AutoLoad from '@fastify/autoload';
import { FastifyInstance } from 'fastify';
import path from 'node:path';

export default async function createServer(fastify: FastifyInstance) {
  // Auto-load plugins
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    dirNameRoutePrefix: false,
  });
  // Setup DI
  await di(fastify);
}
