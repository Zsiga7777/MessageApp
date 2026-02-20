import CustomAPIError, { ErrorCode } from "./customError";
class UnAuthorizedError extends CustomAPIError {
    statusCode: number;
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 401, null);
        this.statusCode = 401;
    }
}
export default UnAuthorizedError;