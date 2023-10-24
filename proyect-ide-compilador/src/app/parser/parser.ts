import { Clase } from "../logic/class/clase";
import { Constructor } from "../logic/class/constructor";
import { FunMain } from "../logic/class/fun-main";
import { ErrorSingleton } from "../logic/errors/error-singleton";
import { Error } from "../logic/errors/errors";
import { TypeError } from "../logic/errors/type-error";
import { CaseSwitchInstruction } from "../logic/instructions/bifurcaciones/case-switch-instruction";
import { DoWhileInstruction } from "../logic/instructions/bifurcaciones/do-while-instruction";
import { ElseInstruction } from "../logic/instructions/bifurcaciones/Else-Instruction";
import { IfInstruction } from "../logic/instructions/bifurcaciones/If-instruction";
import { SwitchInstruction } from "../logic/instructions/bifurcaciones/switch-instruction";
import { WhileInstruction } from "../logic/instructions/bifurcaciones/while-Instruction";
import { AsignacionArr } from "../logic/instructions/declare-asig/asiganacion-arr";
import { Asignacion } from "../logic/instructions/declare-asig/asignacion";
import { Declaration } from "../logic/instructions/declare-asig/declaration";
import { DeclarationArr } from "../logic/instructions/declare-asig/declaration-arr";
import { Sout } from "../logic/instructions/fun-nativas/sout";
import { Funcion } from "../logic/instructions/funcion/funcion";
import { Instruction } from "../logic/instructions/instruction";
import { NodoOperation } from "../logic/instructions/operations/nodo-operation";
import { Operation } from "../logic/instructions/operations/operation";
import { TypeOperation } from "../logic/instructions/operations/type-operation";
import { Dato } from "../logic/table-simbol/dato";
import { TypeDato } from "../logic/table-simbol/type-dato";
import { Variable } from "../logic/table-simbol/variable";
import { Visibilidad } from "../logic/table-simbol/visibilidad";
import { VisitorGenericQuartet } from "../logic/visitors/visitor-generic-quartet";
import { AuxFun } from "./aux-fun";
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
        parser.yy.Visibilidad = Visibilidad;
        parser.yy.AuxFun = new AuxFun();
        parser.yy.Clase = Clase;
        parser.yy.Funcion = Funcion;
        parser.yy.Variable = Variable;
        parser.yy.Asignacion = Asignacion; 
        parser.yy.Sout = Sout;
        parser.yy.If = IfInstruction;
        parser.yy.Else = ElseInstruction;
        parser.yy.Switch = SwitchInstruction;
        parser.yy.Case = CaseSwitchInstruction;
        parser.yy.DoWhile = DoWhileInstruction;
        parser.yy.While = WhileInstruction;
        parser.yy.Main = FunMain;
        parser.yy.Constructor = Constructor;
        parser.yy.DeclarationArr = DeclarationArr;
        parser.yy.AsignacionArr = AsignacionArr;
    }

    /**
     * funcion para ejecutar el analisis lexico-sintactico del parser
     */
    parse(){
        try {
            const ssss: Clase[] = [];
            //const instructions:instruction[] = parser.parse(this.txtEntrada);
            const clase:Clase = parser.parse(this.txtEntrada);
            console.log(clase);
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
