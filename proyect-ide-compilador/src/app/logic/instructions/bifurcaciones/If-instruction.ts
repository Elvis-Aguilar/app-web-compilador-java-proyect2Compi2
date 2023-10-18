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
import { ElseInstruction } from './Else-Instruction';

export class IfInstruction extends Instruction {
  instructions: Instruction[] = [];
  condition: Operation;
  symbolTable!: SymbolTable;
  ElseIfInstruction!: IfInstruction;
  ElseInstruction!: ElseInstruction;
  token:Token

  constructor(
    instructions: Instruction[],
    condition: Operation,
    token:Token
  ) {
    super();
    this.instructions = instructions;
    this.condition = condition;
    this.token = token;
  }

  genericQuartet(vi: Visitor): void {
    //TODO: implemet metod
  }

  execute(vi: Visitor): void {
    vi.visitIf(this)
  }

  volorCondicion(vi:Visitor): boolean{
    const dato:Dato | void = this.condition.execute(vi);
    if (dato && dato.typeDato === TypeDato.BOOLEAN) {
        return dato.booleano
    }
    const msj = 'expresion no es valida, no se obtiene un valor booleano para la condicion Si(expresion-boolean)';
    ErrorSingleton.getInstance().push(new Error(this.token.line, this.token.column, this.token.id, `${msj}`, TypeError.SEMANTICO));
    return true;
  }
}
