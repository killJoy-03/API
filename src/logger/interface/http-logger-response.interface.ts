
import { type Request, type Response } from 'express';
import { type IHttpError } from '../../core/modules/errors/interface/ierror.interface';

export default interface IHttpLoggerResponseData {
    request: IHttpLoggerRequest;
    response: IHttpLoggerResponse;
    error: IHttpLoggerError;
    customMetaData?: any
}

export interface IHttpLogMetaData {
    req?: Request;
    res?: Response;
    responseBody?: any;
    error?: IHttpError;
    customMetaData?: any;
}


interface IHttpLoggerRequest {
    headers: any;
    host?: string;
    protocol: string;
    baseUrl: string;
    url: string;
    method: string;
    body: any;
    params: any;
    query: any;
    clientIp?: string | string[];
    requestDuration: string;
}

interface IHttpLoggerResponse {
    headers: any;
    statusCode: any;
    body: any;
}

interface IHttpLoggerError {
    name: string;
    statusCode: any;
    message: string;
    stackTrace: string;
}