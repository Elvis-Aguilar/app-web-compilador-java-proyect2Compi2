import { Token } from 'src/app/parser/token';
import { Dato } from '../../table-simbol/dato';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { TypeDato } from '../../table-simbol/type-dato';
import { Visitor } from '../../visitors/visitor';
import { NodoOperation } from '../operations/nodo-operation';
import { Operation } from '../operations/operation';
import { Funcion } from './funcion';

export class LlamadaFun extends NodoOperation {
  argumens: Operation[] = [];
  global: boolean = false;
  objeto: string = '';
  fun3Direc: string = '';
  posObjeto: number = 0;
  funRelativa!: Funcion;

  constructor(
    token: Token,
    argumes: Operation[],
    global: boolean,
    objeto: string
  ) {
    super(undefined, undefined, undefined, undefined, token);
    this.argumens = argumes;
    this.global = global;
    this.objeto = objeto;
  }

  override execute(vi: Visitor): Dato | void {
    return vi.visitLlamdadfun(this);
  }

  override genericQuatern(vi: Visitor) {
    vi.visitLlamdadfun(this);
  }

  override referenciarSymbolTable(
    vi: Visitor,
    symbolTablePadre: SymbolTable
  ): void {
    this.symbolTable = symbolTablePadre;
    this.argumens.forEach((arg) => {
      arg.referenciarSymbolTable(vi, this.symbolTable);
    });
  }

  public typeCrearFun(): string {
    let resu = 'int';
    switch (this.funRelativa.typeRetorno) {
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
