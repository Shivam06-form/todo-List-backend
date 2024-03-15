"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const ErrorHandler = (message, istatus, statusCode) => {
    const err = new Error(message);
    err.status = istatus;
    err.statusCode = statusCode;
    return err;
};
exports.ErrorHandler = ErrorHandler;
