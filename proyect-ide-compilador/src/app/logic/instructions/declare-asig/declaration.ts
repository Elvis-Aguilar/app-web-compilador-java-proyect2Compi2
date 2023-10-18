import { Token } from "src/app/parser/token";
import { Visitor } from "../../visitors/visitor";
import { Instruction } from "../instruction";
import { Operation } from "../operations/operation";

export class Declaration extends Instruction{

    token:Token;
    op:Operation | null;
    result = '';

    constructor(token:Token, op?:Operation){
        super();
        this.token = token;
        this.op = op || null;
    }
    

    genericQuartet(vi: Visitor): void {
        vi.visitDeclaration(this);
    }


}