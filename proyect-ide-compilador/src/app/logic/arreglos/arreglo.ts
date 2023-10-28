import { Token } from 'src/app/parser/token';
import { TypeDato } from '../table-simbol/type-dato';
import { Variable } from '../table-simbol/variable';
import { Visibilidad } from '../table-simbol/visibilidad';

export class Arreglo {
    token:Token;
    typeDato: TypeDato;
    visibilidad: Visibilidad;
    isStatik: boolean;
    isFinal: boolean;
    variables: Array<Variable> = [];
    dimension: number;
    indicesMax:Array<number> = [];
    inizializado: boolean = false;
    pos:number = 0;

    constructor(token:Token, typeDato: TypeDato, visibilidad: Visibilidad, isStatik: boolean, isFinal: boolean, dimension: number,indicesMax?:Array<number>, variables?: Array<Variable>){
        this.token = token;
        this.typeDato = typeDato;
        this.visibilidad = visibilidad;
        this.isStatik = isStatik;
        this.isFinal = isFinal;
        this.dimension = dimension;
        this.indicesMax = indicesMax || [];
        this.variables = variables || [];
        if (indicesMax) {
            this.inizializado = true;
        }
    }

}

