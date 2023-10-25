import { Token } from 'src/app/parser/token';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { TypeDato } from '../../table-simbol/type-dato';
import { Visibilidad } from '../../table-simbol/visibilidad';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';
import { Operation } from '../operations/operation';

export class Declaration extends Instruction {

  token: Token;
  op: Operation | null;
  result = '';
  typeDato!: TypeDato;
  visibilidad!: Visibilidad;
  isStatik!: boolean;
  isFinal!: boolean;
  symbolTable!: SymbolTable;

  constructor(token: Token, op?: Operation) {
    super();
    this.token = token;
    this.op = op || null;
  }

  genericQuartet(vi: Visitor): void {
    vi.visitDeclaration(this);
  }

  execute(vi: Visitor): void {
    vi.visitDeclaration(this);
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = symbolTablePadre;
    vi.visitDeclaration(this);
  }
}
