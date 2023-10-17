import { Dato } from "../../table-simbol/dato";
import { SymbolTable } from "../../table-simbol/symbol-table";
import { Visitor } from "../../visitors/visitor";
import { NodoOperation } from "./nodo-operation";

export class Operation{
    rootOp:NodoOperation;
    restult: string = '';
    symbolTable!: SymbolTable;
    

    constructor(rootOp:NodoOperation) {
        this.rootOp= rootOp;
    }


    execute(vi:Visitor) : Dato | void{
        return vi.visitOp(this);
    }

    executesss(symbolTable:SymbolTable):Dato{
        const tmp = this.rootOp.executetss(symbolTable);
        return tmp;
    }

    generecQuartet(vi:Visitor){
        vi.visitOp(this)
    }
}