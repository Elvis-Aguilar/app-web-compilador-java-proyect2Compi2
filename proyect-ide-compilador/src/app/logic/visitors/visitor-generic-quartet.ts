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
import { TypeOperation } from '../instructions/operations/type-operation';
import { Quartet } from '../quartets/quartet';
import { QuartHandler } from '../quartets/quartHandler';
import { TypeOperationQuartet } from '../quartets/type-operation-quartet';
import { TypeDato } from '../table-simbol/type-dato';
import { Visitor } from './visitor';
import { Read } from "../instructions/fun-nativas/read";
import { AsigCompletaArr } from '../arreglos/asig-completa-arr';
import { NodoArreglo } from '../arreglos/nodo-arr';
import { Dato } from '../table-simbol/dato';


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
    op.quartets = op.rootOp.quartets;
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
    if (nodo.opSimple()) {
      nodo.opLeft?.genericQuatern(this);
      nodo.opRight?.genericQuatern(this);
      const typ = nodo.opLeft?.typeCrear();
      if(typ){
        switch(typ){
          case 'char':
            //una concatenacion
            const quartInicial = new Quartet('\"\"', '', `char ${this.qh.tmpVar()}[45]`, TypeOperationQuartet.ASIGNATION); 
            this.qh.push(quartInicial);
            nodo.result = this.qh.tmpVar();
            this.qh.aumentarTmp();
            const quartCadeCharIni= new Quartet(`${nodo.opLeft?.result}`,'', `${nodo.result}`, TypeOperationQuartet.CONCATCADECADE); 
            this.qh.push(quartCadeCharIni); 
            const typeRight = nodo.opRight?.typeDato;
            switch(typeRight){
              case TypeDato.INT:
                const quartCadeInt = new Quartet(`strlen(${nodo.result}),`, `\"%d\", ${nodo.opRight?.result}`, `${nodo.result}`, TypeOperationQuartet.CONCATCADEENTERO); 
                this.qh.push(quartCadeInt);
              break;
              case TypeDato.BOOLEAN:
                const quartCadeBool = new Quartet(`strlen(${nodo.result}),`, `\"%d\", ${nodo.opRight?.result}`, `${nodo.result}`, TypeOperationQuartet.CONCATCADEENTERO); 
                this.qh.push(quartCadeBool);
              break;
              case TypeDato.CHAR:
                const quartCadeChar= new Quartet(`${nodo.opRight?.result}`,'', `${nodo.result}`, TypeOperationQuartet.CONCATCADECADE); 
                this.qh.push(quartCadeChar);
              break;
              case TypeDato.FLOAT:
                const quartCadeFloat = new Quartet(`strlen(${nodo.result}),`, `\"%f\", ${nodo.opRight?.result}`, `${nodo.result}`, TypeOperationQuartet.CONCATCADEENTERO); 
                this.qh.push(quartCadeFloat);
              break;
              case TypeDato.STRING:
                const quartCadeString= new Quartet(`${nodo.opRight?.result}`,'', `${nodo.result}`, TypeOperationQuartet.CONCATCADECADE); 
                this.qh.push(quartCadeString);
              break;
              case TypeDato.VOID:
                const quartCadeVoid = new Quartet(`strlen(${nodo.result}),`, `\"%d\", ${nodo.opRight?.result}`, `${nodo.result}`, TypeOperationQuartet.CONCATCADEENTERO); 
                this.qh.push(quartCadeVoid);
              break;
              default:
                const quartCadeObject = new Quartet(`strlen(${nodo.result}),`, `\"%d\", ${nodo.opRight?.result}`, `${nodo.result}`, TypeOperationQuartet.CONCATCADEENTERO); 
                this.qh.push(quartCadeObject);
                break;
            }
          break;
          case 'int':
            const quaOp = new Quartet(
              `${nodo.opLeft?.result}`,
              `${nodo.opRight?.result}`,
              `int ${this.qh.tmpVar()}`,
              nodo.typeQuartetOperation()
            );
            this.qh.push(quaOp);
            nodo.result = this.qh.tmpVar();
            this.qh.aumentarTmp();
          break;
          case 'float':
            const quaOpFl = new Quartet(
              `${nodo.opLeft?.result}`,
              `${nodo.opRight?.result}`,
              `float ${this.qh.tmpVar()}`,
              nodo.typeQuartetOperation()
            );
            this.qh.push(quaOpFl);
            nodo.result = this.qh.tmpVar();
            this.qh.aumentarTmp();
          break;
        }
      }else{
        const quaOp = new Quartet(
          `${nodo.opLeft?.result}`,
          `${nodo.opRight?.result}`,
          `int ${this.qh.tmpVar()}`,
          nodo.typeQuartetOperation()
        );
        this.qh.push(quaOp);
        nodo.result = this.qh.tmpVar();
        this.qh.aumentarTmp();
      }
    }else{
      //cuartetas para < , > == etc operaciones relacionales
      if (nodo.isRelacionales()) {
        //se declata la etiqueta
        const quartEt = new Quartet('','',`${this.qh.tmpEt()}`, TypeOperationQuartet.DECLEET);
        this.qh.push(quartEt);
        nodo.result = this.qh.tmpEt();
        this.qh.aumentarTmpLabel();
        //realizar las operaciones
        nodo.opLeft?.genericQuatern(this);
        nodo.opRight?.genericQuatern(this);
        //compracion relacionales (quarteta goto verdadero)
        const quartRela = new Quartet(`${nodo.opLeft?.result}`,`${nodo.opRight?.result}`,'', nodo.typeQuartetOperation());
        this.qh.push(quartRela);
        nodo.push(quartRela);
        //quarteta con goto falso
        const quartgoFalse = new Quartet('','','', TypeOperationQuartet.GOTOFLASE);
        this.qh.push(quartgoFalse);
        nodo.push(quartgoFalse);
      }else{
        //asignar etiquetas verdaderas y falsas con operaciones logicas
        if(!nodo.opLeft?.isRelacionales()){
          const quartEt = new Quartet('','',`${this.qh.tmpEt()}`, TypeOperationQuartet.DECLEET);
          this.qh.push(quartEt);
          nodo.opLeft?.genericQuatern(this);
          if (nodo.opLeft) {
            const quartRela = new Quartet(`${nodo.opLeft?.result}`,'1','', TypeOperationQuartet.EQUALS);
            this.qh.push(quartRela);
            nodo.opLeft.push(quartRela);
            //quarteta con goto falso
            const quartgoFalse = new Quartet('','','', TypeOperationQuartet.GOTOFLASE);
            this.qh.push(quartgoFalse);
            nodo.opLeft.push(quartgoFalse);
            nodo.opLeft.result = this.qh.tmpEt();
            this.qh.aumentarTmpLabel();
          }
        }else{
          nodo.opLeft.genericQuatern(this);
        }
        if(!nodo.opRight?.isRelacionales()){
          const quartEt = new Quartet('','',`${this.qh.tmpEt()}`, TypeOperationQuartet.DECLEET);
          this.qh.push(quartEt);
          nodo.opRight?.genericQuatern(this);
          if (nodo.opRight) {
            const quartRela = new Quartet(`${nodo.opRight?.result}`,'1','', TypeOperationQuartet.EQUALS);
            this.qh.push(quartRela);
            nodo.opRight.push(quartRela);
            //quarteta con goto falso
            const quartgoFalse = new Quartet('','','', TypeOperationQuartet.GOTOFLASE);
            this.qh.push(quartgoFalse);
            nodo.opRight.push(quartgoFalse);
            nodo.opRight.result = this.qh.tmpEt();
            this.qh.aumentarTmpLabel();
          }
        }else{
          nodo.opRight.genericQuatern(this);
        }
        if (nodo.opLeft && nodo.opRight) {
          nodo.opLeft.quartets.forEach((qt)=>{
            nodo.push(qt);
          })
          nodo.opRight.quartets.forEach((qt)=>{
            nodo.push(qt);
          })
        }
        if(nodo.typeOp === TypeOperation.AND){
          nodo.quartets[0].result=`${nodo.opRight?.result}`
        }else{//es orr
          nodo.quartets[1].result=`${nodo.opRight?.result}`
        }
        nodo.result = nodo.opLeft?.result||''
      }
    }

  }

  visitRead(read: Read): void {
    //creando variable temporal para asignar lo leido, y leer segun el caso
    switch (read.typeDato) {
      case TypeDato.BOOLEAN:
        const quartDecleBol = new Quartet('','',`int ${this.qh.tmpVar()}`,TypeOperationQuartet.DECLARTION);
        this.qh.push(quartDecleBol);
        const quartRead = new Quartet(`"%d"`,'',`&${this.qh.tmpVar()}`,TypeOperationQuartet.READ);
        this.qh.push(quartRead)
        read.result = this.qh.tmpVar();
        this.qh.aumentarTmp();
        break;
      case TypeDato.CHAR:
        const quartDecleChar = new Quartet('','',`char ${this.qh.tmpVar()}[25]`,TypeOperationQuartet.DECLARTION);
        this.qh.push(quartDecleChar);
        const quartReadChar = new Quartet(`"%s"`,'',`${this.qh.tmpVar()}`,TypeOperationQuartet.READ);
        this.qh.push(quartReadChar)
        read.result = this.qh.tmpVar();
        this.qh.aumentarTmp();
        break;
      case TypeDato.FLOAT:
        const quartDecleFloat = new Quartet('','',`float ${this.qh.tmpVar()}`,TypeOperationQuartet.DECLARTION);
        this.qh.push(quartDecleFloat);
        const quartReadFloat = new Quartet(`"%f"`,'',`&${this.qh.tmpVar()}`,TypeOperationQuartet.READ);
        this.qh.push(quartReadFloat)
        read.result = this.qh.tmpVar();
        this.qh.aumentarTmp();
        break;
      case TypeDato.INT:
        const quartDecleInt = new Quartet('','',`int ${this.qh.tmpVar()}`,TypeOperationQuartet.DECLARTION);
        this.qh.push(quartDecleInt);
        const quartReadInt = new Quartet(`"%d"`,'',`&${this.qh.tmpVar()}`,TypeOperationQuartet.READ);
        this.qh.push(quartReadInt)
        read.result = this.qh.tmpVar();
        this.qh.aumentarTmp();
        break;
      case TypeDato.STRING:
        const quartDecleStrin = new Quartet('','',`char ${this.qh.tmpVar()}[25]`,TypeOperationQuartet.DECLARTION);
        this.qh.push(quartDecleStrin);
        const quartReadString = new Quartet(`"%s"`,'',`${this.qh.tmpVar()}`,TypeOperationQuartet.READ);
        this.qh.push(quartReadString)
        read.result = this.qh.tmpVar();
        this.qh.aumentarTmp();
        break;
      default:
        const quartDecledef = new Quartet('','',`int ${this.qh.tmpVar()}`,TypeOperationQuartet.DECLARTION);
        this.qh.push(quartDecledef);
        const quartReaDef = new Quartet(`"%d"`,'',`&${this.qh.tmpVar()}`,TypeOperationQuartet.READ);
        this.qh.push(quartReaDef)
        read.result = this.qh.tmpVar();
        this.qh.aumentarTmp();
        break;
    }

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
    if(ifI.labelInstruc !== ''){
      const quartInst = new Quartet('','',`${ifI.labelInstruc}`, TypeOperationQuartet.DECLEET);
      this.qh.push(quartInst);
    }
    if(ifI.condition.rootOp.dato !== null){
      // crearle un if goto
      const quartEt = new Quartet('','',`${this.qh.tmpEt()}`, TypeOperationQuartet.DECLEET);
      this.qh.push(quartEt);
      ifI.condition.generecQuartet(this);
      const quartRela = new Quartet(`${ifI.condition.restult}`,'1','', TypeOperationQuartet.EQUALS);
      this.qh.push(quartRela);
      ifI.condition.quartets.push(quartRela);
      //quarteta con goto falso
      const quartgoFalse = new Quartet('','','', TypeOperationQuartet.GOTOFLASE);
      this.qh.push(quartgoFalse);
      ifI.condition.quartets.push(quartgoFalse);
      ifI.condition.restult = this.qh.tmpEt();
      this.qh.aumentarTmpLabel();
    }else{
      ifI.condition.generecQuartet(this);
    }
    //creanod las etiquetas para la logica del if
    ifI.labelInstruc= this.qh.tmpEt();
    this.qh.aumentarTmpLabel();
    const labelSalida = this.qh.tmpEt();
    this.qh.aumentarTmpLabel();    
    let lableFalse = '';
    //agregando etiquetas para casos verdaderos y casos falsos
    ifI.condition.quartets.forEach((qt)=>{
      if(qt.typeOp !== TypeOperationQuartet.GOTOFLASE && qt.result === ''){
        qt.result = `${ifI.labelInstruc}`
      }
    });
    if (ifI.ElseInstruction) {
      lableFalse =this.qh.tmpEt();
      this.qh.aumentarTmpLabel();
      ifI.condition.quartets.forEach((qt)=>{
        if(qt.typeOp === TypeOperationQuartet.GOTOFLASE && qt.result === ''){
          qt.result = `${lableFalse}`
        }
      });
    }
    if (ifI.ElseIfInstruction) {
      lableFalse =this.qh.tmpEt();
      this.qh.aumentarTmpLabel();
      ifI.condition.quartets.forEach((qt)=>{
        if(qt.typeOp === TypeOperationQuartet.GOTOFLASE && qt.result === ''){
          qt.result = `${lableFalse}`
        }
      });
    }
    if(!ifI.ElseInstruction && !ifI.ElseIfInstruction){
      ifI.condition.quartets.forEach((qt)=>{
        if(qt.typeOp === TypeOperationQuartet.GOTOFLASE && qt.result === ''){
          qt.result = `${labelSalida}`
        }
      });
    }
    //logica del if
    const quartInst = new Quartet('','',`${ifI.labelInstruc}`, TypeOperationQuartet.DECLEET);
    this.qh.push(quartInst);
    ifI.instructions.forEach((instr)=>{
      instr.genericQuartet(this);
    });
    const quartEscape = new Quartet('','',`${labelSalida}`, TypeOperationQuartet.GOTOFLASE);
    this.qh.push(quartEscape);
    if(ifI.ElseInstruction){
      const quartInstElse = new Quartet('','',`${lableFalse}`, TypeOperationQuartet.DECLEET);
      this.qh.push(quartInstElse);
      ifI.ElseInstruction.genericQuartet(this);
      const quartEscape = new Quartet('','',`${labelSalida}`, TypeOperationQuartet.GOTOFLASE);
      this.qh.push(quartEscape);
    }
    if(ifI.ElseIfInstruction){
      ifI.ElseIfInstruction.labelInstruc = lableFalse;
      ifI.ElseIfInstruction.genericQuartet(this);
      const quartEscape = new Quartet('','',`${labelSalida}`, TypeOperationQuartet.GOTOFLASE);
      this.qh.push(quartEscape);
    }
    const quartSalida = new Quartet('','',`${labelSalida}`, TypeOperationQuartet.DECLEET);
    this.qh.push(quartSalida);

  }

  visitElse(elseI: ElseInstruction): void {
    elseI.instructions.forEach((instr)=>{
      instr.genericQuartet(this);
    })
  }

  visitWhile(whileI: WhileInstruction): void {
    if(whileI.condition.rootOp.dato !== null){
      // crearle un if goto
      const quartEt = new Quartet('','',`${this.qh.tmpEt()}`, TypeOperationQuartet.DECLEET);
      this.qh.push(quartEt);
      whileI.condition.generecQuartet(this);
      const quartRela = new Quartet(`${whileI.condition.restult}`,'1','', TypeOperationQuartet.EQUALS);
      this.qh.push(quartRela);
      whileI.condition.quartets.push(quartRela);
      //quarteta con goto falso
      const quartgoFalse = new Quartet('','','', TypeOperationQuartet.GOTOFLASE);
      this.qh.push(quartgoFalse);
      whileI.condition.quartets.push(quartgoFalse);
      whileI.condition.restult = this.qh.tmpEt();
      this.qh.aumentarTmpLabel();
    }else{
      whileI.condition.generecQuartet(this);
    }
    //creando labels necesarios para la logica del while
    const labelCondition = whileI.condition.restult;
    const labelInstru = this.qh.tmpEt();
    this.qh.aumentarTmpLabel();
    const labelEsc = this.qh.tmpEt();
    this.qh.aumentarTmpLabel();
    //logica para colocar sus etiquetas falsas y verdaders en los goto
    whileI.condition.quartets.forEach((qt)=>{
      if(qt.typeOp !== TypeOperationQuartet.GOTOFLASE && qt.result === ''){
        qt.result = `${labelInstru}`
      }
      if(qt.typeOp === TypeOperationQuartet.GOTOFLASE && qt.result === ''){
        qt.result = `${labelEsc}`
      }
    });
    //logica del whiel
    const quartInst = new Quartet('','',`${labelInstru}`, TypeOperationQuartet.DECLEET);
    this.qh.push(quartInst);
    whileI.instructions.forEach((instr)=>{
      instr.genericQuartet(this);
    });
    //retorno
    const quartRetorno = new Quartet('','',`${labelCondition}`, TypeOperationQuartet.GOTOFLASE);
    this.qh.push(quartRetorno);
    //salida
    const quartEsc = new Quartet('','',`${labelEsc}`, TypeOperationQuartet.DECLEET);
    this.qh.push(quartEsc);
  }

  visitDoWhile(doWhileI: DoWhileInstruction): void {
    //etiqueta para las instrucciones
    const labelInstru = this.qh.tmpEt();
    this.qh.aumentarTmpLabel();
    //logica del whiel
    const quartInst = new Quartet('','',`${labelInstru}`, TypeOperationQuartet.DECLEET);
    this.qh.push(quartInst);
    doWhileI.instructions.forEach((instr)=>{
      instr.genericQuartet(this);
    });
    //cuartetas para la condicion
    if(doWhileI.condition.rootOp.dato !== null){
      // crearle un if goto
      const quartEt = new Quartet('','',`${this.qh.tmpEt()}`, TypeOperationQuartet.DECLEET);
      this.qh.push(quartEt);
      doWhileI.condition.generecQuartet(this);
      const quartRela = new Quartet(`${doWhileI.condition.restult}`,'1','', TypeOperationQuartet.EQUALS);
      this.qh.push(quartRela);
      doWhileI.condition.quartets.push(quartRela);
      //quarteta con goto falso
      const quartgoFalse = new Quartet('','','', TypeOperationQuartet.GOTOFLASE);
      this.qh.push(quartgoFalse);
      doWhileI.condition.quartets.push(quartgoFalse);
      doWhileI.condition.restult = this.qh.tmpEt();
      this.qh.aumentarTmpLabel();
    }else{
      doWhileI.condition.generecQuartet(this);
    }
    const labelEsc = this.qh.tmpEt();
    this.qh.aumentarTmpLabel();
    //logica para colocar sus etiquetas falsas y verdaders en los goto
    doWhileI.condition.quartets.forEach((qt)=>{
      if(qt.typeOp !== TypeOperationQuartet.GOTOFLASE && qt.result === ''){
        qt.result = `${labelInstru}`
      }
      if(qt.typeOp === TypeOperationQuartet.GOTOFLASE && qt.result === ''){
        qt.result = `${labelEsc}`
      }
    });
    const quartEsc = new Quartet('','',`${labelEsc}`, TypeOperationQuartet.DECLEET);
    this.qh.push(quartEsc);
  }

  visitfor(fo: ForInstrction): void {
    //cuartetas de la instruccion inicial
    fo.instrcInicial.genericQuartet(this);
    //realizando condicion, agregando if, goto si no tuviese
    if(fo.condition.rootOp.dato !== null){
      // crearle un if goto
      const quartEt = new Quartet('','',`${this.qh.tmpEt()}`, TypeOperationQuartet.DECLEET);
      this.qh.push(quartEt);
      fo.condition.generecQuartet(this);
      const quartRela = new Quartet(`${fo.condition.restult}`,'1','', TypeOperationQuartet.EQUALS);
      this.qh.push(quartRela);
      fo.condition.quartets.push(quartRela);
      //quarteta con goto falso
      const quartgoFalse = new Quartet('','','', TypeOperationQuartet.GOTOFLASE);
      this.qh.push(quartgoFalse);
      fo.condition.quartets.push(quartgoFalse);
      fo.condition.restult = this.qh.tmpEt();
      this.qh.aumentarTmpLabel();
    }else{
      fo.condition.generecQuartet(this);
    }
    //creando labels necesarios para la logica del while
    const labelCondition = fo.condition.restult;
    const labelInstru = this.qh.tmpEt();
    this.qh.aumentarTmpLabel();
    const labelEsc = this.qh.tmpEt();
    this.qh.aumentarTmpLabel();
    //logica para colocar sus etiquetas falsas y verdaders en los goto
    fo.condition.quartets.forEach((qt)=>{
      if(qt.typeOp !== TypeOperationQuartet.GOTOFLASE && qt.result === ''){
        qt.result = `${labelInstru}`
      }
      if(qt.typeOp === TypeOperationQuartet.GOTOFLASE && qt.result === ''){
        qt.result = `${labelEsc}`
      }
    });
    //logica del for
    const quartInst = new Quartet('','',`${labelInstru}`, TypeOperationQuartet.DECLEET);
    this.qh.push(quartInst);
    fo.instructions.forEach((instr)=>{
      instr.genericQuartet(this);
    });
    //retorno
    const quartRetorno = new Quartet('','',`${labelCondition}`, TypeOperationQuartet.GOTOFLASE);
    this.qh.push(quartRetorno);
    //salida
    const quartEsc = new Quartet('','',`${labelEsc}`, TypeOperationQuartet.DECLEET);
    this.qh.push(quartEsc);
  }

  visitDeclareArr(dec: DeclarationArr): void {
    if(dec.indices){
      //ejecutar las operaciones de los indices
      dec.opers.forEach((op)=>{
        op.generecQuartet(this);
      });
      //asignar la pos de ptrh disponible a la variable arreglo
      const quartpos = new Quartet(
        this.POINTER,
        `${dec.pos}`,
        `int ${this.qh.tmpVar()}`,
        TypeOperationQuartet.SUMA
      );
      this.qh.push(quartpos);
      const tmp = this.qh.tmpVar();
      this.qh.aumentarTmp();
      const quar = new Quartet(
        `&${this.POINTERH}`,
        '',
        `stack[${tmp}]`,
        TypeOperationQuartet.ASIGNATION
      );
      this.qh.push(quar);
      //segun el caso de dimension 1 o 2 mover el ptrh
      
      if (dec.dimension === 1) {
        const tamani = dec.opers[0].restult
        const cuarteHAumen = new Quartet(
          this.POINTERH,
          `${tamani}`,
          this.POINTERH,
          TypeOperationQuartet.SUMA
        );
        this.qh.push(cuarteHAumen);
      }else{
        //tn = result1 * result 2
        const quartp = new Quartet(
          `${dec.opers[0].restult}`,
          `${dec.opers[1].restult}`,
          `int ${this.qh.tmpVar()}`,
          TypeOperationQuartet.MULTIPLICACION
        );
        this.qh.push(quartp);
        const cuarteHAumen = new Quartet(
          this.POINTERH,
          `${this.qh.tmpVar()}`,
          this.POINTERH,
          TypeOperationQuartet.SUMA
        );
        this.qh.push(cuarteHAumen);
        this.qh.aumentarTmp();

      }
    }

  }

  visitAsigComplArr(asi: AsigCompletaArr): void {
    if(asi.global){
      //acciones globales
      const quartHep = new Quartet('t0',`${asi.ArregloRealtivo.pos}`,`int ${this.qh.tmpVar()}`, TypeOperationQuartet.SUMA); 
      this.qh.push(quartHep);
      const quartH = new Quartet(`&${this.POINTERH}`,``,`heap[${this.qh.tmpVar()}]`, TypeOperationQuartet.ASIGNATION); 
      this.qh.push(quartH);
      this.qh.aumentarTmp();
    }else{
      //acciones locales
      const quartpos = new Quartet(
        this.POINTER,
        `${asi.ArregloRealtivo.pos}`,
        `int ${this.qh.tmpVar()}`,
        TypeOperationQuartet.SUMA
      );
      this.qh.push(quartpos);
      const tmp = this.qh.tmpVar();
      this.qh.aumentarTmp();
      const quar = new Quartet(
        `&${this.POINTERH}`,
        '',
        `stack[${tmp}]`,
        TypeOperationQuartet.ASIGNATION
      );
      this.qh.push(quar);
    }
    asi.opers.forEach((op)=>{
      op.generecQuartet(this);
    });
    if (asi.ArregloRealtivo.dimension === 1) {
      const tamani = asi.opers[0].restult
      const cuarteHAumen = new Quartet(
        this.POINTERH,
        `${tamani}`,
        this.POINTERH,
        TypeOperationQuartet.SUMA
      );
      this.qh.push(cuarteHAumen);
    }else{
      //tn = result1 * result 2
      const quartp = new Quartet(
        `${asi.opers[0].restult}`,
        `${asi.opers[1].restult}`,
        `int ${this.qh.tmpVar()}`,
        TypeOperationQuartet.MULTIPLICACION
      );
      this.qh.push(quartp);
      const cuarteHAumen = new Quartet(
        this.POINTERH,
        `${this.qh.tmpVar()}`,
        this.POINTERH,
        TypeOperationQuartet.SUMA
      );
      this.qh.push(cuarteHAumen);
      this.qh.aumentarTmp();

    }


  }
  
  visitAsigArr(asi: AsignacionArr): void {
    asi.op.generecQuartet(this);
    asi.opers.forEach((operacion) => {
      operacion.generecQuartet(this);
    });
    let direHeap = ''; 
    if(asi.global){
      const quartPos = new Quartet('t0',`${asi.ArregloRealtivo.pos}`,`int ${this.qh.tmpVar()}`,TypeOperationQuartet.SUMA);
      this.qh.push(quartPos);
      const inde = this.qh.tmpVar();
      this.qh.aumentarTmp();
      const quartref = new Quartet(`*((int*)heap[${inde}])`,'',`int ${this.qh.tmpVar()}`,TypeOperationQuartet.ASIGNATION);
      this.qh.push(quartref);
      direHeap = this.qh.tmpVar();
      this.qh.aumentarTmp();
    }else{
      const quartPos = new Quartet(`${this.POINTER}`,`${asi.ArregloRealtivo.pos}`,`int ${this.qh.tmpVar()}`,TypeOperationQuartet.SUMA);
      this.qh.push(quartPos);
      const inde = this.qh.tmpVar();
      this.qh.aumentarTmp();
      const quartref = new Quartet(`*((int*)stack[${inde}])`,'',`int ${this.qh.tmpVar()}`,TypeOperationQuartet.ASIGNATION);
      this.qh.push(quartref);
      direHeap = this.qh.tmpVar();
      this.qh.aumentarTmp();
    }
    let pos = '';
    if(asi.ArregloRealtivo.dimension === 1){
      pos = asi.opers[0].restult
    }else{
      //tn = i1*n1+i2
      const quartp = new Quartet(
        `${asi.opers[0].restult}`,
        `${asi.ArregloRealtivo.indicesMax[1]}`,
        `int ${this.qh.tmpVar()}`,
        TypeOperationQuartet.MULTIPLICACION
      );
      this.qh.push(quartp);
      pos = this.qh.tmpVar();
      this.qh.aumentarTmp();
      const quartp2 = new Quartet(
        `${pos}`,
        `${asi.opers[1].restult}`,
        `int ${this.qh.tmpVar()}`,
        TypeOperationQuartet.SUMA
      );
      this.qh.push(quartp2);
      pos = this.qh.tmpVar();
      this.qh.aumentarTmp();
    }
    const quartPos = new Quartet(`${direHeap}`,`${pos}`,`int ${this.qh.tmpVar()}`,TypeOperationQuartet.SUMA);
    this.qh.push(quartPos);
    const type = asi.typeAsiganar();
    if(type === 'char'){
      const quarAsig = new Quartet(
        `${asi.op.restult}`,
        '',
        `heap[${this.qh.tmpVar()}]`,
        TypeOperationQuartet.ASIGNATION
      );
      this.qh.push(quarAsig);
    }else{
      const quarAsig = new Quartet(
        `&${asi.op.restult}`,
        '',
        `heap[${this.qh.tmpVar()}]`,
        TypeOperationQuartet.ASIGNATION
      );
      this.qh.push(quarAsig);
    }
    this.qh.aumentarTmp();
  }

  visitNodoArr(arr: NodoArreglo): void | Dato {
    arr.ops.forEach((op) => {
      op.generecQuartet(this);
    })
    let direHeap = '';
    if(arr.global){
      const quartPos = new Quartet('t0',`${arr.arregloRelativo.pos}`,`int ${this.qh.tmpVar()}`,TypeOperationQuartet.SUMA);
      this.qh.push(quartPos);
      const inde = this.qh.tmpVar();
      this.qh.aumentarTmp();
      const quartref = new Quartet(`*((int*)heap[${inde}])`,'',`int ${this.qh.tmpVar()}`,TypeOperationQuartet.ASIGNATION);
      this.qh.push(quartref);
      direHeap = this.qh.tmpVar();
      this.qh.aumentarTmp();
    }else{
      const quartPos = new Quartet(`${this.POINTER}`,`${arr.arregloRelativo.pos}`,`int ${this.qh.tmpVar()}`,TypeOperationQuartet.SUMA);
      this.qh.push(quartPos);
      const inde = this.qh.tmpVar();
      this.qh.aumentarTmp();
      const quartref = new Quartet(`*((int*)stack[${inde}])`,'',`int ${this.qh.tmpVar()}`,TypeOperationQuartet.ASIGNATION);
      this.qh.push(quartref);
      direHeap = this.qh.tmpVar();
      this.qh.aumentarTmp();
    }
    let pos = '';
    if(arr.arregloRelativo.dimension === 1){
      pos = arr.ops[0].restult
    }else{
      //tn = i1*n1+i2
      const quartp = new Quartet(
        `${arr.ops[0].restult}`,
        `${arr.arregloRelativo.indicesMax[1]}`,
        `int ${this.qh.tmpVar()}`,
        TypeOperationQuartet.MULTIPLICACION
      );
      this.qh.push(quartp);
      pos = this.qh.tmpVar();
      this.qh.aumentarTmp();
      const quartp2 = new Quartet(
        `${pos}`,
        `${arr.ops[1].restult}`,
        `int ${this.qh.tmpVar()}`,
        TypeOperationQuartet.SUMA
      );
      this.qh.push(quartp2);
      pos = this.qh.tmpVar();
      this.qh.aumentarTmp();
    }
    const quartPos = new Quartet(`${direHeap}`,`${pos}`,`int ${this.qh.tmpVar()}`,TypeOperationQuartet.SUMA);
    this.qh.push(quartPos);
    const posFinal=this.qh.tmpVar();
    this.qh.aumentarTmp();
    //obtener valor del heap dependiendo del tipo
    const typ = arr.typeCrearFun();
    if (typ === 'char') {
      const quartGetCh = new Quartet(
        `heap[${posFinal}]`,'',`${typ}* ${this.qh.tmpVar()}`,TypeOperationQuartet.ASIGNATION
      );
      this.qh.push(quartGetCh);
      arr.result = this.qh.tmpVar();
      this.qh.aumentarTmp();
    }else{
      const quartGet = new Quartet(
        `*((${typ}*)heap[${posFinal}])`,'',`${typ} ${this.qh.tmpVar()}`,TypeOperationQuartet.ASIGNATION
      );
      this.qh.push(quartGet);
      arr.result = this.qh.tmpVar();
      this.qh.aumentarTmp();
    }

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
