import { Token } from "src/app/parser/token";
import { TypeDato } from "./type-dato";
import { Variable } from "./variable";

export class SymbolTable {
    nameReference: string;
    variables: Array<Variable> = [];
    symbolTablePadre!:SymbolTable;

    constructor(nameReference:string){
        this.nameReference = nameReference;
    }

    addVariable(variable: Variable) {
        const variableExistente = this.variables.find(v => v.id === variable.id);
        if (variableExistente) {
            //console.error(`La variable con ID ${variable.id} ya existe.`);
        } else {
            this.variables.push(variable);
        }
    }

    // TODO: buscar en las tablas padres si existieran
    getById(tok:Token):Variable {
        const variable = this.variables.find(v => v.id === tok.id)
        if (variable) {
            return variable;
        } else {
            //error semantico no existe la variable
            return new Variable(TypeDato.INTEGER,tok.id);
        }
    }
    
}
