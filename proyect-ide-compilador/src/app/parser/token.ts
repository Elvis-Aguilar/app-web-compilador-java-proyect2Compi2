export class Token {
  id: string;
  column: number;
  line: number;

  constructor(id: string, column: number, line: number) {
    this.id = id;
    this.column = column;
    this.line = line;
  }
}
