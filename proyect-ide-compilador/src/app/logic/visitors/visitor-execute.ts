import { Clase } from '../class/clase';
import { CaseSwitchInstruction } from '../instructions/bifurcaciones/case-switch-instruction';
import { DoWhileInstruction } from '../instructions/bifurcaciones/do-while-instruction';
import { ElseInstruction } from '../instructions/bifurcaciones/Else-Instruction';
import { IfInstruction } from '../instructions/bifurcaciones/If-instruction';
import { SwitchInstruction } from '../instructions/bifurcaciones/switch-instruction';
import { WhileInstruction } from '../instructions/bifurcaciones/while-Instruction';
import { Declaration } from '../instructions/declare-asig/declaration';
import { Funcion } from '../instructions/funcion/funcion';
import { NodoOperation } from '../instructions/operations/nodo-operation';
import { Operation } from '../instructions/operations/operation';
import { OperationCasteo } from '../instructions/operations/operation-casteo';
import { Dato } from '../table-simbol/dato';
import { TypeDato } from '../table-simbol/type-dato';
import { Visitor } from './visitor';

export class VisitorExecute extends Visitor {

  visitClass(clas: Clase): void {
    throw new Error('Method not implemented.');
  }

  visitFuncion(fun: Funcion): void {
    throw new Error('Method not implemented.');
  }

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
    const tmp = new Dato(TypeDato.INT);
    const datoLeft = nodo.opLeft?.execute(this) || new Dato(TypeDato.INT);
    const datoRight = nodo.opRight?.execute(this) || new Dato(TypeDato.INT);
    const operacion = new OperationCasteo();
    if (nodo.typeOp) {
      return operacion.getDato(datoLeft, datoRight, nodo.typeOp);
    }
    return tmp;
  }

  visitDeclaration(dec: Declaration): void {}

  visitIf(ifI: IfInstruction): void {
    ifI.volorCondicion(this);
    ifI.instructions.forEach((instru) => {
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
    elseI.instructions.forEach((instru) => {
      instru.execute(this);
    });
  }

  visitWhile(whileI: WhileInstruction): void {
    whileI.valorCondicion(this);
    whileI.instructions.forEach((instru) => {
      instru.execute(this);
    });
  }
  visitDoWhile(doWhileI: DoWhileInstruction): void {
    doWhileI.instructions.forEach((instr) => {
      instr.execute(this);
    });
    doWhileI.valorCondicion(this);
  }

  visitSwitch(swit: SwitchInstruction): void {
    swit.validar(this);
  }

  visitCaseSwitch(caseSwitchI: CaseSwitchInstruction): void {
    caseSwitchI.instructions.forEach((instr) => {
      instr.execute(this);
    });
  }
}
