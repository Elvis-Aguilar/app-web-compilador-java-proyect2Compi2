import { Token } from 'src/app/parser/token';
import { ErrorSingleton } from '../../errors/error-singleton';
import { Error } from '../../errors/errors';
import { TypeError } from '../../errors/type-error';import { Dato } from '../../table-simbol/dato';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { TypeDato } from '../../table-simbol/type-dato';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';

export class CaseSwitchInstruction extends Instruction {

  instructions: Instruction[] = [];
  symbolTable!: SymbolTable;
  dato: Dato | null;
  datoSwintch!: Dato;
  token: Token;

  constructor(instructions: Instruction[], token: Token, dato?: Dato) {
    super();
    this.instructions = instructions;
    this.dato = dato || null;
    this.token = token;
  }

  execute(vi: Visitor): void {
    //TODO:Method not implemented.
    //vi.visitCaseSwitch(this);
  }
  genericQuartet(vi: Visitor): void {
    //TODO:Method not implemented.
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = new SymbolTable('case-switch');
    this.symbolTable.symbolTablePadre = symbolTablePadre;
    vi.visitCaseSwitch(this)
  }

  public comprobarCasos(): boolean {
    if (!this.dato) {
      return true;
    }
    if (this.dato.isVariable) {
      //TODO: buscar variable y obtener el dato para veriricar su typo de dato
    }
    if (this.dato.typeDato !== this.datoSwintch.typeDato) {
      const msj = 'expresion no es valida, el dato a comparar en el caso del switch no es del mismo tipo';
      ErrorSingleton.getInstance().push(new Error(this.token.line, this.token.column, this.token.id, `${msj}`, TypeError.SEMANTICO));
    }
    return true;
  }

  private comprobarDato(): boolean {
    if (this.dato) {
      switch (this.dato.typeDato) {
        case TypeDato.BOOLEAN:
          return this.dato.booleano && this.datoSwintch.booleano;
          break;
        case TypeDato.STRING:
          return this.dato.cadena === this.datoSwintch.cadena;
          break;
        case TypeDato.CHAR:
          return this.dato.cadena === this.datoSwintch.cadena;
          break;
        case TypeDato.FLOAT:
          return this.dato.numero == this.datoSwintch.numero;
          break;
        default:
          return this.dato.numero == this.datoSwintch.numero;
          break;
      }
    }else{
      return false;
    }
  }
}
