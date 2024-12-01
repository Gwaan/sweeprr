import {
  getSystemInfoQuery,
  GetSystemInfoQueryResult,
} from '@/modules/system/queries/get-system-infos/get-system-info.handler';
import { FastifyInstance } from 'fastify';

export default async function getSystemInfo(fastify: FastifyInstance) {
  fastify.get('/v1/system-info', { websocket: true }, async (socket, _) => {
    const intervalFn = async () => {
      try {
        const result =
          await fastify.queryBus.execute<GetSystemInfoQueryResult>(
            getSystemInfoQuery(),
          );
        socket.send(JSON.stringify(result));
      } catch (error) {
        fastify.log.error(error);
        clearInterval(interval);
        socket.close();
      }
    };
    const interval = setInterval(intervalFn, 2000);
    socket.on('close', () => {
      clearInterval(interval);
      socket.close();
    });
  });
}
