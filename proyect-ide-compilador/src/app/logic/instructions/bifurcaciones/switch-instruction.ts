import { Token } from 'src/app/parser/token';
import { SymbolTable } from '../../table-simbol/symbol-table';
import { Variable } from '../../table-simbol/variable';
import { Visitor } from '../../visitors/visitor';
import { Instruction } from '../instruction';
import { CaseSwitchInstruction } from './case-switch-instruction';

export class SwitchInstruction extends Instruction {
  symbolTable!: SymbolTable;
  casos: CaseSwitchInstruction[] = []
  varSwintch: Variable;
  token: Token;

  constructor(
    casos: CaseSwitchInstruction[],
    varSwintch: Variable,
    token: Token
  ) {
    super();
    this.casos = casos;
    this.varSwintch = varSwintch;
    this.token = token;
  }

  execute(vi: Visitor): void {
    //TODO:Method not implemented.
    //vi.visitSwitch(this);
  }
  genericQuartet(vi: Visitor): void {
    //TODO:Method not implemented.
  }

  referenciarSymbolTable(vi: Visitor, symbolTablePadre: SymbolTable): void {
    this.symbolTable = symbolTablePadre;
    vi.visitSwitch(this);
  }

  validar(vi: Visitor): boolean {
    //TODO:obtener el dato de varSwitch, si existe o reportar error
    this.casos.forEach((caso) => {
      if (this.varSwintch.dato) {
        caso.datoSwintch = this.varSwintch.dato;
        caso.comprobarCasos();
      }
      caso.execute(vi);
    });
    return true;
  }
}
