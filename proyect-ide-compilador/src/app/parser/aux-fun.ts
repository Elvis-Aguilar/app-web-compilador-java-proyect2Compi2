import { ErrorSingleton } from '../logic/errors/error-singleton';
import { Error } from '../logic/errors/errors';
import { Declaration } from '../logic/instructions/declare-asig/declaration';
import { Instruction } from '../logic/instructions/instruction';
import { TypeDato } from '../logic/table-simbol/type-dato';
import { Token } from 'src/app/parser/token';
import { TypeError } from '../logic/errors/type-error';

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
  
}
