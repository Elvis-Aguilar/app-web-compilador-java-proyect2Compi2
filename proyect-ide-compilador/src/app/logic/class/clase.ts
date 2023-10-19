import { Instruction } from '../instructions/instruction';

export class Clase {
  nombre: string;
  packag!: string;
  instructions: Instruction[] = [];
  isFinal:boolean = false;

  constructor(nombre: string) {
    this.nombre = nombre;
  }
}
