import { Token } from 'src/app/parser/token';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { Visitor } from '../../visitors/visitor';
import { NodoOperation } from '../operations/nodo-operation';
import { TypeFunMath } from './type-fun-math';

export class FunMath extends NodoOperation {
  typeFunMath: TypeFunMath;

  constructor(
    token: Token,
    typeFunMath: TypeFunMath,
    opLeft?: NodoOperation,
    opRight?: NodoOperation
  ) {
    super(undefined, opLeft, opRight, undefined, token);
    this.typeFunMath = typeFunMath;
  }

  override referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = symbolTablePadre;
    this.opLeft?.referenciarSymbolTable(vi, this.symbolTable);
    this.opRight?.referenciarSymbolTable(vi, this.symbolTable);
  }
}
