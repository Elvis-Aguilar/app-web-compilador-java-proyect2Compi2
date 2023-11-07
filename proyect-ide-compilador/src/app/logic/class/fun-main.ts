import { Token } from 'src/app/parser/token';
import { Instruction } from '../instructions/instruction';
import { SymbolTable } from '../table-simbol/symbol-table';
import { Visitor } from '../visitors/visitor';

export class FunMain extends Instruction {
  instructions: Instruction[];
  token: Token;
  symbolTable!: SymbolTable;
  nameCodigo3D:string = 'main_main()';

  constructor(instructions: Instruction[], token: Token) {
    super();
    this.instructions = instructions;
    this.token = token;
  }

  execute(vi: Visitor): void {
    vi.visitMain(this);
  }
  genericQuartet(vi: Visitor): void {
    vi.visitMain(this);
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre?: SymbolTable): void {
    this.symbolTable = new SymbolTable('Main');
    vi.visitMain(this)
  }
}
