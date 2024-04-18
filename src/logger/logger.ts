import { randomBytes } from 'crypto';
import winston, { format, createLogger, transports, Logger } from 'winston';
import { LogIndentation } from './enum/log-indentation.enum';
const { timestamp, combine, printf, errors, json, metadata } = winston.format;

const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';
const appVersion = process.env.npm_package_version;

const generateLogId = (): string => randomBytes(16).toString('hex');
export function buildDevLogger() {
    return createLogger({
        format: combine(
            timestamp({ format: timestampFormat }),
            json(),
            printf(({ timestamp, level, message, ...data }) => {
                const response = {
                    level,
                    logId: generateLogId(),
                    timestamp,
                    appInfo: {
                        appVersion,
                        environment: process.env.NODE_ENV, // development/staging/production
                        processId: process.pid,
                    },
                    message,
                    data,
                };

                return JSON.stringify(response, null, LogIndentation.MD);
            })
        ),
        transports: [new transports.Console(), new transports.File({ filename: 'dev.logger.log', level: 'error' })],
    });
}
export const buildProdLogger = (): Logger =>
    winston.createLogger({

        // in this case we do not need to worry about logId or Timestamp as MongoDB will generate that for us
        // the req, res data will be stored to "meta" object via metadata()
        format: combine(
            timestamp({ format: timestampFormat }),
            json(),
            printf(({ timestamp, level, message, ...data }) => {
                const response = {
                    level,
                    logId: generateLogId(),
                    timestamp,
                    appInfo: {
                        appVersion,
                        environment: process.env.NODE_ENV, // development/staging/production
                        processId: process.pid,
                    },
                    message,
                    data,
                };

                return JSON.stringify(response, null, LogIndentation.MD);
            })
        ),
        transports: [
            new winston.transports.MongoDB({
                level: "info",
                db: process.env.LOGGER_DB as string,
                collection: 'Info', // name of the table/collection where you want to store your logs
                options: { useUnifiedTopology: true }, // some stuff that CLI complains about,           
            }),
            new winston.transports.MongoDB({
                level: "error",
                db: process.env.LOGGER_DB as string,
                collection: 'Error', // name of the table/collection where you want to store your logs
                options: { useUnifiedTopology: true }, // some stuff that CLI complains about,           
            }),
            new winston.transports.MongoDB({
                level: "warn",
                db: process.env.LOGGER_DB as string,
                collection: 'Warn', // name of the table/collection where you want to store your logs
                options: { useUnifiedTopology: true }, // some stuff that CLI complains about,           
            }),
        ],
    });
