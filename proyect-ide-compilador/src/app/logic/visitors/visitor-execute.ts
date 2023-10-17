import { Declaration } from '../instructions/declare-asig/declaration';
import { NodoOperation } from '../instructions/operations/nodo-operation';
import { Operation } from '../instructions/operations/operation';
import { Dato } from '../table-simbol/dato';
import { TypeDato } from '../table-simbol/type-dato';
import { Visitor } from './visitor';

export class VisitorExecute extends Visitor {
  visitOp(op: Operation): Dato | void {
    return op.rootOp.execute(this);
  }

  /**
   * logica para ejecucion de operaciones
   * TODO: verificar si es una vairable para buscarla y obtener su dato.
   * @param nodo
   */
  visitNodoOP(nodo: NodoOperation): Dato | void {
    if (!nodo.typeOp && nodo.dato !== null) {
      return nodo.dato;
    }
    const tmp = new Dato(TypeDato.INTEGER);
    const datoLeft = nodo.opLeft?.execute(this);
    const datoRight = nodo.opRight?.execute(this);
    
    return tmp;
  }

  visitDeclaration(dec: Declaration): void {
    throw new Error('Method not implemented.');
  }
}
