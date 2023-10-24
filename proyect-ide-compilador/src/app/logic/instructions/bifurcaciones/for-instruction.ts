import { Token } from 'src/app/parser/token';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';
import { Operation } from '../operations/operation';

export class ForInstrction extends Instruction {
  instrcInicial: Instruction;
  condition: Operation;
  instructions: Instruction[];
  token:Token;

  constructor(instrcInicial: Instruction, condition: Operation, instructions: Instruction[], token: Token) {
    super();
    this.instrcInicial = instrcInicial;
    this.condition = condition;
    this.instructions = instructions;
    this.token = token;
  }

  execute(vi: Visitor): void {
    //TODO: Method not implemented.
  }
  genericQuartet(vi: Visitor): void {
    //TODO: Method not implemented.
  }
}
