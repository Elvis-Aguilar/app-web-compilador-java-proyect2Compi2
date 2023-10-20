import { Token } from 'src/app/parser/token';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';
import { Operation } from '../operations/operation';

export class Asignacion extends Instruction {
  symbolTable!: SymbolTable;
  token:Token;
  op: Operation;

  constructor(token:Token, op: Operation){
    super();
    this.token = token;
    this.op = op;
  }

  

  execute(vi: Visitor): void {
    //TODO: Method not implemented.
  }
  genericQuartet(vi: Visitor): void {
    //TODO: Method not implemented.
  }
}
