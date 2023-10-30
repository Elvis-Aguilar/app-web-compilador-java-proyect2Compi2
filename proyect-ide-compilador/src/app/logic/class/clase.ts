import { ErrorSingleton } from '../errors/error-singleton';
import { Error } from '../errors/errors';
import { TypeError } from '../errors/type-error';
import { Funcion } from '../instructions/funcion/funcion';
import { Instruction } from '../instructions/instruction';
import { SymbolTable } from '../table-simbol/symbol-table';
import { Visitor } from '../visitors/visitor';
import { Constructor } from './constructor';
import { FunMain } from './fun-main';

export class Clase {
  nombre: string;
  packag!: string;
  instructions: Instruction[] = [];
  isFinal:boolean = false;
  funciones:Funcion[] =[];
  funMain!:FunMain;
  constructors: Constructor[] =[];
  symbolTable!:SymbolTable;
  clases:Clase[]=[];
  yaEjecuta:boolean = false;
  imports:Array<string> = [];


  constructor(nombre: string) {
    this.nombre = nombre;
  }


  pushFun(fun:Funcion){
    this.funciones.push(fun);
  }

  pushMain(funMain:FunMain){
    if (this.funMain) {
      const msj = 'Solo puede existir una funcion main en clase'
      ErrorSingleton.getInstance().push(new Error(funMain.token.line,funMain.token.column,funMain.token.id,`${msj}`,TypeError.SEMANTICO));
    }else{
      this.funMain = funMain;
    }
  }

  execute(vi:Visitor){
    vi.visitClass(this);
  }

  referenciarSymbolTable(vi: Visitor){
    this.symbolTable = new SymbolTable(this.nombre);
    vi.visitClass(this);
  }


  pushConstructor(constr:Constructor){
    if (constr.nombre === this.nombre) {
      this.constructors.push(constr);
    }else{
      const msj = 'Construcotor invalido, debe de llamarse igual a la Clase'
      ErrorSingleton.getInstance().push(new Error(constr.token.line,constr.token.column,constr.token.id,`${msj}`,TypeError.SEMANTICO));
    }
  }

  obtenerImports(impor:string[]){
    const importaciones:string[] = []
    impor.forEach(imp => {
      const limpi = this.limpiarImport(imp);
      importaciones.push(limpi);
    });
    this.imports = importaciones;
  }

  private limpiarImport(cadena:string):string{
    const partes = cadena.split(".");
    if (partes.length > 1) {
      partes.pop();
      return partes.join(".");
    }
    return cadena;
  }

}
