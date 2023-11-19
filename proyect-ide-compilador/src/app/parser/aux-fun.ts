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
import { getYset } from '../logic/instructions/funcion/get-set';
import { Clase } from '../logic/class/clase';
import { Variable } from '../logic/table-simbol/variable';
import { Funcion } from '../logic/instructions/funcion/funcion';

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
  
  configMasIgual(op:Operation, token:Token, globla?:boolean, objeto?:string): Asignacion{
    const opright = op.rootOp;
    const opLeft = new NodoOperation(new Dato(TypeDato.INT, 1,"", false, token , true, globla));
    const nodoRoot = new NodoOperation(undefined, opLeft, opright, TypeOperation.SUMA, token);
    const operation = new Operation(nodoRoot);
    return new Asignacion(token, operation, globla, objeto);
  }

  configIncremet(token:Token, typeOp: TypeOperation, globla?:boolean): Asignacion{
    const opLeft  = new NodoOperation(new Dato(TypeDato.INT, 1,"", false, token , true, globla));
    const opright = new NodoOperation(new Dato(TypeDato.INT, 1,"", false, token));
    const nodoRoot = new NodoOperation(undefined, opLeft, opright, typeOp, token);
    const operation = new Operation(nodoRoot);
    return new Asignacion(token, operation, globla);
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

  generarGetSet(enumGet: getYset, config: any, decl:Declaration[], clase: Clase) {
    const dec = decl[0];
    const token = dec.token;
    const nombreF = token.id[0].toUpperCase() + token.id.slice(1);
    const parametro: Variable[] = [new Variable(Visibilidad.PUBLIC, false, false, config[3], token.id, token)];
    const dato = new Dato(config[3], undefined, undefined, undefined, token, true, true);
    const nodo = new NodoOperation(dato);
    const tmp = new Operation(nodo)
    const datoSet = new Dato(config[3], undefined, undefined, undefined, token, true);
    const nodoSet = new NodoOperation(datoSet);
    const tmpSet = new Operation(nodoSet)
    const tokenGet = new Token("return", 0, 0)
    const instruccionGet: Instruction[] = [new Asignacion(tokenGet, tmp)]
    const instruccionSet: Instruction[] = [new Asignacion(token, tmpSet, true)]
    const set = new Funcion(config, new Token(nombreF,token.column,token.line), "set" + nombreF, parametro, instruccionSet);
    const get = new Funcion(config, new Token(nombreF,token.column,token.line), "get" + nombreF, [], instruccionGet);
    switch (enumGet) {
      case getYset.GETYSET:
        clase.pushFun(get);
        clase.pushFun(set);
        break;
      case getYset.SETYGET:
        clase.pushFun(set);
        clase.pushFun(get);
        break;
      case getYset.GET:
        clase.pushFun(get);
        break;
      case getYset.SET:
        clase.pushFun(set);
        break;
      default:
        break;
    }
  }

  generateGetSetGlobal(enumGet: getYset, clase: Clase){
    clase.instructions.forEach((instr)=>{
      if (instr instanceof Declaration) {
        const config = [Visibilidad.PUBLIC, false, false, instr.typeDato];
        const instucs:Declaration[] = [instr]
        this.generarGetSet(enumGet,config,instucs,clase);
      }
    })

  }
}
