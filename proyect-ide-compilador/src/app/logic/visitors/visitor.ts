import { Declaration } from "../instructions/declare-asig/declaration";
import { NodoOperation } from "../instructions/operations/nodo-operation";
import { Operation } from "../instructions/operations/operation";
import { Dato } from "../table-simbol/dato";

export abstract class Visitor {

    abstract visitOp(op: Operation): Dato | void;
    abstract visitNodoOP(nodo: NodoOperation): Dato | void;
    abstract visitDeclaration(dec: Declaration): void;

}