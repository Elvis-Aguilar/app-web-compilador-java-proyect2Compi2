import { Token } from "src/app/parser/token";
import { NodoOperation } from "../operations/nodo-operation";
import { TypeFunMath } from "./type-fun-math";

export class FunMath extends NodoOperation{

    typeFunMath:TypeFunMath;

    constructor(token:Token, typeFunMath:TypeFunMath,  opLeft?: NodoOperation, opRight?: NodoOperation){
        super(undefined, opLeft, opRight, undefined, token);
        this.typeFunMath = typeFunMath;
    }
}