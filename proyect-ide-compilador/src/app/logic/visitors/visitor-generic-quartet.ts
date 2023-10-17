import { Declaration } from '../instructions/declare-asig/declaration';
import { NodoOperation } from '../instructions/operations/nodo-operation';
import { Operation } from '../instructions/operations/operation';
import { Quartet } from '../quartets/quartet';
import { QuartHandler } from '../quartets/quartHandler';
import { TypeOperationQuartet } from '../quartets/type-operation-quartet';
import { Visitor } from './visitor';

export class VisitorGenericQuartet extends Visitor {
  
    readonly POINTER: string = 'ptr';
    qh: QuartHandler;

    constructor(){
        super();
        this.qh = new QuartHandler();
    }

  visitDeclaration(dec: Declaration): void {
    if (dec.op === null) {
        //TODO: asignar la posicion de la variable en el stack var.pos = qh.posstack()
        this.qh.aumentarPosSatk();
        return;
    }
    //preparando `tn`
    const quart = new Quartet(this.POINTER,`${this.qh.pos()}`,`${this.qh.tmpVar()}`,TypeOperationQuartet.SUMA);
    this.qh.push(quart);
    dec.result = this.qh.tmpVar();
    this.qh.aumentarPosSatk();
    this.qh.aumentarTmp();
    dec.op.generecQuartet(this);
    const quartAsig = new Quartet(`${dec.op.restult}`,'',`stack[${dec.result}]`, TypeOperationQuartet.ASIGNATION)
    this.qh.push(quartAsig);

  }

  //TODO: check si es variable para realizar difentes acciones
  visitOp(op: Operation): void {
    op.rootOp.genericQuatern(this);
    op.restult = op.rootOp.result;
  }

  visitNodoOP(nodo: NodoOperation): void {
      if (nodo.dato !== null) {
        nodo.valueDato();
        return;
      }
      nodo.opLeft?.genericQuatern(this);
      nodo.opRight?.genericQuatern(this);
      const quaOp = new Quartet(`${nodo.opLeft?.result}`, `${nodo.opRight?.result}`, this.qh.tmpVar(),nodo.typeQuartetOperation());
      this.qh.push(quaOp);
      nodo.result = this.qh.tmpVar();
      this.qh.aumentarTmp();

  }
}
