import { Token } from 'src/app/parser/token';
import { Arreglo } from '../arreglos/arreglo';
import { ErrorSingleton } from '../errors/error-singleton';
import { Error } from '../errors/errors';
import { TypeError } from '../errors/type-error';
import { TypeDato } from './type-dato';
import { Variable } from './variable';
import { Visibilidad } from './visibilidad';

export class SymbolTable {
  nameReference: string;
  variables: Array<Variable> = [];
  symbolTablePadre!: SymbolTable;
  arreglos: Array<Arreglo> = [];
  pos: number = 0;

  constructor(nameReference: string) {
    this.nameReference = nameReference;
  }

  addVariable(variable: Variable) {
    const variableExistente = this.buscarEnCadaSubTabla(variable.token);
    if (variableExistente) {
      const msj = 'La variable ya existe';
      ErrorSingleton.getInstance().push(
        new Error(
          variable.token.line,
          variable.token.column,
          variable.token.id,
          `${msj}`,
          TypeError.SEMANTICO
        )
      );
    } else {
      this.variables.push(variable);
    }
  }

  getById(tok: Token): Variable | void {
    const variable = this.buscarEnCadaSubTabla(tok);
    if (variable) {
      return variable;
    } else {
      if (this.symbolTablePadre) {
        return this.symbolTablePadre.getById(tok);
      } else {
        const msj = 'Variable no existe';
        ErrorSingleton.getInstance().push(
          new Error(tok.line, tok.column, tok.id, `${msj}`, TypeError.SEMANTICO)
        );
        return undefined;
      }
    }
  }

  getByIdGlobal(tok: Token): Variable | void {
    if (this.symbolTablePadre) {
      return this.symbolTablePadre.getByIdGlobal(tok);
    }
    const variable = this.buscarEnCadaSubTabla(tok);
    if (this.nameReference === 'Clase') {
      if (variable) {
        return variable;
      } else {
        const msj = 'Variable no existe';
        ErrorSingleton.getInstance().push(
          new Error(tok.line, tok.column, tok.id, `${msj}`, TypeError.SEMANTICO)
        );
        return undefined;
      }
    }else{
      const msj = 'Variable no existe o no es Global';
      ErrorSingleton.getInstance().push(
        new Error(tok.line, tok.column, tok.id, `${msj}`, TypeError.SEMANTICO)
      );
      return undefined;
    }
  }

  private buscarEnCadaSubTabla(tok: Token): Variable | void {
    let variable = this.variables.find((v) => v.id === tok.id);
    if (variable) {
      return variable;
    }
  }

  getPosition(): number {
    return  this.pos + this.arreglos.length + this.variables.length;
  }
}
