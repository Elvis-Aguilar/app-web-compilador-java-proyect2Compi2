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
  nombre3Direc: string = '';
  result:string = '';
  tamaniClas:number = 0;

  constructor(nombre: any,parametros: Variable[],instructions: Instruction[], token: Token) {
    super();
    this.nombre = nombre[3];
    this.parametros = parametros;
    this.instructions = instructions;
    this.token = token;
  }

  execute(vi: Visitor): void {
    vi.visitConstruct(this);
  }

  genericQuartet(vi: Visitor): void {
    vi.visitConstruct(this);
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = new SymbolTable('funcion');
    this.symbolTable.symbolTablePadre = symbolTablePadre;
    this.agregarParamSymbolTable()
    this.symbolTable.pos = 1;
    vi.visitConstruct(this)
  }

  private agregarParamSymbolTable(){
    let pos = 1;
    this.parametros.forEach((param) =>{
      param.pos = pos;
      pos++;
      this.symbolTable.variables.push(param);
    })
  }

}
