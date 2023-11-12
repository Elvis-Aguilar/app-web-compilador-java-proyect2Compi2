import { Clase } from "../class/clase";
import { Constructor } from "../class/constructor";
import { FunMain } from "../class/fun-main";
import { CaseSwitchInstruction } from "../instructions/bifurcaciones/case-switch-instruction";
import { DoWhileInstruction } from "../instructions/bifurcaciones/do-while-instruction";
import { ElseInstruction } from "../instructions/bifurcaciones/Else-Instruction";
import { ForInstrction } from "../instructions/bifurcaciones/for-instruction";
import { IfInstruction } from "../instructions/bifurcaciones/If-instruction";
import { SwitchInstruction } from "../instructions/bifurcaciones/switch-instruction";
import { WhileInstruction } from "../instructions/bifurcaciones/while-Instruction";
import { AsignacionArr } from "../instructions/declare-asig/asiganacion-arr";
import { Asignacion } from "../instructions/declare-asig/asignacion";
import { asignacionObjec } from "../instructions/declare-asig/asignacion-objc";
import { Declaration } from "../instructions/declare-asig/declaration";
import { DeclarationArr } from "../instructions/declare-asig/declaration-arr";
import { DeclarationObject } from "../instructions/declare-asig/declaration-object";
import { FunMath } from "../instructions/fun-nativas/fun-math";
import { Read } from "../instructions/fun-nativas/read";
import { Sout } from "../instructions/fun-nativas/sout";
import { Funcion } from "../instructions/funcion/funcion";
import { LlamadaFun } from "../instructions/funcion/llamada-fun";
import { LlamadaFunGen } from "../instructions/funcion/llamada-fun-gen";
import { NodoOperation } from "../instructions/operations/nodo-operation";
import { Operation } from "../instructions/operations/operation";
import { Dato } from "../table-simbol/dato";

export abstract class Visitor {

    abstract visitOp(op: Operation): Dato | void;
    abstract visitNodoOP(nodo: NodoOperation): Dato | void;
    abstract visitDeclaration(dec: Declaration): void;
    abstract visitIf(ifI: IfInstruction) : void;
    abstract visitElse(elseI: ElseInstruction): void;
    abstract visitWhile(whileI: WhileInstruction): void;
    abstract visitDoWhile(doWhileI: DoWhileInstruction): void;
    abstract visitSwitch(swit: SwitchInstruction):void;
    abstract visitCaseSwitch(caseSwitchI: CaseSwitchInstruction): void;
    abstract visitClass(clas:Clase):void;
    abstract visitFuncion(fun:Funcion):void;
    abstract visitConstruct(fun:Constructor):void;
    abstract visitfor(fo:ForInstrction):void;
    abstract visitAsigArr(asi:AsignacionArr):void;
    abstract visitAsig(asi:Asignacion):void;
    abstract visitDeclareArr(dec:DeclarationArr):void;
    abstract visitFunMath(funMath:FunMath):void;
    abstract visitSout(sout:Sout):void;
    abstract visitDeclareObject(decOb:DeclarationObject):void;
    abstract visitAsigObj(asigOb:asignacionObjec):void;
    abstract visitLlamdadfun(llama:LlamadaFun):void;
    abstract visitLlamdadGen(llamaG:LlamadaFunGen):void;
    abstract visitMain(main:FunMain):void;
    abstract visitRead(read:Read): Dato|void;

}