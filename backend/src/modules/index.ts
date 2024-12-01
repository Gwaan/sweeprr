import { CommandBus, EventBus } from '@/shared/cqrs/bus.types';
import { asValue } from 'awilix';
import { FastifyBaseLogger } from 'fastify';

declare global {
  export interface Dependencies {
    logger: FastifyBaseLogger;
    queryBus: CommandBus;
    commandBus: CommandBus;
    eventBus: EventBus;
  }
}

export function makeDependencies({
  logger,
  queryBus,
  commandBus,
  eventBus,
}: {
  logger: FastifyBaseLogger;
  queryBus: CommandBus;
  commandBus: CommandBus;
  eventBus: EventBus;
}) {
  return {
    logger: asValue(logger),
    queryBus: asValue(queryBus),
    commandBus: asValue(commandBus),
    eventBus: asValue(eventBus),
  };
}
