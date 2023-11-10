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
    const quartPrototipo = new Quartet('','',`${main.nameCodigo3D}`,TypeOperationQuartet.DECLARPROTOTIPO);
    this.qh.unshift(quartPrototipo);
    const quartInitMain = new Quartet('','',`${main.nameCodigo3D}`,TypeOperationQuartet.DECLARREFUN);
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
    const quartPrototipo = new Quartet('','',`${fun.nombre3Direc}`,TypeOperationQuartet.DECLARPROTOTIPO);
    this.qh.unshift(quartPrototipo);
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
    const quartAument = new Quartet(this.POINTER, `${size}`, this.POINTER, TypeOperationQuartet.SUMA);
    this.qh.push(quartAument);
    const quartLlamada = new Quartet('','', `${decOb.construcotrRelativo.nombre3Direc};`, TypeOperationQuartet.LLAMADAFUN);
    this.qh.push(quartLlamada);
    const quartReduce = new Quartet(this.POINTER, `${size}`, this.POINTER, TypeOperationQuartet.RESTA);
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

  visitOp(op: Operation): void {
    op.rootOp.genericQuatern(this);
    op.restult = op.rootOp.result;
  }

  visitNodoOP(nodo: NodoOperation): void {
    if (nodo.dato !== null) {
      if (!nodo.dato.isVariable) {
        nodo.valueDato(this);
        return;
      }
      if (nodo.dato.global) {
        nodo.getValorVariableGlobal(this);
        return;
      }else{
        nodo.getValorVariableLoacal(this);
        return;
      }
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

  visitFuncion(fun: Funcion): void {
    const quartPrototipo = new Quartet('','',`${fun.nombre3Direc}`,TypeOperationQuartet.DECLARPROTOTIPO);
    this.qh.unshift(quartPrototipo);
    const quartInitFun = new Quartet(
      '',
      '',
      `${fun.nombre3Direc}`,
      TypeOperationQuartet.DECLARREFUN
    );
    this.qh.push(quartInitFun);
    const cuarteH = new Quartet(
      this.POINTER,
      '0',
      `int ${this.qh.tmpVar()}`,
      TypeOperationQuartet.SUMA
    );
    this.qh.push(cuarteH);
    this.qh.aumentarTmp();
    const cuarteThis = new Quartet(
      `*((int*)stack[t0])`,
      '',
      `int ${this.qh.tmpVar()}`,
      TypeOperationQuartet.ASIGNATION
    );
    this.qh.push(cuarteThis);
    this.qh.aumentarTmp();
    const cuarteThisAjus = new Quartet(
      `t1`,
      '',
      `t0`,
      TypeOperationQuartet.ASIGNATION
    );
    this.qh.push(cuarteThisAjus);
    fun.instructions.forEach((instr) =>{
      instr.genericQuartet(this);
    })
    const quartFinishFun = new Quartet(
      '',
      '',
      '}',
      TypeOperationQuartet.CIERREFUN
    );
    this.qh.push(quartFinishFun);
    this.qh.setTmp(0);
  }

  visitLlamdadfun(llama: LlamadaFun): void {
    //enviando la This a la funcion en la pos 0 en el stack local
    let tRef;
    if(llama.objeto !== ''){
      if (llama.global) {
        //obtener del heap
        const quartHep = new Quartet('t0',`${llama.posObjeto}`,`int ${this.qh.tmpVar()}`, TypeOperationQuartet.SUMA); 
        this.qh.push(quartHep);
        const tmp = this.qh.tmpVar();
        this.qh.aumentarTmp();
        const quarValHeap = new Quartet(`*((int*)heap[${tmp}])`,``,`int ${this.qh.tmpVar()}`, TypeOperationQuartet.ASIGNATION); 
        this.qh.push(quarValHeap);
        tRef = this.qh.tmpVar();
        this.qh.aumentarTmp();
      }else{
        //obtener del stack
        const quartHep = new Quartet(this.POINTER,`${llama.posObjeto}`,`int ${this.qh.tmpVar()}`, TypeOperationQuartet.SUMA); 
        this.qh.push(quartHep);
        const tmp = this.qh.tmpVar();
        this.qh.aumentarTmp();
        const quarValHeap = new Quartet(`*((int*)stack[${tmp}])`,``,`int ${this.qh.tmpVar()}`, TypeOperationQuartet.ASIGNATION); 
        this.qh.push(quarValHeap);
        tRef = this.qh.tmpVar();
        this.qh.aumentarTmp();
      }
      const quartHep = new Quartet(this.POINTER,`${llama.symbolTable.getPosition()}`,`int ${this.qh.tmpVar()}`, TypeOperationQuartet.SUMA); 
      this.qh.push(quartHep);
      const posStak = this.qh.tmpVar();
      this.qh.aumentarTmp();
      const quarValHeap = new Quartet(`&${tRef}`,``,`stack[${posStak}]`, TypeOperationQuartet.ASIGNATION); 
      this.qh.push(quarValHeap);
    }else{
      const quartHep = new Quartet(this.POINTER,`${llama.symbolTable.getPosition()}`,`int ${this.qh.tmpVar()}`, TypeOperationQuartet.SUMA); 
      this.qh.push(quartHep);
      const posStak = this.qh.tmpVar();
      this.qh.aumentarTmp();
      const quarValHeap = new Quartet(`&t0`,``,`stack[${posStak}]`, TypeOperationQuartet.ASIGNATION); 
      this.qh.push(quarValHeap);
    }

    //enviando argumentos
    const size: number = llama.symbolTable.getPosition();
    let posParam:number = 1;
    llama.argumens.forEach((op) => {
      op.generecQuartet(this);
      const index = posParam -1;
      const typeAsignar = llama.funRelativa.parametros[index].typeDato;
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

    //llamando a la funcion
    const quartAument = new Quartet(this.POINTER, `${size}`, this.POINTER, TypeOperationQuartet.SUMA);
    this.qh.push(quartAument);
    const quartLlamada = new Quartet('','', `${llama.funRelativa.nombre3Direc};`, TypeOperationQuartet.LLAMADAFUN);
    this.qh.push(quartLlamada);
    const quartReduce = new Quartet(this.POINTER, `${size}`, this.POINTER, TypeOperationQuartet.RESTA);
    this.qh.push(quartReduce);

    //obteniendo el return
    const quartPosRetun = new Quartet(this.POINTER, `${size}`, `int ${this.qh.tmpVar()}`, TypeOperationQuartet.SUMA);
    this.qh.push(quartPosRetun);
    const posSatk = this.qh.tmpVar();
    this.qh.aumentarTmp();
    const typ = llama.typeCrearFun();
    if (typ === 'char') {
      const quartGetCh = new Quartet(
        `stack[${posSatk}]`,'',`${typ}* ${this.qh.tmpVar()}`,TypeOperationQuartet.ASIGNATION
      );
      this.qh.push(quartGetCh);
      llama.result = this.qh.tmpVar();
      this.qh.aumentarTmp();
    }else{
      const quartGet = new Quartet(
        `*((${typ}*)stack[${posSatk}])`,'',`${typ} ${this.qh.tmpVar()}`,TypeOperationQuartet.ASIGNATION
      );
      this.qh.push(quartGet);
      llama.result = this.qh.tmpVar();
      this.qh.aumentarTmp();
    }
  }

  visitLlamdadGen(llamaG: LlamadaFunGen): void {
    llamaG.funLlamada.genericQuatern(this);
  }

  visitSout(sout: Sout): void {
    //declarando un char = "" vacio, para poder concatenar la salida
    const quartInicial = new Quartet('\"\"', '', `char ${this.qh.tmpVar()}[80]`, TypeOperationQuartet.ASIGNATION); 
    this.qh.push(quartInicial);
    sout.result = this.qh.tmpVar();
    this.qh.aumentarTmp();
    //realizando las cuartetas de la operacion
    sout.op.generecQuartet(this);
    //concatenando la salida con el resultado de la operacion, dependiendo el caso
    switch(sout.typeImprimir){
      case TypeDato.INT:
        const quartCadeInt = new Quartet(`strlen(${sout.result}),`, `\"%d\", ${sout.op.restult}`, `${sout.result}`, TypeOperationQuartet.CONCATCADEENTERO); 
        this.qh.push(quartCadeInt);
      break;
      case TypeDato.BOOLEAN:
        const quartCadeBool = new Quartet(`strlen(${sout.result}),`, `\"%d\", ${sout.op.restult}`, `${sout.result}`, TypeOperationQuartet.CONCATCADEENTERO); 
        this.qh.push(quartCadeBool);
      break;
      case TypeDato.CHAR:
        const quartCadeChar= new Quartet(`${sout.op.restult}`,'', `${sout.result}`, TypeOperationQuartet.CONCATCADECADE); 
        this.qh.push(quartCadeChar);
      break;
      case TypeDato.FLOAT:
        const quartCadeFloat = new Quartet(`strlen(${sout.result}),`, `\"%f\", ${sout.op.restult}`, `${sout.result}`, TypeOperationQuartet.CONCATCADEENTERO); 
        this.qh.push(quartCadeFloat);
      break;
      case TypeDato.STRING:
        const quartCadeString= new Quartet(`${sout.op.restult}`,'', `${sout.result}`, TypeOperationQuartet.CONCATCADECADE); 
        this.qh.push(quartCadeString);
      break;
      case TypeDato.VOID:
        const quartCadeVoid = new Quartet(`strlen(${sout.result}),`, `\"%d\", ${sout.op.restult}`, `${sout.result}`, TypeOperationQuartet.CONCATCADEENTERO); 
        this.qh.push(quartCadeVoid);
      break;
      default:
        const quartCadeObject = new Quartet(`strlen(${sout.result}),`, `\"%d\", ${sout.op.restult}`, `${sout.result}`, TypeOperationQuartet.CONCATCADEENTERO); 
        this.qh.push(quartCadeObject);
        break;
    }
    //imprimir la salida con prinf con saldo de linea o sin salto
    if (sout.salto) {
      const quartImpr = new Quartet(`"%s\\n"`, '', `${sout.result}`, TypeOperationQuartet.IMPRIMIR); 
      this.qh.push(quartImpr);
    }else{
      const quartImpr = new Quartet('\"%s\"', '', `${sout.result}`, TypeOperationQuartet.IMPRIMIR); 
      this.qh.push(quartImpr);
    }
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

  visitfor(fo: ForInstrction): void {
    throw new Error('Method not implemented.');
  }
  
  visitAsigArr(asi: AsignacionArr): void {
    //TODO: Method not implemented.
  }

  visitDeclareArr(dec: DeclarationArr): void {
    //TODO: Method not implemented.
  }

  visitFunMath(funMath: FunMath): void {
    //TODO: Method not implemented.
  }

  visitSwitch(swit: SwitchInstruction): void {
    //TODO: Method not implemented.
  }

  visitCaseSwitch(caseSwitchI: CaseSwitchInstruction): void {
    //TODO: Method not implemented.
  }

}
