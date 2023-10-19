export class Token {
  id: string;
  column: number;
  line: number;
  ubicacion:string;

  constructor(id: string, column: number, line: number, ubicacion?:string) {
    this.id = id;
    this.column = column;
    this.line = line;
    this.ubicacion = ubicacion || "";
  }
}
