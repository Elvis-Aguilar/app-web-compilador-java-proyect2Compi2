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
import { Dato } from '../table-simbol/dato';
import { SymbolTable } from '../table-simbol/symbol-table';
import { Visitor } from './visitor';

export class VisRefSymbolTable extends Visitor {


  visitMain(main: FunMain): void {
    main.instructions.forEach((instr)=>{
      instr.referenciarSymbolTable(this, main.symbolTable);
    })
  }

  visitLlamdadfun(llama: LlamadaFun): void {
    //no hay nada que implementar
  }
  
  visitLlamdadGen(llamaG: LlamadaFunGen): void {
    //no hay nada que implementar
  }
 
  visitClass(clas: Clase): void {
    clas.funciones.forEach((fun) => {
      fun.referenciarSymbolTable(this, clas.symbolTable);
    });
    clas.constructors.forEach((constr) => {
      constr.referenciarSymbolTable(this, clas.symbolTable);
    });
    clas.instructions.forEach((instr) => {
      instr.referenciarSymbolTable(this, clas.symbolTable);
    });
  }

  visitFuncion(fun: Funcion) {
    fun.instructions.forEach((instr) => {
      instr.referenciarSymbolTable(this, fun.symbolTable);
    });
  }

  visitConstruct(fun: Constructor): void {
    fun.instructions.forEach((instr) => {
      instr.referenciarSymbolTable(this, fun.symbolTable);
    });
  }

  visitOp(op: Operation): void | Dato {
    //se referencia desde otra instruccion como tal
  }

  visitNodoOP(nodo: NodoOperation): void | Dato {
    //se referencia desde otra instruccion como tal
  }

  visitDeclaration(dec: Declaration): void {
    dec.op?.referenciarSymbolTable(this, dec.symbolTable);
  }

  visitIf(ifI: IfInstruction): void {
    ifI.instructions.forEach((instr) => {
      instr.referenciarSymbolTable(this, ifI.symbolTable);
    });
    ifI.ElseIfInstruction?.referenciarSymbolTable(this, ifI.symbolTable);
    ifI.ElseInstruction?.referenciarSymbolTable(this, ifI.symbolTable);
    ifI.condition.referenciarSymbolTable(this, ifI.symbolTable);
  }

  visitElse(elseI: ElseInstruction): void {
    elseI.instructions.forEach((instr) => {
      instr.referenciarSymbolTable(this, elseI.symbolTable);
    });
  }

  visitWhile(whileI: WhileInstruction): void {
    whileI.condition.referenciarSymbolTable(this, whileI.symbolTable);
    whileI.instructions.forEach((instr) => {
      instr.referenciarSymbolTable(this, whileI.symbolTable);
    });
  }

  visitDoWhile(doWhileI: DoWhileInstruction): void {
    doWhileI.condition.referenciarSymbolTable(this, doWhileI.symbolTable);
    doWhileI.instructions.forEach((instr) => {
      instr.referenciarSymbolTable(this, doWhileI.symbolTable);
    });
  }

  visitSwitch(swit: SwitchInstruction): void {
    swit.casos.forEach((cas) => {
      cas.referenciarSymbolTable(this, swit.symbolTable);
    });
  }

  visitCaseSwitch(caseSwitchI: CaseSwitchInstruction): void {
    caseSwitchI.instructions.forEach((instr) => {
      instr.referenciarSymbolTable(this, caseSwitchI.symbolTable);
    });
  }

  visitfor(fo: ForInstrction): void {
    fo.instructions.forEach((instr) => {
      instr.referenciarSymbolTable(this, fo.symbolTable);
    });
    fo.condition.referenciarSymbolTable(this, fo.symbolTable);
    fo.instrcInicial.referenciarSymbolTable(this, fo.symbolTable);
  }

  visitAsigArr(asi: AsignacionArr): void {
    asi.opers.forEach((op) => {
      op.referenciarSymbolTable(this, asi.symbolTable);
    });
    asi.op.referenciarSymbolTable(this, asi.symbolTable);
  }

  visitAsig(asi: Asignacion): void {
    asi.op.referenciarSymbolTable(this, asi.symbolTable);
  }

  visitDeclareArr(dec: DeclarationArr): void {
    dec.opers.forEach((op) => {
      op.referenciarSymbolTable(this, dec.symbolTable);
    });
  }

  visitFunMath(funMath: FunMath): void {
    //logica realizada en el mismo no necesita al visitor
  }

  visitSout(sout: Sout): void {
    sout.op.referenciarSymbolTable(this, sout.symbolTable);
  }

  visitDeclareObject(decOb: DeclarationObject): void {
    decOb.ops.forEach((op) =>{
      op.referenciarSymbolTable(this, decOb.symbolTable)
    })
  }

  visitAsigObj(asigOb: asignacionObjec): void {
    asigOb.opers.forEach((asg) =>{
      asg.referenciarSymbolTable(this, asigOb.symbolTable)
    })
  }

  
}
