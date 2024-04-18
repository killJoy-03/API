import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import 'dotenv/config'
import { corsOptions } from './cors';
import ResponseError from '../core/modules/response/ResponseError';
import { env } from './env';
import db from '../database/data-source';
import expressErrorSequelize from '../app/middleware/expressErrorSequelize';
import expressErrorResponse from '../app/middleware/expressErrorResponse';
import { down as roleDown, up as roleUp } from '../database/seeders/roles-seeder';
import { up as userUp, down as userDown } from '../database/seeders/users-seeder';
import logger from '../logger/logger.index';
import { green } from 'colorette';
const _defaultPort = 8080
export class App {
    private readonly _app: Application
    private readonly _port: number | string
    constructor() {
        this._app = express();
        this._port = env.APP_PORT
        this._plugins();
        this._database();

        // docs swagger disable for production mode
        // if (this._env.NODE_ENV !== 'production') this._swagger();

        this._routes()
    }
    private _plugins(): void {
        this._app.use(cors(corsOptions))
        this._app.use(express.json({ limit: '200mb', type: 'application/json' }))
        this._app.use(express.urlencoded({ extended: true }))

        // middleware
    }
    // todo: add swagger 

    private _routes(): void {

        // todo: add routes


        // Catch error 404 endpoint not found
        this._app.use('*', function (req: Request, _res: Response) {
            const method = req.method
            const url = req.originalUrl
            const host = req.hostname

            const endpoint = `${host}${url}`

            throw new ResponseError.NotFound(
                `Sorry, the ${endpoint} HTTP method ${method} resource you are looking for was not found.`
            )
        })
    }
    private _database(): void {
        const dbDialect: string = env.SEQUELIZE_CONNECTION
        const dbName: string = env.SEQUELIZE_DATABASE

        // connect to database
        db.sequelize
            .authenticate()
            .then(async () => {
                const msgType = green(`sequelize`)
                const message = `connection ${dbDialect}: ${dbName} has been established successfully.`

                logger.info(`${msgType} - ${message}`)

                // not recommended when running in production mode
                if (env.SEQUELIZE_SYNC) {
                    await db.sequelize.sync({ alter: true });
                    logger.info(`${msgType} - all sync database successfully`)
                }
                const queryI = db.sequelize.getQueryInterface();
                if (env.ROLE_SEED) {
                    await roleDown(queryI);
                    await roleUp(queryI);
                }
                if (env.USER_SEED) {
                    await userDown(queryI);
                    await userUp(queryI);
                }
            })
            .catch((err: any) => {
                const errType = `sequelize error:`
                const message = `unable to connect to the database ${dbDialect}: ${dbName}`

                logger.error(`${errType} - ${message}`)
                console.log(err)
            })
    }
    public create(): Application {
        this._app.use(expressErrorSequelize)
        this._app.use(expressErrorResponse)

        // set port
        this._app.set('port', this._port)

        // listen
        this._app.listen(env.APP_PORT, () => { console.log('app listening at 8080') });

        // return this application
        return this._app
    }
}