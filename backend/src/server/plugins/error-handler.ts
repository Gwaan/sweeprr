import { ApiErrorResponse, apiErrorResponseSchema } from '@/shared/api/api-error.response';
import { ExceptionBase } from '@/shared/exceptions/exception-base';
import { FastifyError, FastifyErrorCodes, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

const fastifyErrorCodesMap = {
  FST_ERR_VALIDATION: (error: FastifyError) => ({
    subErrors: (error.validation ?? []).map((validationError) => ({
      path: validationError.instancePath,
      message: validationError.message ?? '',
    })),
    statusCode: 400,
    message: 'Validation error',
    error: 'Bad Request', // https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1
  }),
  FST_ERR_NOT_FOUND: () => ({
    message: 'Not Found',
    error: 'Not Found',
    statusCode: 404, //  'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4',
  }),
};

async function errorHandlerPlugin(fastify: FastifyInstance) {
  fastify.setErrorHandler((error: FastifyError | Error, _, res) => {
    // Handle fastify errors
    const fastifyError =
      'code' in error
        ? fastifyErrorCodesMap[error.code as keyof FastifyErrorCodes]
        : undefined;

    if (fastifyError) {
      const response = fastifyError(error);
      return res.status(response.statusCode).send(response);
    }
    fastify.log.error(error);
    if (error instanceof ExceptionBase) {
      return res.status(error.statusCode).send({
        statusCode: error.statusCode,
        message: error.message,
        error: error.error,
      } satisfies ApiErrorResponse);
    }
  });
  fastify.addSchema(apiErrorResponseSchema);
}

export default fp(errorHandlerPlugin, {
  name: 'errorHandler',
});
