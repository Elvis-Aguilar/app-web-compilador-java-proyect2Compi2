import { Token } from 'src/app/parser/token';
import { Arreglo } from '../../arreglos/arreglo';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { TypeDato } from '../../table-simbol/type-dato';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';
import { Operation } from '../operations/operation';

export class AsignacionArr extends Instruction {

  asignacionIndice: boolean = false;
  token: Token;
  opers: Operation[] = [];
  op: Operation;
  global:boolean;
  symbolTable!: SymbolTable;
  ArregloRealtivo!:Arreglo;

  constructor(token: Token, opers: Operation[], op: Operation, global:boolean) {
    super();
    this.token = token;
    this.opers = opers;
    this.op = op;
    this.global = global;
  }

  genericQuartet(vi: Visitor): void {
    vi.visitAsigArr(this);
  }

  execute(vi: Visitor): void {
    vi.visitAsigArr(this);
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = symbolTablePadre;
    vi.visitAsigArr(this);
  }

  public typeAsiganar():string{
    if(this.ArregloRealtivo.typeDato === TypeDato.CHAR || this.ArregloRealtivo.typeDato === TypeDato.STRING){
      return 'char';
    }
    return 'int';

  }
}
