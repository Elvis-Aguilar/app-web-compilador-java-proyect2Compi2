import { TypeDato } from '../../table-simbol/type-dato';
import { NodoOperation } from '../operations/nodo-operation';

export class Read extends NodoOperation {
  constructor(typeDato: TypeDato) {
    super();
    this.typeDato = typeDato;
  }
}
