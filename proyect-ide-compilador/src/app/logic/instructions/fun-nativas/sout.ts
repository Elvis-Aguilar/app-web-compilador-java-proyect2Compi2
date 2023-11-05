import { SymbolTable } from '../../table-simbol/symbol-table';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';
import { Operation } from '../operations/operation';

export class Sout extends Instruction {
  op: Operation;
  salto: boolean;
  symbolTable!: SymbolTable;

  constructor(op: Operation, salto: boolean) {
    super();
    this.op = op;
    this.salto = salto;
  }

  execute(vi: Visitor): void {
    vi.visitSout(this);
  }
  genericQuartet(vi: Visitor): void {
    //TODO: Method not implemented.
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = symbolTablePadre;
    vi.visitSout(this);
  }
}
