import { Token } from 'src/app/parser/token';
import { ErrorSingleton } from '../../errors/error-singleton';
import { Error } from '../../errors/errors';
import { TypeError } from '../../errors/type-error';
import { Dato } from '../../table-simbol/dato';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { TypeDato } from '../../table-simbol/type-dato';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';
import { Operation } from '../operations/operation';

export class WhileInstruction extends Instruction {

  instructions: Instruction[] = [];
  condition: Operation;
  symbolTable!: SymbolTable;
  token: Token;

  constructor(
    instructions: Instruction[],
    condition: Operation,
    token: Token
  ) {
    super();
    this.instructions = instructions;
    this.condition = condition;
    this.token = token;
  }

  execute(vi: Visitor): void {
    vi.visitWhile(this);
  }
  genericQuartet(vi: Visitor): void {
    //TODO: Method not implemented.
  }

  valorCondicion(vi:Visitor):boolean{
    let dato:Dato | void = this.condition.execute(vi);
    if (dato && dato.typeDato==TypeDato.BOOLEAN) {
      return dato.booleano;
    }else{
      const msj = 'expresion no es valida, no se obtiene un valor booleano para la condicion while(expresion-boolean)';
      ErrorSingleton.getInstance().push(new Error(this.token.line, this.token.column, this.token.id, `${msj}`, TypeError.SEMANTICO));
      return true;
    }
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = new SymbolTable('while');
    this.symbolTable.pos = symbolTablePadre.pos+1;
    this.symbolTable.symbolTablePadre = symbolTablePadre;
    vi.visitWhile(this);
  }

}
