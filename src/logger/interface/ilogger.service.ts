import { Logger } from 'winston';
import { IHttpLogMetaData } from './http-logger-response.interface';

interface ILoggerService {
    info(context: any, message?: string): Logger;
    warn(context: any, message?: string): Logger;
    error(context: any, message?: string): Logger;
}

export interface IHttpLoggerService extends ILoggerService {
    /**
     * Creates Info log using Winston
     * @param {IHttpLogMetaData} context - Holds current request & response info
     * @param {string} message - Optional message
     * @returns {Logger} Returns WInston Logger
     */
    info(context: IHttpLogMetaData, message: string): Logger;

    /**
     * Creates Warning log using Winston
     * @param {IHttpLogMetaData} context - Holds current request & response info
     * @param {string} message - Optional message
     * @returns {Logger} Returns Winston Logger
     */
    warn(context: IHttpLogMetaData, message: string): Logger;

    /**
     * Creates Error log using Winston
     * @param {IHttpLogMetaData} context - Holds current request & response info
     * @param {string} message - Optional message
     * @returns {Logger} Returns Winston Logger
     */
    error(context: IHttpLogMetaData, message: string): Logger;
}

export interface ICliLoggerService extends ILoggerService {
    /**
     * Creates Info log using Winston
     * @param {string} message - CLI message
     * @returns {Logger} Returns WInston Logger
     */
    info(message: string): Logger;

    /**
     * Creates Warning log using Winston
     * @param {string} message - CLI message
     * @returns {Logger} Returns WInston Logger
     */
    warn(message: string): Logger;

    /**
     * Creates Error log using Winston
     * @param {string} message - CLI message
     * @returns {Logger} Returns WInston Logger
     */
    error(message: string): Logger;
}