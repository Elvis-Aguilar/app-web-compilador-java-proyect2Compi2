import { Token } from "src/app/parser/token";
import { SymbolTable } from "../../table-simbol/symbol-table";
import { Visitor } from "../../visitors/visitor";
import { Instruction } from "../instruction";
import { LlamadaFun } from "./llamada-fun";

export class LlamadaFunGen extends Instruction{

    symbolTable!: SymbolTable;
    funLlamada:LlamadaFun;

    constructor(funLlamada:LlamadaFun){
        super();
        this.funLlamada = funLlamada;
    }



    execute(vi: Visitor): void {
        throw new Error("Method not implemented.");
    }
    genericQuartet(vi: Visitor): void {
        throw new Error("Method not implemented.");
    }
    referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
        this.symbolTable = symbolTablePadre;
        this.funLlamada.referenciarSymbolTable(vi, this.symbolTable);
    }

}