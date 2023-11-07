import { Token } from 'src/app/parser/token';
import { Quartet } from '../../quartets/quartet';
import { TypeOperationQuartet } from '../../quartets/type-operation-quartet';
import { Dato } from '../../table-simbol/dato';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { TypeDato } from '../../table-simbol/type-dato';
import { Visitor } from '../../visitors/visitor';
import { VisitorGenericQuartet } from '../../visitors/visitor-generic-quartet';
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

  execute(vi: Visitor): Dato | void {
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

  genericQuatern(vi: Visitor) {
    vi.visitNodoOP(this);
  }

  valueDato(vi:VisitorGenericQuartet) {
    switch (this.dato?.typeDato) {
      case TypeDato.INT:
        const quaInt = new Quartet(
          `${this.dato.numero}`,
          '',
          `int ${vi.qh.tmpVar()}`,
          TypeOperationQuartet.ASIGNATION
        );
        vi.qh.push(quaInt);
        this.result = `${vi.qh.tmpVar()}`;
        vi.qh.aumentarTmp();
        break;
      case TypeDato.FLOAT:
        const quaFloat = new Quartet(
          `${this.dato.numero}`,
          '',
          `float ${vi.qh.tmpVar()}`,
          TypeOperationQuartet.ASIGNATION
        );
        vi.qh.push(quaFloat);
        this.result = `${vi.qh.tmpVar()}`;
        vi.qh.aumentarTmp();
        break;
      case TypeDato.BOOLEAN:
        const val:number = this.dato.booleano?1:0;
        const quaBool = new Quartet(
          `${val}`,
          '',
          `int ${vi.qh.tmpVar()}`,
          TypeOperationQuartet.ASIGNATION
        );
        vi.qh.push(quaBool);
        this.result = `${vi.qh.tmpVar()}`;
        vi.qh.aumentarTmp();
        break;
      case TypeDato.CHAR:
        const quaChar = new Quartet(
          `\"${this.dato.cadena}\"`,
          '',
          `char ${vi.qh.tmpVar()}`+"[]",
          TypeOperationQuartet.ASIGNATION
        );
        vi.qh.push(quaChar);
        this.result = `${vi.qh.tmpVar()}`;
        vi.qh.aumentarTmp();
        break;
      case TypeDato.STRING:
        const quaCade = new Quartet(
          `\"${this.dato.cadena}\"`,
          '',
          `char ${vi.qh.tmpVar()}`+"[]",
          TypeOperationQuartet.ASIGNATION
        );
        vi.qh.push(quaCade);
        this.result = `${vi.qh.tmpVar()}`;
        vi.qh.aumentarTmp();
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
        type = TypeOperationQuartet.SUMA;
        break;
      case TypeOperation.RESTA:
        type = TypeOperationQuartet.RESTA;
        break;
      case TypeOperation.MULTIPLICACION:
        type = TypeOperationQuartet.MULTIPLICACION;
        break;
      case TypeOperation.DIVISION:
        type = TypeOperationQuartet.DIVISION;
        break;
    }
    return type;
  }
}
