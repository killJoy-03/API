import 'dotenv/config'

/**
 *
 * @param value
 * @param fallback
 * @returns
 */
function getEnv(value: any, fallback?: any): any {
  const result = process.env[value];

  // check env value
  if ([undefined, null, ''].includes(result)) {
    // check fallback
    if (fallback) {
      return fallback
    }

    return undefined
  }

  return result
}

/**
 * App Env
 */
const appEnv = {
  // Application
  NODE_ENV: getEnv('NODE_ENV', 'development'),

  APP_NAME: getEnv('APP_NAME', '.SplitAPI'),
  APP_PORT: Number(getEnv('APP_PORT', 8080)),
}

const seed = {
  ROLE_SEED: getEnv('ROLE_SEED', false),
  USER_SEED: getEnv('USER_SEED', false),
}

/**
 * Database Env
 */
const databaseEnv = {
  SEQUELIZE_CONNECTION: getEnv('SEQUELIZE_CONNECTION', 'postgres'),
  SEQUELIZE_HOST: getEnv('SEQUELIZE_HOST', '127.0.0.1'),
  SEQUELIZE_PORT: Number(getEnv('SEQUELIZE_PORT', 5432)),
  SEQUELIZE_DATABASE: getEnv('SEQUELIZE_DATABASE', '.Split'),
  SEQUELIZE_USERNAME: getEnv('SEQUELIZE_USERNAME', 'postgres'),
  SEQUELIZE_PASSWORD: getEnv('SEQUELIZE_PASSWORD', 'admin'),
  SEQUELIZE_SYNC: getEnv('SEQUELIZE_SYNC', false),
  SEQUELIZE_LOGGING: getEnv('SEQUELIZE_LOGGING', true),
  SEQUELIZE_TIMEZONE: getEnv('SEQUELIZE_TIMEZONE', 'Asia/Jakarta'),
}

export const env = {
  ...appEnv,
  ...databaseEnv,
  ...seed
}
