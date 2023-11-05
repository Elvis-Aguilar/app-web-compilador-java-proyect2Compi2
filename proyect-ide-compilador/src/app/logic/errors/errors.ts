import { TypeError } from 'src/app/logic/errors/type-error';

export class Error {
  private line: number;
  private column: number;
  private lexeme: string;
  private message: string;
  private typeError: TypeError;
  private ubicacion: string = '';

  constructor(
    line: number,
    column: number,
    lexeme: string,
    message: string,
    typeError: TypeError
  ) {
    this.line = line;
    this.column = column;
    this.lexeme = lexeme;
    this.message = message;
    this.typeError = typeError;
  }

  public getLine(): number {
    return this.line;
  }

  public getColumn(): number {
    return this.column;
  }

  public getLexeme(): string {
    return this.lexeme;
  }

  public getMessage(): string {
    return this.message;
  }

  public getTypeError(): TypeError {
    return this.typeError;
  }

  public getUbicacion(){
    return this.ubicacion;
  }

  public setUbicacion(value: string){
    this.ubicacion = value;
  }
}
