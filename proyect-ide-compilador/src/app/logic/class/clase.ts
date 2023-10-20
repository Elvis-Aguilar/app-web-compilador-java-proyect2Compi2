import { Funcion } from '../instructions/funcion/funcion';
import { Instruction } from '../instructions/instruction';

export class Clase {
  nombre: string;
  packag!: string;
  instructions: Instruction[] = [];
  isFinal:boolean = false;
  funciones:Funcion[] =[];

  constructor(nombre: string) {
    this.nombre = nombre;
  }


  pushFun(fun:Funcion){
    this.funciones.push(fun);
  }
}
