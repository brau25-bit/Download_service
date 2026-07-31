import { ErrorHandler } from "./globlal-err.js"

export class NotFoundError extends ErrorHandler {
    constructor(message: string, statusCode: number){
        super(message, statusCode);
    }
}