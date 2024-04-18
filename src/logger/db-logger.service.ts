import formatHTTPLoggerResponse from './utils/format-http-logger-response.utils';
import { IHttpLogMetaData } from './interface/http-logger-response.interface';
import { httpLoggerDB } from './setup/winston-logger.setup';
import { IHttpLoggerService } from './interface/ilogger.service';
import { getSuccessfulHTTPResponseMessage } from './utils/logger-messages.utils';
import { HTTPMethods } from '../shared/enum/http-methods.enum';

/**
 * Logger used for logging into MongoDB
 */
class DBLoggerService implements IHttpLoggerService {

  info(context: IHttpLogMetaData, message = '') {
    return httpLoggerDB.info(
      message || getSuccessfulHTTPResponseMessage(context?.req?.method as HTTPMethods),
      formatHTTPLoggerResponse(context)
    );
  }

  warn(context: IHttpLogMetaData, message = '') {
    return httpLoggerDB.warn(
      message || getSuccessfulHTTPResponseMessage(context?.req?.method as HTTPMethods),
      formatHTTPLoggerResponse(context)
    );
  }

  error(context: IHttpLogMetaData, message = '') {
    return httpLoggerDB.error(
      message || getSuccessfulHTTPResponseMessage(context?.req?.method as HTTPMethods),
      formatHTTPLoggerResponse(context)
    );
  }

}

export const dbLoggerService = new DBLoggerService();
