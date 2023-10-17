import { ErrorSingleton } from "../logic/errors/error-singleton";
import { Error } from "../logic/errors/errors";
import { TypeError } from "../logic/errors/type-error";
import { Declaration } from "../logic/instructions/declare-asig/declaration";
import { instruction } from "../logic/instructions/instruction";
import { NodoOperation } from "../logic/instructions/operations/nodo-operation";
import { Operation } from "../logic/instructions/operations/operation";
import { TypeOperation } from "../logic/instructions/operations/type-operation";
import { Dato } from "../logic/table-simbol/dato";
import { TypeDato } from "../logic/table-simbol/type-dato";
import { VisitorGenericQuartet } from "../logic/visitors/visitor-generic-quartet";
import { Token } from "./token";

declare var parser:  any;

export class Parser {
    private txtEntrada:String = "";

    constructor(txtEntrada:String) {
        this.txtEntrada = txtEntrada;
        parser.yy.NodoOperation = NodoOperation;
        parser.yy.Operation = Operation;
        parser.yy.TypeOperation = TypeOperation;
        parser.yy.Dato = Dato;
        parser.yy.TypeDato = TypeDato;
        parser.yy.Token = Token;
        parser.yy.Declaration = Declaration;
        parser.yy.Errores = ErrorSingleton.getInstance();
        parser.yy.ErrorSintx = Error;
        parser.yy.TypeError = TypeError;
        
    }

    /**
     * funcion para ejecutar el analisis lexico-sintactico del parser
     */
    parse(){
        try {
            //const instructions:instruction[] = parser.parse(this.txtEntrada);
            parser.parse(this.txtEntrada);
            const visGeneQuarte = new VisitorGenericQuartet();
            //instructions.forEach(inst => {
              //  inst.genericQuartet(visGeneQuarte);
            //});
            //console.log(parser.yy.Errores)
            //console.log(visGeneQuarte.qh)
        } catch (error) {
            console.error(error);
        }
    }
}
