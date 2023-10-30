import { Token } from "src/app/parser/token";
import { SymbolTable } from "../../table-simbol/symbol-table";
import { Visitor } from "../../visitors/visitor";
import { Instruction } from "../instruction";
import { Operation } from "../operations/operation";

export class asignacionObjec extends Instruction{

    symbolTable!: SymbolTable;
    token: Token;
    opers: Operation[] = [];
    global:boolean;
    objeto:string;

    constructor(token:Token, opers: Operation[], global:boolean,  objeto:string){
        super();
        this.token = token;
        this.opers = opers;
        this.global = global;
        this.objeto= objeto;

    }

    execute(vi: Visitor): void {
        throw new Error("Method not implemented.");
    }
    genericQuartet(vi: Visitor): void {
        throw new Error("Method not implemented.");
    }
    referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
        this.symbolTable = symbolTablePadre;
        vi.visitAsigObj(this);
    }

}