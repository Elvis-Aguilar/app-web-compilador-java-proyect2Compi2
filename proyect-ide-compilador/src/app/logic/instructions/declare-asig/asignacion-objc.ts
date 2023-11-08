import { Token } from 'src/app/parser/token';
import { Constructor } from '../../class/constructor';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { TypeDato } from '../../table-simbol/type-dato';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';
import { Operation } from '../operations/operation';

export class asignacionObjec extends Instruction {
  symbolTable!: SymbolTable;
  token: Token;
  opers: Operation[] = [];
  global: boolean;
  objeto: string;
  pos:number = 0;
  construcotrRelativo!:Constructor;
  

  constructor(
    token: Token,
    opers: Operation[],
    global: boolean,
    objeto: string
  ) {
    super();
    this.token = token;
    this.opers = opers;
    this.global = global;
    this.objeto = objeto;
  }

  execute(vi: Visitor): void {
    vi.visitAsigObj(this);
  }
  genericQuartet(vi: Visitor): void {
    vi.visitAsigObj(this);
  }
  referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = symbolTablePadre;
    vi.visitAsigObj(this);
  }
}
