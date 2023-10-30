import { Token } from 'src/app/parser/token';
import { Dato } from '../../table-simbol/dato';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { TypeDato } from '../../table-simbol/type-dato';
import { Variable } from '../../table-simbol/variable';
import { Visibilidad } from '../../table-simbol/visibilidad';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';

export class Funcion extends Instruction {
  token: Token;
  typeRetorno!: TypeDato;
  visibilidad!: Visibilidad;
  isStatik!: boolean;
  isFinal!: boolean;
  nombre:string;
  parametros:Variable[];
  instructions:Instruction[];
  symbolTable!: SymbolTable;
  nombre3Direc:string=''


  constructor(config:any, token: Token, nombre:string, parametros:Variable[], instructions:Instruction[]) {
    super();
    this.token = token;
    this.nombre = nombre;
    this.parametros = parametros;
    this.instructions = instructions;
    this.construiConfig(config);
  }

  execute(vi: Visitor): void {
    vi.visitFuncion(this);
  }
  genericQuartet(vi: Visitor): void {
    throw new Error('Method not implemented.');
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre:SymbolTable){
    this.symbolTable = new SymbolTable('funcion');
    this.symbolTable.symbolTablePadre = symbolTablePadre;
    this.crearReturn();
    this.agregarParamSymbolTable();
    vi.visitFuncion(this);
  }

  construiConfig(config:any){
    if (config instanceof Array) {
        this.visibilidad = config[0];
        this.isStatik = config[1];
        this.isFinal = config[2];
        this.typeRetorno = config[3];
    }
  }

  private crearReturn(){
    if (this.typeRetorno !== TypeDato.VOID) {
      const vari = new Variable(Visibilidad.PUBLIC, false, false,this.typeRetorno,'return',this.token, new Dato(this.typeRetorno,1,'',false,this.token));
      vari.pos = 0;
      this.symbolTable.variables.push(vari);
    }
  }

  private agregarParamSymbolTable(){
    let pos = 1;
    this.parametros.forEach((param) =>{
      param.pos = pos;
      pos++;
      this.symbolTable.variables.push(param);
    })
    this.symbolTable.pos = pos;
  }
}
