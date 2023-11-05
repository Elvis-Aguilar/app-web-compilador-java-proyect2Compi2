import { Token } from 'src/app/parser/token';
import { Clase } from '../class/clase';
import { Constructor } from '../class/constructor';
import { ErrorSingleton } from '../errors/error-singleton';
import { Error } from '../errors/errors';
import { TypeError } from '../errors/type-error';
import { Funcion } from '../instructions/funcion/funcion';

export class AnalisisSemantico {
  public validarConstructores(clas: Clase) {
    const construcAuxs: Constructor[] = [];
    clas.constructors.forEach((constr) => {
      for (const tmpConstr of construcAuxs) {
        if (this.compararConstrIguales(constr, tmpConstr)) {
          const mjs = 'El constructor ya existe';
          ErrorSingleton.getInstance().push(
            new Error(
              constr.token.line,
              constr.token.column,
              constr.token.id,
              `${mjs}`,
              TypeError.SEMANTICO
            )
          );
          break;
        }
      }
      construcAuxs.push(constr);
      if (construcAuxs.length === 0) {
        construcAuxs.push(constr);
      }
    });
  }

  public validarRepitenciaFunClase(clas: Clase) {
    const funAux: Funcion[] = [];
    clas.funciones.forEach((fun) => {
      for (const tmpFun of funAux) {
        if (this.compararFuncionesIguales(fun, tmpFun)) {
          const mjs = 'La funcion ya existe';
          ErrorSingleton.getInstance().push(
            new Error(
              fun.token.line,
              fun.token.column,
              fun.token.id,
              `${mjs}`,
              TypeError.SEMANTICO
            )
          );
          break;
        }
      }
      funAux.push(fun);
      if (funAux.length === 0) {
        funAux.push(fun);
      }
    });
  }

  private compararFuncionesIguales(fun1: Funcion, fun2: Funcion): boolean {
    if (fun1.nombre !== fun2.nombre) {
      return false;
    }
    if (fun1.parametros.length !== fun2.parametros.length) {
      return false;
    }
    for (let index = 0; index < fun1.parametros.length; index++) {
      const element = fun1.parametros[index];
      const element2 = fun2.parametros[index];
      if (element.typeDato !== element2.typeDato) {
        return false;
      }
    }

    return true;
  }

  private compararConstrIguales(fun1: Constructor, fun2: Constructor): boolean {
    if (fun1.parametros.length !== fun2.parametros.length) {
      return false;
    }
    for (let index = 0; index < fun1.parametros.length; index++) {
      const element = fun1.parametros[index];
      const element2 = fun2.parametros[index];
      if (element.typeDato !== element2.typeDato) {
        return false;
      }
    }
    return true;
  }
}
