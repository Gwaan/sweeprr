import { asValue } from 'awilix';
import { FastifyBaseLogger } from 'fastify';

declare global {
  export interface Dependencies {
    logger: FastifyBaseLogger;
  }
}

export function makeDependencies({ logger }: Dependencies) {
  return {
    logger: asValue(logger),
  };
}
