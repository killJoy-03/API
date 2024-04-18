import formatHTTPLoggerResponse from './utils/format-http-logger-response.utils';
import { IHttpLogMetaData } from './interface/http-logger-response.interface';
import { httpLogger } from './setup/winston-logger.setup';
import { IHttpLoggerService } from './interface/ilogger.service';
import { getSuccessfulHTTPResponseMessage, getUnSuccessfulHTTPResponseMessage } from './utils/logger-messages.utils';
import { HTTPMethods } from '../shared/enum/http-methods.enum';

/**
 * Logger used for logging into files & CLI
 */
class HTTPLoggerService implements IHttpLoggerService {

  info(context: IHttpLogMetaData, message = '') {
    return httpLogger.info(
      message || getSuccessfulHTTPResponseMessage(context?.req?.method as HTTPMethods),
      formatHTTPLoggerResponse(context)
    );
  }

  warn(context: IHttpLogMetaData, message = '') {
    return httpLogger.warn(
      message || getUnSuccessfulHTTPResponseMessage(context?.req?.method as HTTPMethods),
      formatHTTPLoggerResponse(context)
    );
  }

  error(context: IHttpLogMetaData, message = '') {
    return httpLogger.error(
      message || getUnSuccessfulHTTPResponseMessage(context?.req?.method as HTTPMethods),
      formatHTTPLoggerResponse(context)
    );
  }

}

export const httpLoggerService = new HTTPLoggerService();
