export class CodigoFinal {
  public content: string;

  constructor(content: string) {
    this.content = content;
  }

  public getContent(): string {
    return this.content;
  }

  public setContent(content: string) {
    this.content = content;
  }
}
