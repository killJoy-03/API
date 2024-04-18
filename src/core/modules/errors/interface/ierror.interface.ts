// Added because the default JavaScript Error class does not have statusCode property
export interface IHttpError extends Error {
    statusCode: number;
}

// Added because the default JavaScript Error class does not have code property
export interface IDbError extends Error {
    code: number;
}