import { Sequelize, type SequelizeOptions } from 'sequelize-typescript'
import { env } from '../config/env'


const sequelizeOptions: SequelizeOptions = {
  dialect: env.SEQUELIZE_USERNAME,
  host: env.SEQUELIZE_HOST,
  logQueryParameters: env.SEQUELIZE_LOGGING,
  timezone: env.SEQUELIZE_TIMEZONE,
  schema: ".Split",
  models: [`${__dirname}/entities`],
  // repositoryMode: true,
}

const sequelize = new Sequelize(
  env.SEQUELIZE_DATABASE,
  env.SEQUELIZE_USERNAME,
  env.SEQUELIZE_PASSWORD,
  { ...sequelizeOptions }
)

const db =
  { sequelize }

export default db
