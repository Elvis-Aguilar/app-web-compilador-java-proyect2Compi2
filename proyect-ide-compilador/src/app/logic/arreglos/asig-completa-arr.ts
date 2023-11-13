import { Token } from "src/app/parser/token";
import { Instruction } from "../instructions/instruction";
import { Operation } from "../instructions/operations/operation";
import { SymbolTable } from "../table-simbol/symbol-table";
import { TypeDato } from "../table-simbol/type-dato";
import { Visitor } from "../visitors/visitor";
import { Arreglo } from "./arreglo";

export class AsigCompletaArr extends Instruction{

    token: Token;
    typeAsig: TypeDato;
    opers: Operation[] = [];
    symbolTable!: SymbolTable;
    global: boolean = false;
    ArregloRealtivo!:Arreglo;

    constructor(token: Token, typeAsig: TypeDato,opers: Operation[], globla:boolean) {
        super();
        this.token = token;
        this.typeAsig = typeAsig;
        this.opers = opers;
        this.global = globla;
    }

    execute(vi: Visitor): void {
        vi.visitAsigComplArr(this);
    }
    genericQuartet(vi: Visitor): void {
        vi.visitAsigComplArr(this);
    }
    referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
        this.symbolTable = symbolTablePadre;
        vi.visitAsigComplArr(this);
    }

}