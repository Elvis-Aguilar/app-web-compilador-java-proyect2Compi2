import { Token } from 'src/app/parser/token';
import { AnalisisSemantico } from '../analisis-semantico/analisis-semantico';
import { Arreglo } from '../arreglos/arreglo';
import { Clase } from '../class/clase';
import { Constructor } from '../class/constructor';
import { FunMain } from '../class/fun-main';
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
import { asignacionObjec } from '../instructions/declare-asig/asignacion-objc';
import { Declaration } from '../instructions/declare-asig/declaration';
import { DeclarationArr } from '../instructions/declare-asig/declaration-arr';
import { DeclarationObject } from '../instructions/declare-asig/declaration-object';
import { FunMath } from '../instructions/fun-nativas/fun-math';
import { Sout } from '../instructions/fun-nativas/sout';
import { Funcion } from '../instructions/funcion/funcion';
import { LlamadaFun } from '../instructions/funcion/llamada-fun';
import { LlamadaFunGen } from '../instructions/funcion/llamada-fun-gen';
import { NodoOperation } from '../instructions/operations/nodo-operation';
import { Operation } from '../instructions/operations/operation';
import { OperationCasteo } from '../instructions/operations/operation-casteo';
import { Dato } from '../table-simbol/dato';
import { TypeDato } from '../table-simbol/type-dato';
import { Variable } from '../table-simbol/variable';
import { Visitor } from './visitor';
import { Read } from "../instructions/fun-nativas/read";
import { AsigCompletaArr } from '../arreglos/asig-completa-arr';
import { NodoArreglo } from '../arreglos/nodo-arr';


export class VisitorExecute extends Visitor {

  private analizador = new AnalisisSemantico();
  nameClas: String = '';
  clases: Clase[] = [];
  claseActual: Clase = new Clase('');

  visitMain(main: FunMain): void {
    main.instructions.forEach((instr) => {
      instr.execute(this);
    });
  }

  visitClass(clas: Clase): void {
    //TODO: validar paquete y nombre archivo, realizar la herencia con el import
    clas.instructions.forEach((instr) => {
      instr.execute(this);
    });
    this.analizador.validarRepitenciaFunClase(clas);
    this.analizador.validarConstructores(clas);
    this.nameClas = clas.nombre;
    clas.funciones.forEach((fun) => {
      fun.execute(this);
    });
    clas.constructors.forEach((fun) => {
      fun.execute(this);
      fun.tamaniClas = clas.symbolTable.getPosition();
    });
  }

  visitFuncion(fun: Funcion): void {
    fun.nombre3Direc = `${this.nameClas}_${fun.nombre}`;
    fun.parametros.forEach((param) => {
      const val = param.typeDato.toString().toLowerCase();
      fun.nombre3Direc = `${fun.nombre3Direc}_${val}`;
    });
    fun.nombre3Direc = `${fun.nombre3Direc}()`;
    fun.instructions.forEach((instr) => {
      instr.execute(this);
    });
  }

  visitConstruct(fun: Constructor): void {
    fun.nombre3Direc = `${this.nameClas}_${fun.nombre}`;
    fun.parametros.forEach((param) => {
      const val = param.typeDato.toString().toLowerCase();
      fun.nombre3Direc = `${fun.nombre3Direc}_${val}`;
    });
    fun.nombre3Direc = `${fun.nombre3Direc}()`;
    fun.instructions.forEach((instr) => {
      instr.execute(this);
    });
  }

  visitOp(op: Operation): Dato | void {
    return op.rootOp.execute(this);
  }

  visitNodoOP(nodo: NodoOperation): Dato | void {
    if (!nodo.typeOp && nodo.dato !== null) {
      if(nodo.dato.typeDato === TypeDato.NULL){
        return nodo.dato
      }
      if (!nodo.dato.isVariable) {
        nodo.typeDato = nodo.dato.typeDato
        return nodo.dato;
      }
      if (nodo.dato.global) {
        const vari = nodo.symbolTable.getByIdGlobal(nodo.dato.token);
        if (vari) {
          nodo.pos = vari.pos;
          nodo.typeDato = vari.typeDato
          return new Dato(vari.typeDato,vari.dato?.numero);
        }
      } else {
        const vari = nodo.symbolTable.getById(nodo.dato.token);
        if (vari) {
          nodo.pos = vari.pos;
          nodo.typeDato = vari.typeDato
          return new Dato(vari.typeDato, vari.dato?.numero);
        }
      }
    }
    const tmp = new Dato(TypeDato.INT);
    const datoLeft = nodo.opLeft?.execute(this) || new Dato(TypeDato.INT);
    const datoRight = nodo.opRight?.execute(this) || new Dato(TypeDato.INT);
    const operacion = new OperationCasteo();
    if (nodo.typeOp !== undefined) {
      const dato = operacion.getDato(datoLeft, datoRight, nodo.typeOp);
      nodo.typeDato = dato.typeDato;
      return dato;
    }
    return tmp;
  }

  visitRead(read: Read):  Dato | void {
    return new Dato(read.typeDato);
  }

  visitAsigObj(asigOb: asignacionObjec): void {
    const datos: Dato[] = [];
    asigOb.opers.forEach((arg) => {
      const dat = arg.execute(this);
      if (dat) {
        datos.push(dat);
      }
    });
    let variable: Variable | void;
    if (asigOb.global) {
      variable = asigOb.symbolTable.getByIdGlobal(asigOb.token);
    } else {
      variable = asigOb.symbolTable.getById(asigOb.token);
    }
    if (variable) {
      //dejar la pos de la variable para generar su codigo 3D
      asigOb.pos = variable.pos;
      if (`${variable.typeDato}` !== asigOb.objeto) {
        const msj = 'Tipo a asignar al objeto no es valido';
        ErrorSingleton.getInstance().push(
          new Error(
            asigOb.token.line,
            asigOb.token.column,
            asigOb.token.id,
            `${msj}`,
            TypeError.SEMANTICO
          )
        );
      }else{
        const type: string = asigOb.objeto;
        const clas = this.clases.find((cls) => cls.nombre === type);
        if (clas) {
          const tokenTm = new Token(type, asigOb.token.column, asigOb.token.line);
          const constr = clas.getConstructor(datos, tokenTm);
          if (constr) {
            //se encontro el constructor validamente XD
            asigOb.construcotrRelativo = constr;
          } else {
            const msj = 'Constructor no entonctrado en la clase';
            ErrorSingleton.getInstance().push(
              new Error(
                asigOb.token.line,
                asigOb.token.column,
                asigOb.token.id,
                `${msj}`,
                TypeError.SEMANTICO
              )
            );
          }
        } else {
          const msj = 'Tipo de la variable no encontrada en el las clases';
          ErrorSingleton.getInstance().push(
            new Error(
              asigOb.token.line,
              asigOb.token.column,
              asigOb.token.id,
              `${msj}`,
              TypeError.SEMANTICO
            )
          );
        }
      }
    }
  }

  visitDeclareObject(decOb: DeclarationObject): void {
    const pos = decOb.symbolTable.getPosition();
    if (`${decOb.typeDatoAsig}` !== 'null') {
      if (decOb.typeDato !== decOb.typeDatoAsig) {
        const msj = 'Tipo a asignar el objeto no es valido';
        ErrorSingleton.getInstance().push(
          new Error(
            decOb.token.line,
            decOb.token.column,
            decOb.token.id,
            `${msj}`,
            TypeError.SEMANTICO
          )
        );
      }
      const datos: Dato[] = [];
      decOb.ops.forEach((arg) => {
        const dat = arg.execute(this);
        if (dat) {
          datos.push(dat);
        }
      });
      const type: string = `${decOb.typeDatoAsig}`;
      const clas = this.clases.find((cls) => cls.nombre === type);
      if (clas) {
        const tokenTm = new Token(type, decOb.token.column, decOb.token.line);
        const constr = clas.getConstructor(datos, tokenTm);
        if (constr) {
          //se encontro el constructor validamente XD
          decOb.construcotrRelativo = constr;
        } else {
          const msj = 'Constructor no entonctrado en la clase';
          ErrorSingleton.getInstance().push(
            new Error(
              decOb.token.line,
              decOb.token.column,
              decOb.token.id,
              `${msj}`,
              TypeError.SEMANTICO
            )
          );
        }
      } else {
        const msj = 'Tipo de la variable no encontrada en el las clases';
        ErrorSingleton.getInstance().push(
          new Error(
            decOb.token.line,
            decOb.token.column,
            decOb.token.id,
            `${msj}`,
            TypeError.SEMANTICO
          )
        );
      }
    }
    const dato = new Dato(decOb.typeDato);
    const newVar = new Variable(
      decOb.visibilidad,
      decOb.isStatik,
      decOb.isFinal,
      decOb.typeDato,
      decOb.token.id,
      decOb.token,
      dato
    );
    newVar.pos = pos;
    decOb.pos = pos;
    decOb.symbolTable.addVariable(newVar);
  }

  visitLlamdadfun(llama: LlamadaFun): Dato | void {
    const datos: Dato[] = [];
    const dato = new Dato(TypeDato.INT, 1, '', false);
    llama.argumens.forEach((arg) => {
      const dat = arg.execute(this);
      if (dat) {
        datos.push(dat);
      }
    });
    if (llama.objeto !== '') {
      let variable;
      if (llama.global) {
        if (llama.tok) {
          variable = llama.symbolTable.getByIdGlobal(
            new Token(llama.objeto, llama.tok.column, llama.tok.line)
          );
        }
      } else {
        if (llama.tok) {
          variable = llama.symbolTable.getById(
            new Token(llama.objeto, llama.tok.column, llama.tok.line)
          );
        }
      }
      if (variable) {
        llama.posObjeto = variable.pos;
        const type: string = `${variable.typeDato}`;
        const clas = this.clases.find((cls) => cls.nombre === type);
        if (clas && llama.tok) {
          const fun = clas.getFuncion(datos, llama.tok);
          if (fun) {
            llama.funRelativa = fun;
            dato.typeDato = fun.typeRetorno;
            llama.typeDato = fun.typeRetorno;
          } else {
            const msj = 'Funcion no Existe';
            ErrorSingleton.getInstance().push(
              new Error(
                llama.tok.line,
                llama.tok.column,
                llama.objeto,
                `${msj}`,
                TypeError.SEMANTICO
              )
            );
          }
        } else {
          if (llama.tok) {
            const msj = 'Tipo de la variable no encontrada en el las clases';
            ErrorSingleton.getInstance().push(
              new Error(
                llama.tok.line,
                llama.tok.column,
                llama.objeto,
                `${msj}`,
                TypeError.SEMANTICO
              )
            );
          }
        }
      }
    } else {
      //buscar funcion en clase actual
      if (llama.tok) {
        const fun = this.claseActual.getFuncion(datos, llama.tok);
        if (fun) {
          llama.funRelativa = fun;
          dato.typeDato = fun.typeRetorno;
          llama.typeDato = fun.typeRetorno;
        } else {
          const msj = 'Funcion no Existe';
          ErrorSingleton.getInstance().push(
            new Error(
              llama.tok.line,
              llama.tok.column,
              llama.objeto,
              `${msj}`,
              TypeError.SEMANTICO
            )
          );
        }
      }
    }

    return dato;
  }

  visitLlamdadGen(llamaG: LlamadaFunGen): void {
    llamaG.funLlamada.execute(this);
  }

  visitDeclaration(dec: Declaration): void {
    const dato = dec.op?.execute(this);
    dec.typeAsignar = dato?.typeDato || TypeDato.INT;
    if (dato && dato.typeDato !== dec.typeDato && dato.typeDato !== TypeDato.NULL) {
      const msj = 'El tipo a asignar no es equivalente tipo de la variable' ;
      ErrorSingleton.getInstance().push(
        new Error(
          dec.token.line,
          dec.token.column,
          dec.token.id,
          `${msj}`,
          TypeError.SEMANTICO
        )
      );
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
    dec.pos = newVar.pos;
    dec.symbolTable.addVariable(newVar);
  }

  visitAsig(asig: Asignacion): void {
    const dato = asig.op.execute(this);
    asig.typeAsignar = dato?.typeDato || TypeDato.INT;
    let variable: Variable | void;
    if (asig.objeto !== '') {
      const tok = new Token(asig.objeto, asig.token.line, asig.token.column);
      if (asig.global) {
        variable = asig.symbolTable.getByIdGlobal(tok);
      } else {
        variable = asig.symbolTable.getByIdGlobal(tok);
      }
      return;
    }
    if (asig.global) {
      variable = asig.symbolTable.getByIdGlobal(asig.token);
    } else {
      variable = asig.symbolTable.getById(asig.token);
    }
    if (variable) {
      //dejar la pos de la variable para generar su codigo 3D
      asig.pos = variable.pos;
    }
    if (dato && variable) {
      if (variable.inizializado && variable.isFinal) {
        const msj = 'La variable es FINAL no se puede reasignar valores';
        ErrorSingleton.getInstance().push(
          new Error(
            asig.token.line,
            asig.token.column,
            asig.token.id,
            `${msj}`,
            TypeError.SEMANTICO
          )
        );
        return;
      }
      if (dato.typeDato === TypeDato.NULL) {
        return;
      }
      if (variable.typeDato !== dato.typeDato) {
        const msj = 'El dato a Asignar no es equivalente al valor esperado';
        ErrorSingleton.getInstance().push(
          new Error(
            asig.token.line,
            asig.token.column,
            asig.token.id,
            `${msj}`,
            TypeError.SEMANTICO
          )
        );
      }
    }
  }

  visitIf(ifI: IfInstruction): void {
    ifI.symbolTable.pos = ifI.symbolTable.symbolTablePadre.getPosition();
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
    elseI.symbolTable.pos = elseI.symbolTable.symbolTablePadre.getPosition();
    elseI.instructions.forEach((instru) => {
      instru.execute(this);
    });
  }

  visitWhile(whileI: WhileInstruction): void {
    whileI.symbolTable.pos = whileI.symbolTable.symbolTablePadre.getPosition();
    whileI.valorCondicion(this);
    whileI.instructions.forEach((instru) => {
      instru.execute(this);
    });
  }

  visitDoWhile(doWhileI: DoWhileInstruction): void {
    doWhileI.symbolTable.pos = doWhileI.symbolTable.symbolTablePadre.getPosition();
    doWhileI.instructions.forEach((instr) => {
      instr.execute(this);
    });
    doWhileI.valorCondicion(this);
  }

  visitSwitch(swit: SwitchInstruction): void {
    swit.validar(this);
  }

  visitCaseSwitch(caseSwitchI: CaseSwitchInstruction): void {
    caseSwitchI.symbolTable.pos = caseSwitchI.symbolTable.symbolTablePadre.getPosition();
    caseSwitchI.instructions.forEach((instr) => {
      instr.execute(this);
    });
  }

  visitfor(fo: ForInstrction): void {
    fo.symbolTable.pos = fo.symbolTable.symbolTablePadre.getPosition();
    fo.instrcInicial.execute(this);
    fo.valorCondicion(this);
    fo.instructions.forEach((instr) => {
      instr.execute(this);
    });
  }

  visitDeclareArr(dec: DeclarationArr): void {
    const pos = dec.symbolTable.getPosition();
    if(dec.indices){
      //logica para declarar un arreglo type id[][] = new type[2][2];
      if(dec.dimension !== dec.opers.length){
        const msj = 'En la declaracion del arreglo las dimensiones no coinciden';
        ErrorSingleton.getInstance().push(new Error(dec.token.line,dec.token.column,dec.token.id,`${msj}`,TypeError.SEMANTICO))  
      }else{
        const datos: Dato[] = [];
        dec.opers.forEach((op) => {
        const dat = op.execute(this);
        if (dat) {
          datos.push(dat);
        }
        });
        const indicesMax: Array<number> = [];
        for (let index = 0; index < dec.dimension; index++) {
          indicesMax.push(datos[index].numero);
        }
        const arrSimple = new Arreglo(
          dec.token,
          dec.typeDato,
          dec.visibilidad,
          dec.isStatik,
          dec.isFinal,
          dec.dimension,
          indicesMax
        );
        arrSimple.pos = pos;
        dec.pos=pos;
        dec.symbolTable.arreglos.push(arrSimple);
      }

    }else{
      const arrSimple = new Arreglo(
        dec.token,
        dec.typeDato,
        dec.visibilidad,
        dec.isStatik,
        dec.isFinal,
        dec.dimension,
      );
      arrSimple.pos = pos;
      dec.pos = pos;
      dec.symbolTable.arreglos.push(arrSimple);
    }
    //otro logica de otros casos no implementados XD
  }

  visitAsigArr(asi: AsignacionArr): void {
    const dato = asi.op.execute(this);
    asi.opers.forEach((operacion) => {
      operacion.execute(this);
    })
    if(asi.global){
      const arr = asi.symbolTable.getByIdGlobalArr(asi.token);
      if (arr) {
        asi.ArregloRealtivo = arr;
        if (arr.dimension !== asi.opers.length) {
          const msj = 'Las dimensiones de los arreglos no coinciden';
          ErrorSingleton.getInstance().push(
            new Error(asi.token.line, asi.token.column, asi.token.id, `${msj}`, TypeError.SEMANTICO)
          );
        }
        if (dato && dato.typeDato !== arr.typeDato) {
          const msj = 'El dato a asignar no es del mismo tipo que el Arreglo';
          ErrorSingleton.getInstance().push(
            new Error(asi.token.line, asi.token.column, asi.token.id, `${msj}`, TypeError.SEMANTICO)
          );
        }
      }
    }else{
      const arr = asi.symbolTable.getByIdArr(asi.token);
      if (arr) {
        asi.ArregloRealtivo = arr;
        if (arr.dimension !== asi.opers.length) {
          const msj = 'Las dimensiones de los arreglos no coinciden';
          ErrorSingleton.getInstance().push(
            new Error(asi.token.line, asi.token.column, asi.token.id, `${msj}`, TypeError.SEMANTICO)
          );
        }
        if (dato && dato.typeDato !== arr.typeDato) {
          const msj = 'El dato a asignar no es del mismo tipo que el Arreglo';
          ErrorSingleton.getInstance().push(
            new Error(asi.token.line, asi.token.column, asi.token.id, `${msj}`, TypeError.SEMANTICO)
          );
        }
      }
    }
  }

  visitFunMath(funMath: FunMath): void {
    //TODO:Method not implemented
  }

  visitSout(sout: Sout): void {
    const dato = sout.op.execute(this);
    if (dato) {
      sout.typeImprimir = dato.typeDato;
    }
  }

  visitAsigComplArr(asigCom: AsigCompletaArr): void {  
    if(asigCom.global){
      const arr = asigCom.symbolTable.getByIdGlobalArr(asigCom.token);
      if (arr) {
        asigCom.ArregloRealtivo  = arr;
        if (arr.typeDato !== asigCom.typeAsig) {
          const msj = 'Arreglo a asignar no es equivalente';
          ErrorSingleton.getInstance().push(
            new Error(asigCom.token.line, asigCom.token.column, asigCom.token.id, `${msj}`, TypeError.SEMANTICO)
          );
        }
        if (arr.dimension !== asigCom.opers.length) {
          const msj = 'Las dimensiones de los arreglos no coinciden';
          ErrorSingleton.getInstance().push(
            new Error(asigCom.token.line, asigCom.token.column, asigCom.token.id, `${msj}`, TypeError.SEMANTICO)
          );
        }else{
          const datos: Dato[] = [];
          asigCom.opers.forEach((op) => {
          const dat = op.execute(this);
            if (dat) {
              datos.push(dat);
            }
          });
          const indicesMax: Array<number> = [];
          for (let index = 0; index < asigCom.ArregloRealtivo.dimension; index++) {
            indicesMax.push(datos[index].numero);
          }
          asigCom.ArregloRealtivo.indicesMax = indicesMax;
        }
      }
    }else{
      const arr = asigCom.symbolTable.getByIdArr(asigCom.token);
      if (arr) {
        asigCom.ArregloRealtivo  = arr;
        if (arr.typeDato !== asigCom.typeAsig) {
          const msj = 'Arreglo a asignar no es equivalente';
          ErrorSingleton.getInstance().push(
            new Error(asigCom.token.line, asigCom.token.column, asigCom.token.id, `${msj}`, TypeError.SEMANTICO)
          );
        }
        if (arr.dimension !== asigCom.opers.length) {
          const msj = 'Las dimensiones de los arreglos no coinciden';
          ErrorSingleton.getInstance().push(
            new Error(asigCom.token.line, asigCom.token.column, asigCom.token.id, `${msj}`, TypeError.SEMANTICO)
          );
        }else{
          const datos: Dato[] = [];
          asigCom.opers.forEach((op) => {
          const dat = op.execute(this);
            if (dat) {
              datos.push(dat);
            }
          });
          const indicesMax: Array<number> = [];
          for (let index = 0; index < asigCom.ArregloRealtivo.dimension; index++) {
            indicesMax.push(datos[index].numero);
          }
          asigCom.ArregloRealtivo.indicesMax = indicesMax;
        }
      }
      
    }
  }

  visitNodoArr(arr: NodoArreglo): void | Dato {
    arr.ops.forEach((op) => {
      op.execute(this);
    })
    const dato = new Dato(TypeDato.INT);
    if(!arr.tok){
      return dato;
    }
    if(arr.global){
      const arrs = arr.symbolTable.getByIdGlobalArr(arr.tok);
      if(arrs){
        arr.arregloRelativo = arrs;
        dato.typeDato = arrs.typeDato;
        if(arrs.dimension !== arr.ops.length){
          const mjs = 'La dimensiones no equivalen al arreglo buscado'
          ErrorSingleton.getInstance().push(new Error(arr.tok.line,arr.tok.column,arr.tok.id,mjs,TypeError.SEMANTICO));
        }
      }
    }else{
      const arrs = arr.symbolTable.getByIdArr(arr.tok);
      if(arrs){
        arr.arregloRelativo = arrs;
        dato.typeDato = arrs.typeDato;
        if(arrs.dimension !== arr.ops.length){
          const mjs = 'La dimensiones no equivalen al arreglo buscado'
          ErrorSingleton.getInstance().push(new Error(arr.tok.line,arr.tok.column,arr.tok.id,mjs,TypeError.SEMANTICO));
        }
      }
    }


    return dato;
  }
}
