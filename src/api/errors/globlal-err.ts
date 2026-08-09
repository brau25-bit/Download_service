
export class ErrorHandler extends Error {
    constructor(message: string, public statusCode: number){
        if(!message) message = "internal server error";
        
        super(message);
        
        this.statusCode = statusCode || 500;
    }
}