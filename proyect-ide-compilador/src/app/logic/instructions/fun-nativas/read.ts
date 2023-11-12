import { Dato } from '../../table-simbol/dato';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { TypeDato } from '../../table-simbol/type-dato';
import { Visitor } from '../../visitors/visitor';
import { NodoOperation } from '../operations/nodo-operation';

export class Read extends NodoOperation {
  constructor(typeDato: TypeDato) {
    super();
    this.typeDato = typeDato;
  }

  override execute(vi: Visitor): Dato | void {
    return vi.visitRead(this);
  }

  override genericQuatern(vi: Visitor) {
    vi.visitRead(this);
  }

  override referenciarSymbolTable(vi: Visitor,symbolTablePadre: SymbolTable): void {
    this.symbolTable = symbolTablePadre;
  }
}
