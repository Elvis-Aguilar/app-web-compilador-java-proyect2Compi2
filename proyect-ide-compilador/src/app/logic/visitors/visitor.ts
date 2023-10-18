import { CaseSwitchInstruction } from "../instructions/bifurcaciones/case-switch-instruction";
import { DoWhileInstruction } from "../instructions/bifurcaciones/do-while-instruction";
import { ElseInstruction } from "../instructions/bifurcaciones/Else-Instruction";
import { IfInstruction } from "../instructions/bifurcaciones/If-instruction";
import { SwitchInstruction } from "../instructions/bifurcaciones/switch-instruction";
import { WhileInstruction } from "../instructions/bifurcaciones/while-Instruction";
import { Declaration } from "../instructions/declare-asig/declaration";
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

}