enum NodeEnv {
  DEV = 'dev',
  PRODUCTION = 'prod',
  TEST = 'test',
}

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export default {
  nodeEnv: process.env.ENVIRONMENT,
  isDevelopment: process.env.ENVIRONMENT === NodeEnv.DEV,
  isProduction: process.env.ENVIRONMENT === NodeEnv.PRODUCTION,
  version: process.env.npm_package_version ?? '0.0.0',
  log: {
    level: process.env.LOG_LEVEL,
  },
  server: {
    host: process.env.HOST,
    port: process.env.BACKEND_PORT,
  },
};
