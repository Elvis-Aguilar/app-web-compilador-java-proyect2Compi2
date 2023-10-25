import { Token } from 'src/app/parser/token';
import { ErrorSingleton } from '../../errors/error-singleton';
import { Error } from '../../errors/errors';
import { TypeError } from '../../errors/type-error';
import { Dato } from '../../table-simbol/dato';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { TypeDato } from '../../table-simbol/type-dato';
import { Visibilidad } from '../../table-simbol/visibilidad';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';
import { Operation } from '../operations/operation';

export class DeclarationArr extends Instruction {

  token: Token;
  result = '';
  typeDato!: TypeDato;
  visibilidad!: Visibilidad;
  isStatik!: boolean;
  isFinal!: boolean;
  symbolTable!: SymbolTable;
  dimension: number;
  opers:Operation[] = [];       //representa: [15+2][1+2] || {21,2,3}
  indices:boolean = false;
  //nombre de variable esta en token.id

  constructor(config:any, dimension: number, token: Token, TypeDatoValidacion?: TypeDato, opers?:Operation[],indices?:boolean ) {
    super();
    this.token = token;
    this.dimension = dimension;
    this.visibilidad = config[0];
    this.isStatik = config[1];
    this.isFinal = config[2];
    this.typeDato = config[3];
    this.mismoType(TypeDatoValidacion);
    this.opers = opers || [];
    this.indices = indices || false;
  }

  genericQuartet(vi: Visitor): void {
    //TODO:Method not implemented.
  }

  execute(vi: Visitor): void {
    //TODO:Method not implemented.
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = symbolTablePadre;
    vi.visitDeclareArr(this);
  }

  mismoType(TypeDatoValidacion?: TypeDato){
    if (TypeDatoValidacion  && this.typeDato !== TypeDatoValidacion) {
      const msj = 'El tipo del arreglo no coincide con el tipo a asignar en la declaracion'
      ErrorSingleton.getInstance().push(new Error(this.token.line, this.token.column, this.token.id, `${msj}`, TypeError.SEMANTICO));
    }
  }
}
