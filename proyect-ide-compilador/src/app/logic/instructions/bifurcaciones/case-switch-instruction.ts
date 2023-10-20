import { Token } from 'src/app/parser/token';
import { Dato } from '../../table-simbol/dato';
import { SymbolTable } from '../../table-simbol/symbol-table';
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
    vi.visitCaseSwitch(this);
  }
  genericQuartet(vi: Visitor): void {
    throw new Error('Method not implemented.');
  }
}
