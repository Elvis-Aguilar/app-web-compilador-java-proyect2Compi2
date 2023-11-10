import { Quartet } from './quartet';

export class QuartHandler {
  private tmp: number = 0;
  quartets: Quartet[] = [];

  constructor() {}

  public tmpVar(): string {
    return `t${this.tmp}`;
  }

  public aumentarTmp() {
    this.tmp++;
  }

  public push(q: Quartet) {
    this.quartets.push(q);
  }

  public unshift(quarts: Quartet){
    this.quartets.unshift(quarts);
  }

  public setTmp(value:number){
    this.tmp = value;
  }
}
