import { Archivo } from "../area-editor/objects/archivo";
import { Folder } from "../area-editor/objects/folder";
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
import { FunMath } from "../logic/instructions/fun-nativas/fun-math";
import { Sout } from "../logic/instructions/fun-nativas/sout";
import { TypeFunMath } from "../logic/instructions/fun-nativas/type-fun-math";
import { Funcion } from "../logic/instructions/funcion/funcion";
import { Instruction } from "../logic/instructions/instruction";
import { NodoOperation } from "../logic/instructions/operations/nodo-operation";
import { Operation } from "../logic/instructions/operations/operation";
import { TypeOperation } from "../logic/instructions/operations/type-operation";
import { Dato } from "../logic/table-simbol/dato";
import { TypeDato } from "../logic/table-simbol/type-dato";
import { Variable } from "../logic/table-simbol/variable";
import { Visibilidad } from "../logic/table-simbol/visibilidad";
import { VisitorExecute } from "../logic/visitors/visitor-execute";
import { VisitorGenericQuartet } from "../logic/visitors/visitor-generic-quartet";
import { SesionService } from "../services/sesion.service";
import { AuxFun } from "./aux-fun";
import { Token } from "./token";

declare var parser:  any;

export class Parser {
    private txtEntrada:String = "";
    private archivoTmp:Archivo;
    private archivos: Array<Archivo> = [];
    private proyect:Folder

    constructor(archivoTmp:Archivo, proyect:Folder) {
        this.archivoTmp = archivoTmp;
        this.txtEntrada = archivoTmp.contenido;
        this.proyect = proyect;
        parser.yy.NodoOperation = NodoOperation;
        parser.yy.Operation = Operation;
        parser.yy.TypeOperation = TypeOperation;
        parser.yy.Dato = Dato;
        parser.yy.TypeDato = TypeDato;
        parser.yy.Token = Token;
        parser.yy.Declaration = Declaration;
        parser.yy.Errores = ErrorSingleton;
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
        parser.yy.FunMath = FunMath;
        parser.yy.TypeFunMath = TypeFunMath;
    }

    /**
     * funcion para ejecutar el analisis lexico-sintactico del parser
     */
    parse(){
        this.archivos = this.proyect.getArchivos();
        this.ponerPrimeroArchivo();
        const visGeneQuarte = new VisitorGenericQuartet();
        const vistExecute = new VisitorExecute();
        const clases:Clase[] = [];
        for (let index = 0; index <  this.archivos.length; index++) {
            const arch =  this.archivos[index];
            try {
                const clase:Clase = parser.parse(arch.contenido);
                clases.push(clase);
                //clase.execute(vistExecute);
                console.log(clase);
                //instructions.forEach(inst => {
                  //  inst.genericQuartet(visGeneQuarte);
                //});
                //console.log(visGeneQuarte.qh)
            } catch (error) {
                console.error(error);
            }
            
        }
        //realizar el execute si no hay errores sintacticos o lexicos
    }

    private ponerPrimeroArchivo(){
        const index = this.archivos.indexOf(this.archivoTmp);
        if (index !== -1) {
            this.archivos.splice(index, 1);
            this.archivos.unshift(this.archivoTmp); 
        }
    }
}
