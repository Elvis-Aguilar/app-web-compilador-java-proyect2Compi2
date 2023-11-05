import { Token } from 'src/app/parser/token';
import { Instruction } from '../instructions/instruction';
import { SymbolTable } from '../table-simbol/symbol-table';
import { Visitor } from '../visitors/visitor';

export class FunMain extends Instruction {
  instructions: Instruction[];
  token: Token;
  symbolTable!: SymbolTable;

  constructor(instructions: Instruction[], token: Token) {
    super();
    this.instructions = instructions;
    this.token = token;
  }

  execute(vi: Visitor): void {
    vi.visitMain(this);
  }
  genericQuartet(vi: Visitor): void {
    throw new Error('Method not implemented.');
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre?: SymbolTable): void {
    this.symbolTable = new SymbolTable('Main');
    vi.visitMain(this)
  }
}
