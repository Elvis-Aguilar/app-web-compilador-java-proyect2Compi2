import { Dato } from './dato';
import { TypeDato } from './type-dato';
import { Visibilidad } from './visibilidad';

export class Variable {
  typeDato: TypeDato;
  dato: Dato | null;
  id: string;
  inizializado: boolean = false;
  visibilidad: Visibilidad;
  isStatik: boolean;
  isFinal: boolean;

  constructor(
    visibilidad: Visibilidad,
    isStatik: boolean,
    isFinal: boolean,
    typeDato: TypeDato,
    id: string,
    dato?: Dato
  ) {
    this.visibilidad = visibilidad;
    this.isStatik = isStatik;
    this.isFinal = isFinal;
    this.typeDato = typeDato;
    this.id = id;
    this.dato = dato || null;
  }
}
