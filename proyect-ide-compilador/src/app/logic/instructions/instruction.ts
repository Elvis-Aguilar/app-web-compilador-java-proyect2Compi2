import { Visitor } from "../visitors/visitor";

export abstract class instruction{
    abstract genericQuartet(vi:Visitor): void;
}