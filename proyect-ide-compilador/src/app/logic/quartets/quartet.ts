import { TypeOperationQuartet } from "./type-operation-quartet";

export class Quartet {
    op1:string;
    op2:string;
    result:string
    typeOp:TypeOperationQuartet;

    constructor(op1:string, op2:string, result:string,typeOp:TypeOperationQuartet){
        this.op1 = op1;
        this.op2 = op2;
        this.result = result;
        this.typeOp = typeOp;

    }

}