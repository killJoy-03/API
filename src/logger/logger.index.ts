import { Logger } from "winston";
import { env } from "../config/env";
import { buildDevLogger, buildProdLogger } from "./logger";
let logger: Logger | null;
switch (env.NODE_ENV) {
    case "development":
        logger = buildDevLogger();
        break;
    case "production":
        logger = buildProdLogger();
        break;
    default:
        logger = buildDevLogger();
        break;
}
export default logger!;