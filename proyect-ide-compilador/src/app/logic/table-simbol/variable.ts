import { Dato } from './dato';
import { TypeDato } from './type-dato';

export class Variable {
  typeDato: TypeDato;
  dato: Dato | null;
  id: string;

  constructor(typeDato: TypeDato, id: string, dato?: Dato) {
    this.typeDato = typeDato;
    this.id = id;
    this.dato = dato || null;

  }
}
