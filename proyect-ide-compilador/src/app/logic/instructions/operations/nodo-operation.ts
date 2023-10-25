import { Token } from 'src/app/parser/token';
import { TypeOperationQuartet } from '../../quartets/type-operation-quartet';
import { Dato } from '../../table-simbol/dato';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { TypeDato } from '../../table-simbol/type-dato';
import { Visitor } from '../../visitors/visitor';
import { TypeOperation } from './type-operation';

export class NodoOperation {
  dato: Dato | null;
  tok: Token | null;
  opLeft: NodoOperation | null;
  opRight: NodoOperation | null;
  typeOp: TypeOperation | undefined;
  result: string = '';
  symbolTable!: SymbolTable;

  constructor(
    dato?: Dato,
    opLeft?: NodoOperation,
    opRight?: NodoOperation,
    typeOp?: TypeOperation,
    tok?: Token
  ) {
    this.dato = dato || null;
    this.opLeft = opLeft || null;
    this.opRight = opRight || null;
    this.typeOp = typeOp;
    this.tok = tok || null;
  }

  execute(vi:Visitor): Dato | void{
    return vi.visitNodoOP(this);
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = symbolTablePadre;
    if (this.opLeft) {
      this.opLeft.referenciarSymbolTable(vi, this.symbolTable);
    }
    if (this.opRight) {
      this.opRight.referenciarSymbolTable(vi, this.symbolTable);
    }
  }

  //TODO: implementacion de la funcion para ejecutar la operacion como tal
  executetss(symbolTable: SymbolTable): Dato {
    if (!this.typeOp && this.dato !== null) {
      return this.dato;
    }
    if (this.tok !== null) {
      //TODO: buscar variable
      //return symboltable.getVar implementar
    }
    const tmp = new Dato(TypeDato.INT);
    //const datoLeft = this.opLeft?.execute(symbolTable);
    //const datoRight = this.opRight?.execute(symbolTable);
    return tmp;
  }

  genericQuatern(vi: Visitor) {
    vi.visitNodoOP(this);
  }

  valueDato(){
    switch (this.dato?.typeDato) {
      case TypeDato.INT:
        this.result = `${this.dato.numero}`;
        break;
      case TypeDato.FLOAT:
        this.result = `${this.dato.numero}`;
        break;
      case TypeDato.BOOLEAN:
        this.result = `${this.dato.booleano}`;
        break;
      case TypeDato.CHAR:
        this.result = `${this.dato.cadena}`;
        break;
      default:
        this.result = `${this.dato?.numero}`;
        break;
    }
  }

  //TODO: implemet resto de casos
  public typeQuartetOperation(): TypeOperationQuartet {
    let type = TypeOperationQuartet.SUMA;
    switch (this.typeOp) {
        case TypeOperation.SUMA:
            type = TypeOperationQuartet.SUMA
            break;
        case TypeOperation.RESTA:
            type = TypeOperationQuartet.RESTA
            break;
        case TypeOperation.MULTIPLICACION:
            type = TypeOperationQuartet.MULTIPLICACION
            break;
        case TypeOperation.DIVISION:
            type = TypeOperationQuartet.DIVISION
            break;
    }
    return type;
  }
}
