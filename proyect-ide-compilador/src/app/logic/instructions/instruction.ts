import { Visitor } from '../visitors/visitor';

export abstract class Instruction {
  abstract execute(vi: Visitor): void;
  abstract genericQuartet(vi: Visitor): void;
}
