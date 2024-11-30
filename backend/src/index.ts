import server from '@/server';
import * as dotenv from 'dotenv';
import Fastify from 'fastify';

dotenv.config();

async function init() {
  const fastify = Fastify({
    logger: {
      level: process.env.LOG_LEVEL,
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    },
  });
  await server(fastify);
  try {
    await fastify.listen({
      port: Number.parseInt(process.env.BACKEND_PORT!),
      host: process.env.HOST,
    });
  } catch (error) {
    fastify.log.error(error);
    // eslint-disable-next-line n/no-process-exit,unicorn/no-process-exit
    process.exit(1);
  }
}

init();
