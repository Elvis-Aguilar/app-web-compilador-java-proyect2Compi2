import { Token } from 'src/app/parser/token';
import { Instruction } from '../instructions/instruction';
import { SymbolTable } from '../table-simbol/symbol-table';
import { Variable } from '../table-simbol/variable';
import { Visitor } from '../visitors/visitor';

export class Constructor extends Instruction {

  symbolTable!: SymbolTable;
  instructions: Instruction[];
  parametros: Variable[];
  token: Token;
  nombre: string = '';

  constructor(nombre: any,parametros: Variable[],instructions: Instruction[], token: Token) {
    super();
    this.nombre = nombre[3];
    this.parametros = parametros;
    this.instructions = instructions;
    this.token = token;
  }

  execute(vi: Visitor): void {
    throw new Error('Method not implemented.');
  }
  genericQuartet(vi: Visitor): void {
    throw new Error('Method not implemented.');
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = new SymbolTable('funcion');
    this.symbolTable.symbolTablePadre = symbolTablePadre;
    vi.visitConstruct(this)
  }

}
