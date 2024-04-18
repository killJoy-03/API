import { type NextFunction, type Request, type Response } from 'express'
import _ from 'lodash'
import { BaseError, EmptyResultError, ValidationError } from 'sequelize'
import logger from '../../logger/logger.index';
import { green } from 'colorette';

function msg(message: string): string {
  return `${green("Sequelize Error")}: ${message}`
}

async function expressErrorSequelize(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> {
  if (!(err instanceof BaseError)) next(err);

  switch (typeof (err)) {

    case typeof EmptyResultError:
      logger.error(msg('Data not found'))
      return res.status(404).json({
        code: 404,
        message: msg('Data not found'),
      });
    case typeof ValidationError: {

      const errors: any[] = _.get(err, 'errors', []);
      const errorMessage = _.get(errors, '0.message', null)

      const msgType = green('sequelize error:')
      logger.error(`${msgType} - ${errorMessage}`)

      const dataError = {
        code: 400,
        message: errorMessage
          ? `Validation error: ${errorMessage}`
          : err.message,
        errors: errors.reduce<any>((acc, curVal) => {
          acc[curVal.path] = curVal.message
          return acc
        }, {}),
      };
      logger.info(`${dataError.message}, ${dataError.errors}`)
      return res.status(400).json(dataError);
    }
    default:
      logger.error(msg(err.message))
      return res.status(500).json({
        code: 500,
        message: msg(err.message),
      });
  }
}

export default expressErrorSequelize
