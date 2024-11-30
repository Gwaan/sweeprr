import { di } from '@/server/di';
import AutoLoad from '@fastify/autoload';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyInstance } from 'fastify';
import path from 'node:path';
import fastifyWebsocket from '@fastify/websocket';

export default async function createServer(fastify: FastifyInstance) {
  fastify.register(fastifyWebsocket);
  // Auto-load plugins
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    dirNameRoutePrefix: false,
  });

  // Configure Dependency Injection
  await di(fastify);

  // Auto-load routes
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, '../modules'),
    dirNameRoutePrefix: false,
    options: {
      autoPrefix: 'api',
    },
    matchFilter: (path) =>
      ['.route.', '.resolver'].some((e) => path.includes(e)),
  });

  return fastify.withTypeProvider<TypeBoxTypeProvider>();
}
