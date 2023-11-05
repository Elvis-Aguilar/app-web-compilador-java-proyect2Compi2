import { Dato } from '../../table-simbol/dato';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { Visitor } from '../../visitors/visitor';
import { NodoOperation } from './nodo-operation';

export class Operation {
  rootOp: NodoOperation;
  restult: string = '';
  symbolTable!: SymbolTable;

  constructor(rootOp: NodoOperation) {
    this.rootOp = rootOp;
  }

  execute(vi: Visitor): Dato | void {
    return vi.visitOp(this);
  }

  

  generecQuartet(vi: Visitor) {
    vi.visitOp(this);
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = symbolTablePadre;
    this.rootOp?.referenciarSymbolTable(vi, this.symbolTable);
  }
}
