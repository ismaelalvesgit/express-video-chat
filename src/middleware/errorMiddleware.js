import { ApiError } from "../utils/erro";
import { StatusCodes } from "http-status-codes";
import logger from "../logger";

/* eslint-disable no-unused-vars*/
export default function errorHandler(error, req, res, next) {
    logger.warn(`${req.id} ${error.message}`);
    switch (error.constructor) {
        case ApiError: {
            res.status(error.statusCode).json([{message: error.message}]);
            break;
        }
        default: {
            logger.error(`${req.id} ${error.message}`);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{
                message: `Entre em contato com o desenvolvedor passe eu seu ID ${req.id}, lamentamos isso ter ocorrido 😞`
            }]);
        }
    }
}