import { Token } from 'src/app/parser/token';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';
import { Operation } from '../operations/operation';

export class Asignacion extends Instruction {
  symbolTable!: SymbolTable;
  token: Token;
  op: Operation;
  global:boolean;

  constructor(token: Token, op: Operation, global?:boolean) {
    super();
    this.token = token;
    this.op = op;
    this.global = global !== undefined ? global : false;
  }

  execute(vi: Visitor): void {
    vi.visitAsig(this);
  }
  genericQuartet(vi: Visitor): void {
    //TODO: Method not implemented.
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = symbolTablePadre;
    vi.visitAsig(this);
  }
}
