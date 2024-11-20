import { di } from './di';
import { FastifyInstance } from 'fastify';

export default async function createServer(fastify: FastifyInstance) {
  // Setup DI
  await di(fastify);
}
