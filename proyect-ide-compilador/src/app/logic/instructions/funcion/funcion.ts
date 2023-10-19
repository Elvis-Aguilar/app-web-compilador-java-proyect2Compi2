import { Token } from 'src/app/parser/token';
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

  constructor(config:any, token: Token, nombre:string, parametros:Variable[], instructions:Instruction[]) {
    super();
    this.token = token;
    this.nombre = nombre;
    this.parametros = parametros;
    this.instructions = instructions;
    this.construiConfig(config);
  }

  execute(vi: Visitor): void {
    //TODO:Method not implemented.
  }
  genericQuartet(vi: Visitor): void {
    throw new Error('Method not implemented.');
  }

  construiConfig(config:any){
    if (config instanceof Array) {
        this.visibilidad = config[0];
        this.isStatik = config[1];
        this.isFinal = config[2];
        this.typeRetorno = config[3];
    }
  }
}
