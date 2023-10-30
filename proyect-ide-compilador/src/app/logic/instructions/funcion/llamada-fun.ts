import { Token } from "src/app/parser/token";
import { SymbolTable } from "../../table-simbol/symbol-table";
import { Visitor } from "../../visitors/visitor";
import { NodoOperation } from "../operations/nodo-operation";
import { Operation } from "../operations/operation";

export class LlamadaFun extends NodoOperation{

    argumens:Operation[] = [];
    global:boolean = false;
    objeto:string='';

    constructor(token:Token, argumes:Operation[], global:boolean, objeto:string ){
        super(undefined, undefined, undefined, undefined, token);
        this.argumens = argumes;
        this.global = global;
        this.objeto = objeto;
    }


    override referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
        this.symbolTable = symbolTablePadre;
        this.argumens.forEach((arg) =>{
            arg.referenciarSymbolTable(vi,this.symbolTable);
        })
        
      }
}