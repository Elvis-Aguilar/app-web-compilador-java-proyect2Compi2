import { Error } from './errors';
import { TypeError } from './type-error';

export class ErrorSingleton {
  private static instance: ErrorSingleton;
  public erros: Error[] = [];
  errLex: Error[] = [];
  errSint: Error[] = [];
  errSema: Error[] = [];
  ubicacion: string = '';

  private constructor() {}

  public static getInstance(): ErrorSingleton {
    if (!ErrorSingleton.instance) {
      this.instance = new ErrorSingleton();
    }
    return ErrorSingleton.instance;
  }

  public push(err: Error) {
    err.setUbicacion(this.ubicacion);
    this.erros.push(err);
  }

  public ordenarErrores() {
    this.limpiarTmp();
    this.erros.forEach((err) => {
      switch (err.getTypeError()) {
        case TypeError.LEXICO:
          this.errLex.push(err);
          break;
        case TypeError.SINTACTICO:
          this.errSint.push(err);
          break;
        case TypeError.SEMANTICO:
          this.errSema.push(err);
          break;
      }
    });
  }

  public limpiar() {
    this.erros.splice(0, this.erros.splice.length);
    this.errLex.splice(0, this.errLex.splice.length);
    this.errSint.splice(0, this.errSint.splice.length);
    this.errSema.splice(0, this.errSema.splice.length);
  }

  private limpiarTmp() {
    this.errLex.splice(0, this.errLex.splice.length);
    this.errSint.splice(0, this.errSint.splice.length);
    this.errSema.splice(0, this.errSema.splice.length);
  }
}
