import { Token } from 'src/app/parser/token';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';
import { Operation } from '../operations/operation';

export class DoWhileInstruction extends Instruction {
  instructions: Instruction[] = [];
  condition: Operation;
  symbolTable!: SymbolTable;
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

  execute(vi: Visitor): void {
    vi.visitDoWhile(this)
  }
  genericQuartet(vi: Visitor): void {
    //TODO: Method not implemented.
  }
}
