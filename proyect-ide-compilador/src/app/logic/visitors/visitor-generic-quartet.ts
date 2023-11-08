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
import { TypeDato } from '../table-simbol/type-dato';
import { Visitor } from './visitor';

export class VisitorGenericQuartet extends Visitor {
  readonly POINTER: string = 'ptr';
  readonly POINTERH: string = 'ptrh';
  qh: QuartHandler;

  constructor() {
    super();
    this.qh = new QuartHandler();
  }

  visitClass(clas: Clase): void {
    clas.constructors.forEach((constr) => {
      constr.genericQuartet(this);
    });
    clas.funciones.forEach((func) => {
      func.genericQuartet(this);
    });
  }

  visitMain(main: FunMain): void {
    const quartInitMain = new Quartet(
      '',
      '',
      `${main.nameCodigo3D}`,
      TypeOperationQuartet.DECLARREFUN
    );
    this.qh.push(quartInitMain);
    //contenido dentro de fun Main
    main.instructions.forEach((instr) => {
      instr.genericQuartet(this);
    });
    const quartFinishMain = new Quartet(
      '',
      '',
      '}',
      TypeOperationQuartet.CIERREFUN
    );
    this.qh.push(quartFinishMain);
    this.qh.setTmp(0); //se reinicia el temporal para cada fucion
  }

  visitConstruct(fun: Constructor): void {
    const quartInitMain = new Quartet(
      '',
      '',
      `${fun.nombre3Direc}`,
      TypeOperationQuartet.DECLARREFUN
    );
    this.qh.push(quartInitMain);
    //cuarteta para hacer `t0 = ptrh` puntero de h disponible
    const cuarteH = new Quartet(
      this.POINTERH,
      '',
      `int ${this.qh.tmpVar()}`,
      TypeOperationQuartet.ASIGNATION
    );
    this.qh.push(cuarteH);
    fun.result = this.qh.tmpVar();
    this.qh.aumentarTmp();
    //cuarteta para hacer `ptrh = ptrh + tamanio` aumentar el puntero disponible
    const cuarteHAumen = new Quartet(
      this.POINTERH,
      `${fun.tamaniClas}`,
      this.POINTERH,
      TypeOperationQuartet.SUMA
    );
    this.qh.push(cuarteHAumen);
    this.qh.aumentarTmp();
    //realizar instrucciones
    fun.instructions.forEach((instr) => {
      instr.genericQuartet(this);
    });
    //preparando el valor ptrh que fue asignado al espacio disponible
    //tn = ptr + 0
    const cuartDirec = new Quartet(
      this.POINTER,
      `0`,
      `int ${this.qh.tmpVar()}`,
      TypeOperationQuartet.SUMA
    );
    this.qh.push(cuartDirec);

    //stack[tn] = t0
    const cuartRetorno = new Quartet(
      `&t0`,
      '',
      `stack[${this.qh.tmpVar()}]`,
      TypeOperationQuartet.ASIGNATION
    );
    this.qh.push(cuartRetorno);
    const quartFinishMain = new Quartet(
      '',
      '',
      '}',
      TypeOperationQuartet.CIERREFUN
    );
    this.qh.push(quartFinishMain);
    this.qh.setTmp(0);
  }

  visitDeclaration(dec: Declaration): void {
    if (dec.op === null) {
      //no realiazar nada si no tiene asignacion
      return;
    }
    //preparando `tn = ptr + pos`
    const quart = new Quartet(
      this.POINTER,
      `${dec.pos}`,
      `int ${this.qh.tmpVar()}`,
      TypeOperationQuartet.SUMA
    );
    this.qh.push(quart);
    dec.result = this.qh.tmpVar();
    this.qh.aumentarTmp();
    dec.op.generecQuartet(this);
    if (
      dec.typeAsignar === TypeDato.CHAR ||
      dec.typeAsignar === TypeDato.STRING
    ) {
      const quartAsig = new Quartet(
        `${dec.op.restult}`,
        '',
        `stack[${dec.result}]`,
        TypeOperationQuartet.ASIGNATION
      );
      this.qh.push(quartAsig);
    } else {
      const quartAsig = new Quartet(
        `&${dec.op.restult}`,
        '',
        `stack[${dec.result}]`,
        TypeOperationQuartet.ASIGNATION
      );
      this.qh.push(quartAsig);
    }
  }

  visitAsig(asi: Asignacion): void {
    asi.op.generecQuartet(this);
    if (asi.global) {
      //variable en el heap t0 equivale a this
      const quartHeap = new Quartet(
        `t0`,
        `${asi.pos}`,
        `int ${this.qh.tmpVar()}`,
        TypeOperationQuartet.SUMA
      );
      this.qh.push(quartHeap);
      asi.result = this.qh.tmpVar();
      this.qh.aumentarTmp();
      if (
        asi.typeAsignar === TypeDato.CHAR ||
        asi.typeAsignar === TypeDato.STRING
      ) {
        const quartAsig = new Quartet(
          `${asi.op.restult}`,
          '',
          `heap[${asi.result}]`,
          TypeOperationQuartet.ASIGNATION
        );
        this.qh.push(quartAsig);
      } else {
        const quartAsig = new Quartet(
          `&${asi.op.restult}`,
          '',
          `heap[${asi.result}]`,
          TypeOperationQuartet.ASIGNATION
        );
        this.qh.push(quartAsig);
      }
    } else {
      //preparando `tn = ptr + pos`
      const quart = new Quartet(
        this.POINTER,
        `${asi.pos}`,
        `int ${this.qh.tmpVar()}`,
        TypeOperationQuartet.SUMA
      );
      this.qh.push(quart);
      asi.result = this.qh.tmpVar();
      this.qh.aumentarTmp();
      if (
        asi.typeAsignar === TypeDato.CHAR ||
        asi.typeAsignar === TypeDato.STRING
      ) {
        const quartAsig = new Quartet(
          `${asi.op.restult}`,
          '',
          `stack[${asi.result}]`,
          TypeOperationQuartet.ASIGNATION
        );
        this.qh.push(quartAsig);
      } else {
        const quartAsig = new Quartet(
          `&${asi.op.restult}`,
          '',
          `stack[${asi.result}]`,
          TypeOperationQuartet.ASIGNATION
        );
        this.qh.push(quartAsig);
      }
    }
  }

  visitDeclareObject(decOb: DeclarationObject): void {
    if (`${decOb.typeDatoAsig}` === 'null') {
      return;
    }
    const size: number = decOb.symbolTable.getPosition();
    let posParam:number = 1;
    decOb.ops.forEach((op) => {
      op.generecQuartet(this);
      const index = posParam -1;
      const typeAsignar = decOb.construcotrRelativo.parametros[index].typeDato;
      const quarttm = new Quartet(
        `${size}`,
        `${posParam}`,
        `int ${this.qh.tmpVar()}`,
        TypeOperationQuartet.SUMA
      );
      this.qh.push(quarttm);
      if (typeAsignar === TypeDato.CHAR || typeAsignar === TypeDato.STRING) {
        const quartStaCade = new Quartet(
          `${op.restult}`,
          '',
          `stack[${this.qh.tmpVar()}]`,
          TypeOperationQuartet.ASIGNATION
        );
        this.qh.push(quartStaCade);
      }else{
        const quartSta = new Quartet(
          `&${op.restult}`,
          '',
          `stack[${this.qh.tmpVar()}]`,
          TypeOperationQuartet.ASIGNATION
        );
        this.qh.push(quartSta);
      }
      this.qh.aumentarTmp();
      posParam++;
    });
    //aumentar el puntero, llamada al constructor, restar el puntero
    const quartAument = new Quartet(
      this.POINTER,
      `${size}`,
      this.POINTER,
      TypeOperationQuartet.SUMA
    );
    this.qh.push(quartAument);
    const quartLlamada = new Quartet(
      '',
      '',
      `${decOb.construcotrRelativo.nombre3Direc};`,
      TypeOperationQuartet.LLAMADAFUN
    );
    this.qh.push(quartLlamada);
    const quartReduce = new Quartet(
      this.POINTER,
      `${size}`,
      this.POINTER,
      TypeOperationQuartet.RESTA
    );
    this.qh.push(quartReduce);
    //obtener el valor del ptrh guardado en el constructor en la posicion 0
    const quartpos = new Quartet(
      this.POINTER,
      `${size}`,
      `int ${this.qh.tmpVar()}`,
      TypeOperationQuartet.SUMA
    );
    this.qh.push(quartpos);
    const tmp = this.qh.tmpVar();
    this.qh.aumentarTmp();
    const quartref = new Quartet(
      `*((int*)stack[${tmp}])`,
      '',
      `int ${this.qh.tmpVar()}`,
      TypeOperationQuartet.ASIGNATION
    );
    this.qh.push(quartref);
    const ref = this.qh.tmpVar();
    this.qh.aumentarTmp();
    const quart = new Quartet(
      this.POINTER,
      `${decOb.pos}`,
      `int ${this.qh.tmpVar()}`,
      TypeOperationQuartet.SUMA
    );
    this.qh.push(quart);
    const quar = new Quartet(
      `&${ref}`,
      '',
      `stack[${this.qh.tmpVar()}]`,
      TypeOperationQuartet.ASIGNATION
    );
    this.qh.push(quar);
    this.qh.aumentarTmp();
  }

  visitAsigObj(asigOb: asignacionObjec): void {
    const size: number = asigOb.symbolTable.getPosition();
    let posParam:number = 1;
    asigOb.opers.forEach((op) => {
      op.generecQuartet(this);
      const index = posParam -1;
      const typeAsignar = asigOb.construcotrRelativo.parametros[index].typeDato;
      const quarttm = new Quartet(
        `${size}`,
        `${posParam}`,
        `int ${this.qh.tmpVar()}`,
        TypeOperationQuartet.SUMA
      );
      this.qh.push(quarttm);
      if (typeAsignar === TypeDato.CHAR || typeAsignar === TypeDato.STRING) {
        const quartStaCade = new Quartet(
          `${op.restult}`,
          '',
          `stack[${this.qh.tmpVar()}]`,
          TypeOperationQuartet.ASIGNATION
        );
        this.qh.push(quartStaCade);
      }else{
        const quartSta = new Quartet(
          `&${op.restult}`,
          '',
          `stack[${this.qh.tmpVar()}]`,
          TypeOperationQuartet.ASIGNATION
        );
        this.qh.push(quartSta);
      }
      this.qh.aumentarTmp();
      posParam++;
    });;
    //aumentar el puntero, llamada al constructor, restar el puntero
    const quartAument = new Quartet(
      this.POINTER,
      `${size}`,
      this.POINTER,
      TypeOperationQuartet.SUMA
    );
    this.qh.push(quartAument);
    const quartLlamada = new Quartet(
      '',
      '',
      `${asigOb.construcotrRelativo.nombre3Direc};`,
      TypeOperationQuartet.LLAMADAFUN
    );
    this.qh.push(quartLlamada);
    const quartReduce = new Quartet(
      this.POINTER,
      `${size}`,
      this.POINTER,
      TypeOperationQuartet.RESTA
    );
    this.qh.push(quartReduce);
    //obtener el valor del ptrh guardado en el constructor en la posicion 0
    const quartpos = new Quartet(
      this.POINTER,
      `${size}`,
      `int ${this.qh.tmpVar()}`,
      TypeOperationQuartet.SUMA
    );
    this.qh.push(quartpos);
    const tmp = this.qh.tmpVar();
    this.qh.aumentarTmp();
    const quartref = new Quartet(
      `*((int*)stack[${tmp}])`,
      '',
      `int ${this.qh.tmpVar()}`,
      TypeOperationQuartet.ASIGNATION
    );
    this.qh.push(quartref);
    const ref = this.qh.tmpVar();
    this.qh.aumentarTmp();
    if (asigOb.global) {
      //acciones para el heap
      const quartHeap = new Quartet(
        `t0`,
        `${asigOb.pos}`,
        `int ${this.qh.tmpVar()}`,
        TypeOperationQuartet.SUMA
      );
      this.qh.push(quartHeap);
      const quar = new Quartet(
        `&${ref}`,
        '',
        `heap[${this.qh.tmpVar()}]`,
        TypeOperationQuartet.ASIGNATION
      );
      this.qh.push(quar);
      this.qh.aumentarTmp();
    } else {
      const quart = new Quartet(
        this.POINTER,
        `${asigOb.pos}`,
        `int ${this.qh.tmpVar()}`,
        TypeOperationQuartet.SUMA
      );
      this.qh.push(quart);
      const quar = new Quartet(
        `&${ref}`,
        '',
        `stack[${this.qh.tmpVar()}]`,
        TypeOperationQuartet.ASIGNATION
      );
      this.qh.push(quar);
      this.qh.aumentarTmp();
    }
  }

  //TODO: check si es variable para realizar difentes acciones
  visitOp(op: Operation): void {
    op.rootOp.genericQuatern(this);
    op.restult = op.rootOp.result;
  }

  visitNodoOP(nodo: NodoOperation): void {
    if (nodo.dato !== null) {
      nodo.valueDato(this);
      return;
    }
    nodo.opLeft?.genericQuatern(this);
    nodo.opRight?.genericQuatern(this);
    const quaOp = new Quartet(
      `${nodo.opLeft?.result}`,
      `${nodo.opRight?.result}`,
      this.qh.tmpVar(),
      nodo.typeQuartetOperation()
    );
    this.qh.push(quaOp);
    nodo.result = this.qh.tmpVar();
    this.qh.aumentarTmp();
  }

  visitLlamdadfun(llama: LlamadaFun): void {
    throw new Error('Method not implemented.');
  }
  visitLlamdadGen(llamaG: LlamadaFunGen): void {
    throw new Error('Method not implemented.');
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

  visitfor(fo: ForInstrction): void {
    throw new Error('Method not implemented.');
  }
  visitAsigArr(asi: AsignacionArr): void {
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
