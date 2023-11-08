import { Token } from 'src/app/parser/token';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { TypeDato } from '../../table-simbol/type-dato';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';
import { Operation } from '../operations/operation';

export class Asignacion extends Instruction {
  symbolTable!: SymbolTable;
  token: Token;
  op: Operation;
  global: boolean;
  objeto: string;
  pos:number = 0;
  result:string='';
  typeAsignar!:TypeDato;

  constructor(token: Token, op: Operation, global?: boolean, objeto?: string) {
    super();
    this.token = token;
    this.op = op;
    this.global = global !== undefined ? global : false;
    this.objeto = objeto || '';
  }

  execute(vi: Visitor): void {
    vi.visitAsig(this);
  }
  genericQuartet(vi: Visitor): void {
    vi.visitAsig(this);
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = symbolTablePadre;
    vi.visitAsig(this);
  }
}
