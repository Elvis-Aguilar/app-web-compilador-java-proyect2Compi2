import { SymbolTable } from '../table-simbol/symbol-table';
import { Visitor } from '../visitors/visitor';

export abstract class Instruction {
  abstract execute(vi: Visitor): void;
  abstract genericQuartet(vi: Visitor): void;
  abstract referenciarSymbolTable(vi: Visitor, symbolTablePadre:SymbolTable):void;
}
