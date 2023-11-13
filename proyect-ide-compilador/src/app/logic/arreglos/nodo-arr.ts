import { Token } from 'src/app/parser/token';
import { NodoOperation } from '../instructions/operations/nodo-operation';
import { Operation } from '../instructions/operations/operation';
import { Dato } from '../table-simbol/dato';
import { SymbolTable } from '../table-simbol/symbol-table';
import { TypeDato } from '../table-simbol/type-dato';
import { Visitor } from '../visitors/visitor';
import { Arreglo } from './arreglo';

export class NodoArreglo extends NodoOperation {
  global: boolean;
  ops: Operation[] = [];
  arregloRelativo!:Arreglo;

  constructor(token: Token, ops: Operation[], globla: boolean) {
    super();
    this.tok = token;
    this.global = globla;
    this.ops = ops;
  }

  override referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = symbolTablePadre;
    vi.visitNodoArr(this);
  }

  override execute(vi: Visitor): Dato | void {
    return vi.visitNodoArr(this);
  }

  override genericQuatern(vi: Visitor) {
    vi.visitNodoArr(this);
  }

  public typeCrearFun(): string {
    let resu = 'int';
    switch (this.arregloRelativo.typeDato) {
      case TypeDato.INT:
        resu = 'int';
        break;
      case TypeDato.BOOLEAN:
        resu = 'int';
        break;
      case TypeDato.CHAR:
        resu = 'char';
        break;
      case TypeDato.FLOAT:
        resu = 'float';
        break;
      case TypeDato.STRING:
        resu = 'char';
        break;
      case TypeDato.VOID:
        resu = 'int';
        break;
    }

    return resu;
  }
}
