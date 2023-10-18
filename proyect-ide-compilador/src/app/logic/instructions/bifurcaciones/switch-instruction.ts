import { Token } from 'src/app/parser/token';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { Variable } from '../../table-simbol/variable';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';
import { CaseSwitchInstruction } from './case-switch-instruction';

export class SwitchInstruction extends Instruction {
  symbolTable!: SymbolTable;
  casos: CaseSwitchInstruction[] = []
  varSwintch: Variable;
  token: Token;

  constructor(
    casos: CaseSwitchInstruction[],
    varSwintch: Variable,
    token: Token
  ) {
    super();
    this.casos = casos;
    this.varSwintch = varSwintch;
    this.token = token;
  }

  execute(vi: Visitor): void {
    vi.visitSwitch(this);
  }
  genericQuartet(vi: Visitor): void {
    throw new Error('Method not implemented.');
  }
}
