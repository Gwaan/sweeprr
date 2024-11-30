import {
  getSystemInfoQuery,
  GetSystemInfoQueryResult,
} from '@/modules/system/queries/get-system-infos/get-system-info.handler';
import { FastifyInstance } from 'fastify';

export default async function getSystemInfo(fastify: FastifyInstance) {
  fastify.get('/v1/system-info', { websocket: true }, async (socket, _) => {
    const intervalFn = async () => {
      const result = await fastify.queryBus.execute<GetSystemInfoQueryResult>(
        getSystemInfoQuery(),
      );
      socket.send(JSON.stringify(result));
    };

    const interval = setInterval(intervalFn, 500);

    socket.on('close', () => {
      clearInterval(interval);
    });
  });
}
