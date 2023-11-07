import { Token } from "src/app/parser/token";
import { Constructor } from "../../class/constructor";
import { SymbolTable } from "../../table-simbol/symbol-table";
import { TypeDato } from "../../table-simbol/type-dato";
import { Visibilidad } from "../../table-simbol/visibilidad";
import { Visitor } from "../../visitors/visitor";
import { Instruction } from "../instruction";
import { Operation } from "../operations/operation";

export class DeclarationObject extends Instruction{

    token: Token;
    ops: Operation[] = [];
    result = '';
    typeDato: TypeDato;
    visibilidad!: Visibilidad;
    isStatik!: boolean;
    isFinal!: boolean;
    symbolTable!: SymbolTable;
    typeDatoAsig: TypeDato;
    pos:number = 0;
    construcotrRelativo!:Constructor;

    constructor(config:any, token: Token,ops: Operation[], typeDatoAsig: TypeDato) {
        super();
        this.token = token;
        this.ops = ops;
        this.typeDatoAsig = typeDatoAsig;
        if (config instanceof Array) {
            this.visibilidad = config[0];
            this.isStatik = config[1];
            this.isFinal = config[2];
            this.typeDato = config[3];
        }else{
            this.typeDato = config;
            this.visibilidad = Visibilidad.PUBLIC
            this.isFinal = false;
            this.isStatik = false;
        }

      }

    execute(vi: Visitor): void {
       vi.visitDeclareObject(this);
    }
    genericQuartet(vi: Visitor): void {
        vi.visitDeclareObject(this);
    }
    
    referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
        this.symbolTable = symbolTablePadre;
        vi.visitDeclareObject(this);
    }



}