
import { Token } from "src/app/parser/token";
import { TypeDato } from "./type-dato";

export class Dato {
    numero: number;
    cadena: string;
    booleano: boolean;
    typeDato: TypeDato;
    token: Token;
    isVariable: boolean;

    constructor(typeDato: TypeDato, numero?: number, cadena?: string, booleano?: boolean, token?: Token, isVariable?: boolean) {
        this.numero = numero || 0; 
        this.cadena = cadena || ''; 
        this.booleano = booleano !== undefined ? booleano : false; 
        this.typeDato = typeDato;
        this.token = token || new Token("",0,0);
        this.isVariable = isVariable !== undefined ? isVariable : false;
    }

}
