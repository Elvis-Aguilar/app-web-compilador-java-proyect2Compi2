import { ErrorSingleton } from "../../errors/error-singleton";
import { Dato } from "../../table-simbol/dato";
import { TypeDato } from "../../table-simbol/type-dato";
import { TypeOperation } from "./type-operation";

export class OperationCasteo{

    datoLeft!: Dato;
    datoRight!: Dato;
    typeOp!: TypeOperation;

    getDato(dato1:Dato, dato2:Dato, typeOp:TypeOperation): Dato {
        // TODO: implemetar logica
        this.datoLeft = dato1;
        this.datoRight = dato2;
        this.typeOp = typeOp;
        const resutl = new Dato(TypeDato.INTEGER)
        //error declarardo con singleton
       // ErrorSingleton.getInstance().push(new Error(this.datoLeft.token.line, );

        return resutl;
    }

}