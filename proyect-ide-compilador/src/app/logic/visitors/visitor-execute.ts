import { AnalisisSemantico } from '../analisis-semantico/analisis-semantico';
import { Arreglo } from '../arreglos/arreglo';
import { Clase } from '../class/clase';
import { Constructor } from '../class/constructor';
import { ErrorSingleton } from '../errors/error-singleton';
import { Error } from '../errors/errors';
import { TypeError } from '../errors/type-error';
import { CaseSwitchInstruction } from '../instructions/bifurcaciones/case-switch-instruction';
import { DoWhileInstruction } from '../instructions/bifurcaciones/do-while-instruction';
import { ElseInstruction } from '../instructions/bifurcaciones/Else-Instruction';
import { ForInstrction } from '../instructions/bifurcaciones/for-instruction';
import { IfInstruction } from '../instructions/bifurcaciones/If-instruction';
import { SwitchInstruction } from '../instructions/bifurcaciones/switch-instruction';
import { WhileInstruction } from '../instructions/bifurcaciones/while-Instruction';
import { AsignacionArr } from '../instructions/declare-asig/asiganacion-arr';
import { Asignacion } from '../instructions/declare-asig/asignacion';
import { Declaration } from '../instructions/declare-asig/declaration';
import { DeclarationArr } from '../instructions/declare-asig/declaration-arr';
import { FunMath } from '../instructions/fun-nativas/fun-math';
import { Sout } from '../instructions/fun-nativas/sout';
import { Funcion } from '../instructions/funcion/funcion';
import { NodoOperation } from '../instructions/operations/nodo-operation';
import { Operation } from '../instructions/operations/operation';
import { OperationCasteo } from '../instructions/operations/operation-casteo';
import { Dato } from '../table-simbol/dato';
import { TypeDato } from '../table-simbol/type-dato';
import { Variable } from '../table-simbol/variable';
import { Visitor } from './visitor';

export class VisitorExecute extends Visitor {
  private analizador = new AnalisisSemantico();

  visitClass(clas: Clase): void {
    //TODO: validar paquete y nombre archivo, realizar la herencia con el import
    clas.instructions.forEach((instr) => {
      instr.execute(this);
    });
    this.analizador.validarRepitenciaFunClase(clas);
    this.analizador.validarConstructores(clas);
  }

  visitOp(op: Operation): Dato | void {
    return op.rootOp.execute(this);
  }

  /**
   * logica para ejecucion de operaciones
   * TODO: verificar si es una vairable para buscarla y obtener su dato.
   * @param nodo
   */
  visitNodoOP(nodo: NodoOperation): Dato | void {
    if (!nodo.typeOp && nodo.dato !== null) {
      return nodo.dato;
    }
    const tmp = new Dato(TypeDato.INT);
    const datoLeft = nodo.opLeft?.execute(this) || new Dato(TypeDato.INT);
    const datoRight = nodo.opRight?.execute(this) || new Dato(TypeDato.INT);
    const operacion = new OperationCasteo();
    if (nodo.typeOp) {
      return operacion.getDato(datoLeft, datoRight, nodo.typeOp);
    }
    return tmp;
  }

  visitDeclaration(dec: Declaration): void {
    const dato = dec.op?.execute(this);
    if (dato?.typeDato !== dec.typeDato) {
      const msj = 'El tipo a asignar no es equivalente tipo de la variable';
      ErrorSingleton.getInstance().push(
        new Error(dec.token.line, dec.token.column, dec.token.id ,`${msj}`, TypeError.SEMANTICO
        ));
    }
    const pos = dec.symbolTable.getPosition();
    let newVar: Variable;
    if (dato) {
      newVar = new Variable(
        dec.visibilidad,
        dec.isStatik,
        dec.isFinal,
        dec.typeDato,
        dec.token.id,
        dec.token,
        dato
      );
    } else {
      newVar = new Variable(
        dec.visibilidad,
        dec.isStatik,
        dec.isFinal,
        dec.typeDato,
        dec.token.id,
        dec.token
      );
    }
    newVar.pos = pos;
    dec.symbolTable.addVariable(newVar);
  }

  visitIf(ifI: IfInstruction): void {
    ifI.volorCondicion(this);
    ifI.instructions.forEach((instru) => {
      instru.execute(this);
    });
    if (ifI.ElseIfInstruction) {
      ifI.ElseIfInstruction.execute(this);
    }
    if (ifI.ElseInstruction) {
      ifI.ElseInstruction.execute(this);
    }
  }

  visitElse(elseI: ElseInstruction): void {
    elseI.instructions.forEach((instru) => {
      instru.execute(this);
    });
  }

  visitWhile(whileI: WhileInstruction): void {
    whileI.valorCondicion(this);
    whileI.instructions.forEach((instru) => {
      instru.execute(this);
    });
  }

  visitDoWhile(doWhileI: DoWhileInstruction): void {
    doWhileI.instructions.forEach((instr) => {
      instr.execute(this);
    });
    doWhileI.valorCondicion(this);
  }

  visitSwitch(swit: SwitchInstruction): void {
    swit.validar(this);
  }

  visitCaseSwitch(caseSwitchI: CaseSwitchInstruction): void {
    caseSwitchI.instructions.forEach((instr) => {
      instr.execute(this);
    });
  }

  visitConstruct(fun: Constructor): void {
    fun.instructions.forEach((instr) => {
      instr.execute(this);
    });
  }

  visitfor(fo: ForInstrction): void {
    fo.instrcInicial.execute(this);
    fo.valorCondicion(this);
    fo.instructions.forEach((instr) => {
      instr.execute(this);
    });
  }

  visitAsig(asig: Asignacion): void {
    const dato = asig.op.execute(this);
    let variable:Variable | void;
    if (asig.global) {
      variable = asig.symbolTable.getByIdGlobal(asig.token);
    }else{
      variable = asig.symbolTable.getById(asig.token);
    }
    if (dato && variable) {
      if (variable.inizializado && variable.isFinal) {
        const msj = 'La variable es FINAL no se puede reasignar valores'
        ErrorSingleton.getInstance().push(
          new Error(asig.token.line, asig.token.column, asig.token.id ,`${msj}`, TypeError.SEMANTICO
        ));
        return
      }
      if (variable.typeDato !== dato.typeDato) {
        const msj = 'El dato a Asignar no es equivalente al valor esperado'
        ErrorSingleton.getInstance().push(
          new Error(asig.token.line, asig.token.column, asig.token.id ,`${msj}`, TypeError.SEMANTICO
        ));
      }
      
    }
  }

  visitDeclareArr(dec: DeclarationArr): void {
    const pos = dec.symbolTable.getPosition();
    if (dec.opers.length === 0) {
      const arrSimple = new Arreglo(dec.token,dec.typeDato,dec.visibilidad,dec.isStatik,dec.isFinal,dec.dimension);
      arrSimple.pos = pos;
      dec.symbolTable.arreglos.push(arrSimple);
      return 
    }
    const datos:Dato[] = [];
    dec.opers.forEach((op) =>{
      const dat = op.execute(this);
      if (dat) {
        datos.push(dat);
      }
    });
    if (dec.indices) {
      const indicesMax:Array<number> = [];
      for (let index = 0; index < dec.dimension; index++) {
        indicesMax.push(datos[index].numero)
      }
      const arrSimple = new Arreglo(dec.token,dec.typeDato,dec.visibilidad,dec.isStatik,dec.isFinal,dec.dimension, indicesMax);
      arrSimple.pos = pos;
      dec.symbolTable.arreglos.push(arrSimple);
      return 
    }
    const indicesMax:Array<number> = [];
    if (dec.dimension === 1) {
      indicesMax.push(dec.opers.length);
    }else{
      indicesMax.push(2);
      const ind = dec.opers.length/2;
      indicesMax.push(ind);
    }
    const arrSimple = new Arreglo(dec.token,dec.typeDato,dec.visibilidad,dec.isStatik,dec.isFinal,dec.dimension, indicesMax);
    arrSimple.pos = pos;
    dec.symbolTable.arreglos.push(arrSimple);


  }
  
  visitAsigArr(asi: AsignacionArr): void {
    //TODO:Method not implemented
  }
  visitFunMath(funMath: FunMath): void {
    //TODO:Method not implemented
  }
  visitSout(sout: Sout): void {
    //TODO:Method not implemented
  }

  visitFuncion(fun: Funcion): void {
    //TODO:Method not implemented
  }
}
