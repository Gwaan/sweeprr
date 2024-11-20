import { makeDependencies } from '../../modules';
import { formatName } from './util';
import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix';
import { asFunction, Lifetime } from 'awilix';
import { FastifyInstance } from 'fastify';
import path from 'node:path';

export async function di(fastify: FastifyInstance) {
  diContainer
    .register({ ...makeDependencies })
    .loadModules(
      [
        path.join(
          __dirname,
          '../../modules/**/*.{repository,mapper,service}.ts',
        ),
      ],
      {
        formatName,
        resolverOptions: {
          register: asFunction,
          lifetime: Lifetime.SINGLETON,
        },
      },
    );
  await fastify.register(fastifyAwilixPlugin, {
    container: diContainer,
    asyncInit: true,
  });
}
