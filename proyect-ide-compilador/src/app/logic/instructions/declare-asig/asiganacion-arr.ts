import { Token } from 'src/app/parser/token';
import { TypeDato } from '../../table-simbol/type-dato';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';
import { Operation } from '../operations/operation';

export class AsignacionArr extends Instruction {
  asignacionIndice: boolean = false;
  token: Token;
  typeAsig: TypeDato;
  opers: Operation[] = [];
  op: Operation;

  constructor(token: Token, typeAsig: TypeDato,opers: Operation[], op: Operation, asignacionIndice: boolean) {
    super();
    this.token = token;
    this.typeAsig = typeAsig;
    this.opers = opers;
    this.op = op;
    this.asignacionIndice = asignacionIndice;
  }

  genericQuartet(vi: Visitor): void {
    //TODO:Method not implemented.
  }

  execute(vi: Visitor): void {
    //TODO:Method not implemented.
  }
}
