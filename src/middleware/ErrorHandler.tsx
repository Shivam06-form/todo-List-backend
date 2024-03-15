export const ErrorHandler = (message: string, istatus: any, statusCode: number) => {
    const err: { status: string, statusCode: number } | any = new Error(message);
    err.status = istatus;
    err.statusCode = statusCode;
    return err;
};
