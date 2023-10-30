import { Token } from 'src/app/parser/token';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';

export class ElseInstruction extends Instruction {
  instructions: Instruction[] = [];
  symbolTable!: SymbolTable;
  token: Token;

  constructor(instructions: Instruction[], token: Token) {
    super();
    this.instructions = instructions;
    this.token = token;
  }

  execute(vi: Visitor): void {
    vi.visitElse(this);
  }

  genericQuartet(vi: Visitor): void {
    //TODO: Method not implemented.
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = new SymbolTable('else');
    this.symbolTable.pos = symbolTablePadre.pos+1;
    this.symbolTable.symbolTablePadre = symbolTablePadre;
    vi.visitElse(this);
  }
}
