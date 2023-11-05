import { Clase } from '../class/clase';
import { Constructor } from '../class/constructor';
import { FunMain } from '../class/fun-main';
import { CaseSwitchInstruction } from '../instructions/bifurcaciones/case-switch-instruction';
import { DoWhileInstruction } from '../instructions/bifurcaciones/do-while-instruction';
import { ElseInstruction } from '../instructions/bifurcaciones/Else-Instruction';
import { ForInstrction } from '../instructions/bifurcaciones/for-instruction';
import { IfInstruction } from '../instructions/bifurcaciones/If-instruction';
import { SwitchInstruction } from '../instructions/bifurcaciones/switch-instruction';
import { WhileInstruction } from '../instructions/bifurcaciones/while-Instruction';
import { AsignacionArr } from '../instructions/declare-asig/asiganacion-arr';
import { Asignacion } from '../instructions/declare-asig/asignacion';
import { asignacionObjec } from '../instructions/declare-asig/asignacion-objc';
import { Declaration } from '../instructions/declare-asig/declaration';
import { DeclarationArr } from '../instructions/declare-asig/declaration-arr';
import { DeclarationObject } from '../instructions/declare-asig/declaration-object';
import { FunMath } from '../instructions/fun-nativas/fun-math';
import { Sout } from '../instructions/fun-nativas/sout';
import { Funcion } from '../instructions/funcion/funcion';
import { LlamadaFun } from '../instructions/funcion/llamada-fun';
import { LlamadaFunGen } from '../instructions/funcion/llamada-fun-gen';
import { NodoOperation } from '../instructions/operations/nodo-operation';
import { Operation } from '../instructions/operations/operation';
import { Quartet } from '../quartets/quartet';
import { QuartHandler } from '../quartets/quartHandler';
import { TypeOperationQuartet } from '../quartets/type-operation-quartet';
import { Visitor } from './visitor';

export class VisitorGenericQuartet extends Visitor {
  visitMain(main: FunMain): void {
    throw new Error('Method not implemented.');
  }
  visitAsigObj(asigOb: asignacionObjec): void {
    throw new Error('Method not implemented.');
  }
  visitLlamdadfun(llama: LlamadaFun): void {
    throw new Error('Method not implemented.');
  }
  visitLlamdadGen(llamaG: LlamadaFunGen): void {
    throw new Error('Method not implemented.');
  }
  visitDeclareObject(decOb: DeclarationObject): void {
    throw new Error('Method not implemented.');
  }

  readonly POINTER: string = 'ptr';
  qh: QuartHandler;

  constructor(){
      super();
      this.qh = new QuartHandler();
  }
  
  visitClass(clas: Clase): void {
    throw new Error('Method not implemented.');
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
  
  visitIf(ifI: IfInstruction): void {
    throw new Error('Method not implemented.');
  }

  visitElse(elseI: ElseInstruction): void {
    throw new Error('Method not implemented.');
  }

  visitWhile(whileI: WhileInstruction): void {
    throw new Error('Method not implemented.');
  }
  visitDoWhile(doWhileI: DoWhileInstruction): void {
    throw new Error('Method not implemented.');
  }

  visitSwitch(swit: SwitchInstruction): void {
    throw new Error('Method not implemented.');
  }
  visitCaseSwitch(caseSwitchI: CaseSwitchInstruction): void {
    throw new Error('Method not implemented.');
  }

  visitFuncion(fun: Funcion): void {
    throw new Error('Method not implemented.');
  }
  visitConstruct(fun: Constructor): void {
    throw new Error('Method not implemented.');
  }
  visitfor(fo: ForInstrction): void {
    throw new Error('Method not implemented.');
  }
  visitAsigArr(asi: AsignacionArr): void {
    throw new Error('Method not implemented.');
  }
  visitAsig(asi: Asignacion): void {
    throw new Error('Method not implemented.');
  }
  visitDeclareArr(dec: DeclarationArr): void {
    throw new Error('Method not implemented.');
  }
  visitFunMath(funMath: FunMath): void {
    throw new Error('Method not implemented.');
  }
  visitSout(sout: Sout): void {
    throw new Error('Method not implemented.');
  }

}
