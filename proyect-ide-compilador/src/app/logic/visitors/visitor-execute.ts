import { CaseSwitchInstruction } from '../instructions/bifurcaciones/case-switch-instruction';
import { DoWhileInstruction } from '../instructions/bifurcaciones/do-while-instruction';
import { ElseInstruction } from '../instructions/bifurcaciones/Else-Instruction';
import { IfInstruction } from '../instructions/bifurcaciones/If-instruction';
import { SwitchInstruction } from '../instructions/bifurcaciones/switch-instruction';
import { WhileInstruction } from '../instructions/bifurcaciones/while-Instruction';
import { Declaration } from '../instructions/declare-asig/declaration';
import { NodoOperation } from '../instructions/operations/nodo-operation';
import { Operation } from '../instructions/operations/operation';
import { OperationCasteo } from '../instructions/operations/operation-casteo';
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
    const datoLeft = nodo.opLeft?.execute(this) || new Dato(TypeDato.INTEGER);
    const datoRight = nodo.opRight?.execute(this) || new Dato(TypeDato.INTEGER);
    const operacion = new OperationCasteo();
    if (nodo.typeOp ) {
      return operacion.getDato(datoLeft, datoRight, nodo.typeOp);
    }
    return tmp;
  }

  visitDeclaration(dec: Declaration): void {
    throw new Error('Method not implemented.');
  }


  visitIf(ifI: IfInstruction): void {
    ifI.volorCondicion(this);
    ifI.instructions.forEach(instru => {
      instru.execute(this);
    });
    if (ifI.ElseIfInstruction) {
      ifI.ElseIfInstruction.execute(this);
    }
    if (ifI.ElseInstruction) {
      ifI.ElseInstruction.execute(this);
    }
  }

  visitElse(elseI: ElseInstruction): void {
    elseI.instructions.forEach(instru => {
      instru.execute(this);
    });
  }

  visitWhile(whileI: WhileInstruction): void {
    //TODO: Method not implemented.
  }
  visitDoWhile(doWhileI: DoWhileInstruction): void {
    //TODO: Method not implemented.
  }

  visitSwitch(swit: SwitchInstruction): void {
    //TODO: Method not implemented.
  }
  visitCaseSwitch(caseSwitchI: CaseSwitchInstruction): void {
    //TODO: Method not implemented.
  }
 
}
