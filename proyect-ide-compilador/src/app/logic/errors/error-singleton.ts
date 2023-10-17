import { Error } from "./errors";

export class ErrorSingleton{

    private static instance: ErrorSingleton;
    private erros: Error[] = [];

    private constructor() {
    }

    public static getInstance(): ErrorSingleton{
        if (!ErrorSingleton.instance) {
            return new ErrorSingleton();
        }
        return ErrorSingleton.instance;
    }

    public push(err: Error){
        this.erros.push(err);
    }



}