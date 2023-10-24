import { ErrorSingleton } from '../logic/errors/error-singleton';
import { Error } from '../logic/errors/errors';
import { Declaration } from '../logic/instructions/declare-asig/declaration';
import { Instruction } from '../logic/instructions/instruction';
import { TypeDato } from '../logic/table-simbol/type-dato';
import { Token } from 'src/app/parser/token';
import { TypeError } from '../logic/errors/type-error';
import { Operation } from '../logic/instructions/operations/operation';
import { Asignacion } from '../logic/instructions/declare-asig/asignacion';
import { NodoOperation } from '../logic/instructions/operations/nodo-operation';
import { Dato } from '../logic/table-simbol/dato';
import { TypeOperation } from '../logic/instructions/operations/type-operation';
import { Visibilidad } from '../logic/table-simbol/visibilidad';
import { ForInstrction } from '../logic/instructions/bifurcaciones/for-instruction';

export class AuxFun {
  completDeclacionGlobla(decs: Declaration[], config: any): Declaration[] {
    if (config instanceof Array) {
      decs.forEach((dec) => {
        dec.visibilidad = config[0];
        dec.isStatik = config[1];
        dec.isFinal = config[2];
        dec.typeDato = config[3];
        this.validarTypeDato(dec.typeDato, dec.token);
      });
    }
    return decs;
  }

  pushInstruccion(instructions: Instruction[],insAdd: Instruction[] | Instruction): Instruction[] {
    if (insAdd === null) {
      return instructions;
    }
    if (insAdd instanceof Array) {
      insAdd.forEach((ins) => {
        instructions.push(ins);
      });
      return instructions;
    }
    instructions.push(insAdd);
    return instructions;
  }

  //funcion para validar que una variable no puede ser tipo void
  validarTypeDato(typeDato: TypeDato, token:Token) {
    if (typeDato === TypeDato.VOID) {
      const msjError = 'Las variables no pueden ser del tipo VOID';
      ErrorSingleton.getInstance().push(new Error(token.line, token.column,token.id,`${msjError}`,TypeError.SEMANTICO));
    }
  }

  agregarType(type:TypeDato, decs:Declaration[]): Declaration[]{
    decs.forEach((dec) => {
      dec.typeDato = type;
      this.validarTypeDato(dec.typeDato, dec.token);
    });
    return decs;
  }
  
  configMasIgual(op:Operation, token:Token): Asignacion{
    const opright = op.rootOp;
    const opLeft = new NodoOperation(new Dato(TypeDato.INT, 1,"", false, token , true));
    const nodoRoot = new NodoOperation(undefined, opLeft, opright, TypeOperation.SUMA, token);
    const operation = new Operation(nodoRoot);
    return new Asignacion(token, operation);
  }

  configIncremet(token:Token, typeOp: TypeOperation): Asignacion{
    const opright = new NodoOperation(new Dato(TypeDato.INT, 1,"", false, token , true));
    const opLeft = new NodoOperation(new Dato(TypeDato.INT, 1,"", false, token));
    const nodoRoot = new NodoOperation(undefined, opLeft, opright, typeOp, token);
    const operation = new Operation(nodoRoot);
    return new Asignacion(token, operation);
  }

  configVarIteradorFor(dec:Declaration):Declaration{
    dec.isFinal = false;
    dec.isStatik = false;
    dec.visibilidad = Visibilidad.PUBLIC;
    dec.typeDato = TypeDato.INT;
    return dec;
  }

  configFor(config:any, token:Token, instrcs:Instruction[]): ForInstrction{
    instrcs.push(config[2]);
    const senFor = new ForInstrction(config[0],config[1],instrcs ,token);
    return senFor;
  }
}
