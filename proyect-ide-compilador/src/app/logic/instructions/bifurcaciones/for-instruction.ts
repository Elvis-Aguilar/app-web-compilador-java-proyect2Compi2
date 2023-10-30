import { Token } from 'src/app/parser/token';
import { Error } from '../../errors/errors';
import { TypeError } from '../../errors/type-error';
import { ErrorSingleton } from '../../errors/error-singleton';
import { Dato } from '../../table-simbol/dato';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { TypeDato } from '../../table-simbol/type-dato';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';
import { Operation } from '../operations/operation';

export class ForInstrction extends Instruction {

  instrcInicial: Instruction;
  condition: Operation;
  instructions: Instruction[];
  token:Token;
  symbolTable!: SymbolTable;

  constructor(instrcInicial: Instruction, condition: Operation, instructions: Instruction[], token: Token) {
    super();
    this.instrcInicial = instrcInicial;
    this.condition = condition;
    this.instructions = instructions;
    this.token = token;
  }

  execute(vi: Visitor): void {
    vi.visitfor(this);
  }
  genericQuartet(vi: Visitor): void {
    //TODO: Method not implemented.
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = new SymbolTable('for');
    this.symbolTable.pos = symbolTablePadre.pos+1;
    this.symbolTable.symbolTablePadre = symbolTablePadre;
    vi.visitfor(this);
  }

  valorCondicion(vi:Visitor): boolean{
    const dato:Dato | void = this.condition.execute(vi);
    if (dato && dato.typeDato === TypeDato.BOOLEAN) {
        return dato.booleano
    }
    const msj = 'expresion no es valida, no se obtiene un valor booleano para la condicion for(condicion)';
    ErrorSingleton.getInstance().push(new Error(this.token.line, this.token.column, this.token.id, `${msj}`, TypeError.SEMANTICO));
    return true;
  }
}
