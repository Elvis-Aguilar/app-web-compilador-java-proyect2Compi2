import { ErrorSingleton } from '../../errors/error-singleton';
import { Error } from '../../errors/errors';
import { TypeError } from '../../errors/type-error';
import { Dato } from '../../table-simbol/dato';
import { TypeDato } from '../../table-simbol/type-dato';
import { TypeOperation } from './type-operation';

export class OperationCasteo {
  datoLeft!: Dato;
  datoRight!: Dato;
  typeOp!: TypeOperation;

  getDato(dato1: Dato, dato2: Dato, typeOp: TypeOperation): Dato {
    // TODO: implemetar logica
    this.datoLeft = dato1;
    this.datoRight = dato2;
    this.typeOp = typeOp;
    let resutl = new Dato(TypeDato.INTEGER);
    switch (this.typeOp) {
      case TypeOperation.SUMA:
        resutl = this.operacionSUma();
        break;
      case TypeOperation.RESTA:
        resutl = this.operacionResta();
        break;
      case TypeOperation.MULTIPLICACION:
        resutl = this.operacionMultiplicacion();
        break;
      case TypeOperation.DIVISION:
        resutl = this.operacionDivision();
        break;
      case TypeOperation.MODULO:
        resutl = this.operacionMod();
        break;
      case TypeOperation.OR:
        resutl = this.operacionOR();
        break;
      case TypeOperation.AND:
        resutl = this.operacionAND();
        break;
      case TypeOperation.EQUALS:
        resutl = this.operacionEquals();
        break;
      case TypeOperation.DIFERENTE:
        resutl = this.operacionDiferente();
        break;
      case TypeOperation.MAYORQ:
        resutl = this.operacionMayorQ();
        break;
      case TypeOperation.MAYOROI:
        resutl = this.operacionMayorIgual();
        break;
      case TypeOperation.MENORQ:
        resutl = this.operacionMenorQ();
        break;
      case TypeOperation.MENOROI:
        resutl = this.operacionMenorIgual();
    }

    return resutl;
  }

  private operacionSUma(): Dato {
    let datoResult = new Dato(TypeDato.INTEGER);

    switch (this.datoLeft.typeDato) {
      case TypeDato.STRING:
        datoResult.typeDato = TypeDato.STRING;
        datoResult.cadena = this.sumaStringDato();
        break;
      case TypeDato.BOOLEAN:
        datoResult.typeDato = TypeDato.BOOLEAN;
        datoResult.booleano = this.sumaBooleanDato();
        break;
      case TypeDato.CHAR:
        datoResult.typeDato = TypeDato.CHAR;
        datoResult.cadena = this.sumaCharDato();
        break;
      case TypeDato.FLOAT:
        datoResult.typeDato = TypeDato.FLOAT;
        datoResult.numero = this.sumaDecimalDato();
        break;
      default:
        datoResult.typeDato = TypeDato.INTEGER;
        datoResult.numero = this.sumaEnteroDato();
        break;
    }

    return datoResult;
  }

  private operacionResta(): Dato {
    let datoResult = new Dato(TypeDato.INTEGER);

    if (this.datoLeft.typeDato == TypeDato.FLOAT) {
      switch (this.datoRight.typeDato) {
        case TypeDato.STRING:
          ErrorSingleton.getInstance().push(
            new Error(
              this.datoRight.token.line,
              this.datoRight.token.column,
              this.datoRight.cadena,
              'Error no se puede restar una string a un numero',
              TypeError.SEMANTICO
            )
          );

          break;
        case TypeDato.BOOLEAN:
          let tmp = this.datoRight.booleano ? 1 : 0;
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero = this.datoLeft.numero - tmp;
          return datoResult;
          break;
        case TypeDato.CHAR:
          let tmpc = this.datoRight.cadena;
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero =
            this.datoLeft.numero - parseInt(this.datoRight.cadena);
          break;
        case TypeDato.FLOAT:
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero = this.datoLeft.numero - this.datoRight.numero;
          break;
        default:
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero = this.datoLeft.numero - this.datoRight.numero;

          break;
      }
    }

    if (this.datoLeft.typeDato == TypeDato.INTEGER) {
      switch (this.datoRight.typeDato) {
        case TypeDato.STRING:
          ErrorSingleton.getInstance().push(
            new Error(
              this.datoRight.token.line,
              this.datoRight.token.column,
              this.datoRight.cadena,
              'Error no se puede restar una string a un numero',
              TypeError.SEMANTICO
            )
          );

          break;
        case TypeDato.BOOLEAN:
          let tmp = this.datoRight.booleano ? 1 : 0;
          datoResult.numero = Math.trunc(this.datoLeft.numero - tmp);
          return datoResult;
          break;
        case TypeDato.CHAR:
          let tmpc = this.datoRight.cadena;
          datoResult.numero = Math.trunc(
            this.datoLeft.numero - parseInt(this.datoRight.cadena)
          );
          break;
        case TypeDato.FLOAT:
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero = this.datoLeft.numero - this.datoRight.numero;
          break;
        default:
          datoResult.numero = this.datoLeft.numero - this.datoRight.numero;

          break;
      }
    }

    return datoResult;
  }

  private operacionMultiplicacion(): Dato {
    let datoResult = new Dato(TypeDato.INTEGER);

    if (this.datoLeft.typeDato == TypeDato.FLOAT) {
      switch (this.datoRight.typeDato) {
        case TypeDato.STRING:
          ErrorSingleton.getInstance().push(
            new Error(
              this.datoRight.token.line,
              this.datoRight.token.column,
              this.datoRight.cadena,
              'Error no se puede multiplicar un string con un numero',
              TypeError.SEMANTICO
            )
          );

          break;
        case TypeDato.BOOLEAN:
          let tmp = this.datoRight.booleano ? 1 : 0;
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero = this.datoLeft.numero * tmp;
          return datoResult;
          break;
        case TypeDato.CHAR:
          let tmpc = this.datoRight.cadena;
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero =
            this.datoLeft.numero * parseInt(this.datoRight.cadena);
          break;
        case TypeDato.FLOAT:
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero = this.datoLeft.numero * this.datoRight.numero;
          break;
        default:
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero = this.datoLeft.numero * this.datoRight.numero;

          break;
      }
    }

    if (this.datoLeft.typeDato == TypeDato.INTEGER) {
      switch (this.datoRight.typeDato) {
        case TypeDato.STRING:
          ErrorSingleton.getInstance().push(
            new Error(
              this.datoRight.token.line,
              this.datoRight.token.column,
              this.datoRight.cadena,
              'Error no se puede multiplicar un string con un numero',
              TypeError.SEMANTICO
            )
          );

          break;
        case TypeDato.BOOLEAN:
          let tmp = this.datoRight.booleano ? 1 : 0;
          datoResult.numero = Math.trunc(this.datoLeft.numero * tmp);
          return datoResult;
          break;
        case TypeDato.CHAR:
          let tmpc = this.datoRight.cadena;
          datoResult.numero = Math.trunc(
            this.datoLeft.numero * parseInt(this.datoRight.cadena)
          );
          break;
        case TypeDato.FLOAT:
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero = this.datoLeft.numero * this.datoRight.numero;
          break;
        default:
          datoResult.numero = this.datoLeft.numero * this.datoRight.numero;

          break;
      }
    }

    return datoResult;
  }

  operacionDivision(): Dato {
    let datoResult = new Dato(TypeDato.INTEGER);

    if (this.datoLeft.typeDato == TypeDato.FLOAT) {
      switch (this.datoRight.typeDato) {
        case TypeDato.STRING:
          ErrorSingleton.getInstance().push(
            new Error(
              this.datoRight.token.line,
              this.datoRight.token.column,
              this.datoRight.cadena,
              'Error no se puede dividir un string con un numero',
              TypeError.SEMANTICO
            )
          );

          break;
        case TypeDato.BOOLEAN:
          let tmp = this.datoRight.booleano ? 1 : 0;
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero = this.datoLeft.numero / tmp;
          return datoResult;
          break;
        case TypeDato.CHAR:
          let tmpc = this.datoRight.cadena;
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero =
            this.datoLeft.numero / parseInt(this.datoRight.cadena);
          break;
        case TypeDato.FLOAT:
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero = this.datoLeft.numero / this.datoRight.numero;
          break;
        default:
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero = this.datoLeft.numero / this.datoRight.numero;

          break;
      }
    }

    if (this.datoLeft.typeDato == TypeDato.INTEGER) {
      switch (this.datoRight.typeDato) {
        case TypeDato.STRING:
          ErrorSingleton.getInstance().push(
            new Error(
              this.datoRight.token.line,
              this.datoRight.token.column,
              this.datoRight.cadena,
              'Error no se puede dividir un string con un numero',
              TypeError.SEMANTICO
            )
          );

          break;
        case TypeDato.BOOLEAN:
          let tmp = this.datoRight.booleano ? 1 : 0;
          datoResult.numero = Math.trunc(this.datoLeft.numero / tmp);
          return datoResult;
          break;
        case TypeDato.CHAR:
          let tmpc = this.datoRight.cadena;
          datoResult.numero = Math.trunc(
            this.datoLeft.numero / parseInt(this.datoRight.cadena)
          );
          break;
        case TypeDato.FLOAT:
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero = this.datoLeft.numero / this.datoRight.numero;
          break;
        default:
          datoResult.numero = this.datoLeft.numero / this.datoRight.numero;

          break;
      }
    }

    return datoResult;
  }

  operacionMod(): Dato {
    let datoResult = new Dato(TypeDato.INTEGER);

    if (this.datoLeft.typeDato == TypeDato.FLOAT) {
      switch (this.datoRight.typeDato) {
        case TypeDato.STRING:
          ErrorSingleton.getInstance().push(
            new Error(
              this.datoRight.token.line,
              this.datoRight.token.column,
              this.datoRight.cadena,
              'Error no se puede realizar % a  un string o a un numero',
              TypeError.SEMANTICO
            )
          );

          break;
        case TypeDato.BOOLEAN:
          let tmp = this.datoRight.booleano ? 1 : 0;
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero = this.datoLeft.numero % tmp;
          return datoResult;
          break;
        case TypeDato.CHAR:
          let tmpc = this.datoRight.cadena;
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero =
            this.datoLeft.numero % parseInt(this.datoRight.cadena);
          break;
        case TypeDato.FLOAT:
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero = this.datoLeft.numero % this.datoRight.numero;
          break;
        default:
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero = this.datoLeft.numero % this.datoRight.numero;

          break;
      }
    }

    if (this.datoLeft.typeDato == TypeDato.INTEGER) {
      switch (this.datoRight.typeDato) {
        case TypeDato.STRING:
          ErrorSingleton.getInstance().push(
            new Error(
              this.datoRight.token.line,
              this.datoRight.token.column,
              this.datoRight.cadena,
              'Error no se puede realizar % a  un string o a un numero',
              TypeError.SEMANTICO
            )
          );
          break;
        case TypeDato.BOOLEAN:
          let tmp = this.datoRight.booleano ? 1 : 0;
          datoResult.numero = Math.trunc(this.datoLeft.numero % tmp);
          return datoResult;
          break;
        case TypeDato.CHAR:
          let tmpc = this.datoRight.cadena;
          datoResult.numero = Math.trunc(
            this.datoLeft.numero % parseInt(this.datoRight.cadena)
          );
          break;
        case TypeDato.FLOAT:
          datoResult.typeDato = TypeDato.FLOAT;
          datoResult.numero = this.datoLeft.numero % this.datoRight.numero;
          break;
        default:
          datoResult.numero = this.datoLeft.numero % this.datoRight.numero;

          break;
      }
    }

    return datoResult;
  }

  private operacionOR(): Dato {
    let datoResult = new Dato(TypeDato.BOOLEAN);

    if (
      this.datoLeft.typeDato == TypeDato.BOOLEAN &&
      this.datoRight.typeDato == TypeDato.BOOLEAN
    ) {
      datoResult.booleano = this.datoLeft.booleano || this.datoRight.booleano;
    } else {
      ErrorSingleton.getInstance().push(
        new Error(
          this.datoRight.token.line,
          this.datoRight.token.column,
          this.datoRight.cadena,
          'El operador OR solo puede comparar expresiones booleanas',
          TypeError.SEMANTICO
        )
      );
    }

    return datoResult;
  }

  private operacionAND(): Dato {
    let datoResult = new Dato(TypeDato.BOOLEAN);

    if (
      this.datoLeft.typeDato == TypeDato.BOOLEAN &&
      this.datoRight.typeDato == TypeDato.BOOLEAN
    ) {
      datoResult.booleano = this.datoLeft.booleano && this.datoRight.booleano;
    } else {
      ErrorSingleton.getInstance().push(
        new Error(
          this.datoRight.token.line,
          this.datoRight.token.column,
          this.datoRight.cadena,
          'El operador OR solo puede comparar expresiones booleanas',
          TypeError.SEMANTICO
        )
      );
    }

    return datoResult;
  }

  private operacionEquals(): Dato {
    let datoResult = new Dato(TypeDato.BOOLEAN);
    switch (this.datoLeft.typeDato) {
      case TypeDato.INTEGER:
        switch (this.datoRight.typeDato) {
          case TypeDato.INTEGER:
            datoResult.booleano = this.datoLeft.numero == this.datoRight.numero;
            break;
          case TypeDato.FLOAT:
            datoResult.booleano = this.datoLeft.numero == this.datoRight.numero;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                '==',
                'El operador == solo puede comparar enteros y decimales entre si',
                TypeError.SEMANTICO
              )
            );

            break;
        }
        break;
      case TypeDato.FLOAT:
        switch (this.datoRight.typeDato) {
          case TypeDato.INTEGER:
            datoResult.booleano = this.datoLeft.numero == this.datoRight.numero;
            break;
          case TypeDato.FLOAT:
            datoResult.booleano = this.datoLeft.numero == this.datoRight.numero;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador == solo puede comparar enteros y decimales entre si',
                TypeError.SEMANTICO
              )
            );

            break;
        }

        break;
      case TypeDato.STRING:
        switch (this.datoRight.typeDato) {
          case TypeDato.STRING:
            datoResult.booleano = this.datoLeft.cadena == this.datoRight.cadena;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador == solo puede comparar strings con strings',
                TypeError.SEMANTICO
              )
            );

            break;
        }

        break;
      case TypeDato.CHAR:
        switch (this.datoRight.typeDato) {
          case TypeDato.STRING:
            datoResult.booleano = this.datoLeft.cadena == this.datoRight.cadena;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador == solo puede comparar chars con chars',
                TypeError.SEMANTICO
              )
            );

            break;
        }

        break;
      case TypeDato.BOOLEAN:
        switch (this.datoRight.typeDato) {
          case TypeDato.BOOLEAN:
            datoResult.booleano =
              this.datoLeft.booleano == this.datoRight.booleano;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador == solo puede comparar booleans con booleans',
                TypeError.SEMANTICO
              )
            );

            break;
        }
        break;

      default:
        break;
    }

    return datoResult;
  }

  private operacionDiferente(): Dato {
    let datoResult = new Dato(TypeDato.BOOLEAN);
    switch (this.datoLeft.typeDato) {
      case TypeDato.INTEGER:
        switch (this.datoRight.typeDato) {
          case TypeDato.INTEGER:
            datoResult.booleano = this.datoLeft.numero != this.datoRight.numero;
            break;
          case TypeDato.FLOAT:
            datoResult.booleano = this.datoLeft.numero != this.datoRight.numero;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador == solo puede comparar enteros y decimales entre si',
                TypeError.SEMANTICO
              )
            );

            break;
        }
        break;
      case TypeDato.FLOAT:
        switch (this.datoRight.typeDato) {
          case TypeDato.INTEGER:
            datoResult.booleano = this.datoLeft.numero != this.datoRight.numero;
            break;
          case TypeDato.FLOAT:
            datoResult.booleano = this.datoLeft.numero != this.datoRight.numero;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador == solo puede comparar enteros y decimales entre si',
                TypeError.SEMANTICO
              )
            );

            break;
        }

        break;
      case TypeDato.STRING:
        switch (this.datoRight.typeDato) {
          case TypeDato.STRING:
            datoResult.booleano = this.datoLeft.cadena != this.datoRight.cadena;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador == solo puede comparar strings con strings',
                TypeError.SEMANTICO
              )
            );

            break;
        }

        break;
      case TypeDato.CHAR:
        switch (this.datoRight.typeDato) {
          case TypeDato.STRING:
            datoResult.booleano = this.datoLeft.cadena != this.datoRight.cadena;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador == solo puede comparar chars con chars',
                TypeError.SEMANTICO
              )
            );

            break;
        }

        break;
      case TypeDato.BOOLEAN:
        switch (this.datoRight.typeDato) {
          case TypeDato.BOOLEAN:
            datoResult.booleano =
              this.datoLeft.booleano != this.datoRight.booleano;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador == solo puede comparar booleans con booleans',
                TypeError.SEMANTICO
              )
            );

            break;
        }
        break;

      default:
        break;
    }

    return datoResult;
  }

  private operacionMayorQ(): Dato {
    let datoResult = new Dato(TypeDato.BOOLEAN);
    switch (this.datoLeft.typeDato) {
      case TypeDato.INTEGER:
        switch (this.datoRight.typeDato) {
          case TypeDato.INTEGER:
            datoResult.booleano = this.datoLeft.numero > this.datoRight.numero;
            break;
          case TypeDato.FLOAT:
            datoResult.booleano = this.datoLeft.numero > this.datoRight.numero;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador > solo puede comparar int y float',
                TypeError.SEMANTICO
              )
            );

            break;
        }
        break;
      case TypeDato.FLOAT:
        switch (this.datoRight.typeDato) {
          case TypeDato.INTEGER:
            datoResult.booleano = this.datoLeft.numero > this.datoRight.numero;
            break;
          case TypeDato.FLOAT:
            datoResult.booleano = this.datoLeft.numero > this.datoRight.numero;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador > solo puede comparar int y float',
                TypeError.SEMANTICO
              )
            );

            break;
        }

        break;
      case TypeDato.STRING:
        switch (this.datoRight.typeDato) {
          case TypeDato.STRING:
            datoResult.booleano = this.datoLeft.cadena > this.datoRight.cadena;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador > solo puede compar entre cadenas',
                TypeError.SEMANTICO
              )
            );

            break;
        }
        break;

      default:
        ErrorSingleton.getInstance().push(
          new Error(
            this.datoLeft.token.line,
            this.datoLeft.token.column,
            this.datoLeft.token.id,
            'Error la comparacion no se puedo efectuar',
            TypeError.SEMANTICO
          )
        );

        break;
    }

    return datoResult;
  }

  private operacionMenorQ(): Dato {
    let datoResult = new Dato(TypeDato.BOOLEAN);
    switch (this.datoLeft.typeDato) {
      case TypeDato.INTEGER:
        switch (this.datoRight.typeDato) {
          case TypeDato.INTEGER:
            datoResult.booleano = this.datoLeft.numero < this.datoRight.numero;
            break;
          case TypeDato.FLOAT:
            datoResult.booleano = this.datoLeft.numero < this.datoRight.numero;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador > solo puede comparar int y float',
                TypeError.SEMANTICO
              )
            );

            break;
        }
        break;
      case TypeDato.FLOAT:
        switch (this.datoRight.typeDato) {
          case TypeDato.INTEGER:
            datoResult.booleano = this.datoLeft.numero < this.datoRight.numero;
            break;
          case TypeDato.FLOAT:
            datoResult.booleano = this.datoLeft.numero < this.datoRight.numero;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador > solo puede comparar int y float',
                TypeError.SEMANTICO
              )
            );

            break;
        }

        break;
      case TypeDato.STRING:
        switch (this.datoRight.typeDato) {
          case TypeDato.STRING:
            datoResult.booleano = this.datoLeft.cadena < this.datoRight.cadena;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador > solo puede compar entre cadenas',
                TypeError.SEMANTICO
              )
            );

            break;
        }
        break;

      default:
        ErrorSingleton.getInstance().push(
          new Error(
            this.datoLeft.token.line,
            this.datoLeft.token.column,
            this.datoLeft.token.id,
            'Error la comparacion no se puedo efectuar',
            TypeError.SEMANTICO
          )
        );

        break;
    }
    return datoResult;
  }

  private operacionMayorIgual(): Dato {
    let datoResult = new Dato(TypeDato.BOOLEAN);
    switch (this.datoLeft.typeDato) {
      case TypeDato.INTEGER:
        switch (this.datoRight.typeDato) {
          case TypeDato.INTEGER:
            datoResult.booleano = this.datoLeft.numero >= this.datoRight.numero;
            break;
          case TypeDato.FLOAT:
            datoResult.booleano = this.datoLeft.numero >= this.datoRight.numero;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador > solo puede comparar int y float',
                TypeError.SEMANTICO
              )
            );

            break;
        }
        break;
      case TypeDato.FLOAT:
        switch (this.datoRight.typeDato) {
          case TypeDato.INTEGER:
            datoResult.booleano = this.datoLeft.numero >= this.datoRight.numero;
            break;
          case TypeDato.FLOAT:
            datoResult.booleano = this.datoLeft.numero >= this.datoRight.numero;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador > solo puede comparar int y float',
                TypeError.SEMANTICO
              )
            );

            break;
        }

        break;
      case TypeDato.STRING:
        switch (this.datoRight.typeDato) {
          case TypeDato.STRING:
            datoResult.booleano = this.datoLeft.cadena >= this.datoRight.cadena;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador > solo puede compar entre cadenas',
                TypeError.SEMANTICO
              )
            );

            break;
        }
        break;

      default:
        ErrorSingleton.getInstance().push(
          new Error(
            this.datoLeft.token.line,
            this.datoLeft.token.column,
            this.datoLeft.token.id,
            'Error la comparacion no se puedo efectuar',
            TypeError.SEMANTICO
          )
        );

        break;
    }

    return datoResult;
  }

  private operacionMenorIgual(): Dato {
    let datoResult = new Dato(TypeDato.BOOLEAN);
    switch (this.datoLeft.typeDato) {
      case TypeDato.INTEGER:
        switch (this.datoRight.typeDato) {
          case TypeDato.INTEGER:
            datoResult.booleano = this.datoLeft.numero <= this.datoRight.numero;
            break;
          case TypeDato.FLOAT:
            datoResult.booleano = this.datoLeft.numero <= this.datoRight.numero;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador > solo puede comparar int y float',
                TypeError.SEMANTICO
              )
            );

            break;
        }
        break;
      case TypeDato.FLOAT:
        switch (this.datoRight.typeDato) {
          case TypeDato.INTEGER:
            datoResult.booleano = this.datoLeft.numero <= this.datoRight.numero;
            break;
          case TypeDato.FLOAT:
            datoResult.booleano = this.datoLeft.numero <= this.datoRight.numero;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador > solo puede comparar int y float',
                TypeError.SEMANTICO
              )
            );

            break;
        }

        break;
      case TypeDato.STRING:
        switch (this.datoRight.typeDato) {
          case TypeDato.STRING:
            datoResult.booleano = this.datoLeft.cadena <= this.datoRight.cadena;
            break;

          default:
            ErrorSingleton.getInstance().push(
              new Error(
                this.datoLeft.token.line,
                this.datoLeft.token.column,
                this.datoLeft.token.id,
                'El operador > solo puede compar entre cadenas',
                TypeError.SEMANTICO
              )
            );

            break;
        }
        break;

      default:
        ErrorSingleton.getInstance().push(
          new Error(
            this.datoLeft.token.line,
            this.datoLeft.token.column,
            this.datoLeft.token.id,
            'Error la comparacion no se puedo efectuar',
            TypeError.SEMANTICO
          )
        );

        break;
    }
    return datoResult;
  }

  private sumaStringDato(): string {
    switch (this.datoRight.typeDato) {
      case TypeDato.STRING:
        return this.datoLeft.cadena + this.datoRight.cadena;
        break;
      case TypeDato.BOOLEAN:
        let tmp = this.datoRight.booleano ? 'verdadero' : 'falso';
        return this.datoLeft + tmp;
        break;
      case TypeDato.CHAR:
        return this.datoLeft.cadena + this.datoRight.cadena;
        break;
      case TypeDato.FLOAT:
        return this.datoLeft.cadena + this.datoRight.cadena;
        break;
      default:
        return this.datoLeft.cadena + this.datoRight.cadena;
        break;
    }
  }

  private sumaBooleanDato(): boolean {
    // ErrorSingleton.getInstance().push(new Error(this.datoLeft.token.line, );
    ErrorSingleton.getInstance().push(
      new Error(
        this.datoLeft.token.line,
        this.datoLeft.token.column,
        this.datoLeft.booleano.toString(),
        'Error no se puede sumar un boolean a otro tipo de dato',
        TypeError.SEMANTICO
      )
    );

    return this.datoLeft.booleano ? true : false;
  }

  private sumaCharDato(): string {
    ErrorSingleton.getInstance().push(
      new Error(
        this.datoLeft.token.line,
        this.datoLeft.token.column,
        this.datoLeft.cadena,
        'Error no se puede sumar un char a otro tipo de dato',
        TypeError.SEMANTICO
      )
    );

    return this.datoLeft.cadena;
  }

  private sumaDecimalDato(): number {
    switch (this.datoRight.typeDato) {
      case TypeDato.STRING:
        ErrorSingleton.getInstance().push(
          new Error(
            this.datoRight.token.line,
            this.datoRight.token.column,
            this.datoRight.numero.toString(),
            'Error no se puede sumar un float a otro tipo de dato',
            TypeError.SEMANTICO
          )
        );
        return this.datoRight.numero;
        break;
      case TypeDato.BOOLEAN:
        let tmp = this.datoRight.booleano ? 1 : 0;
        return this.datoLeft.numero + tmp;
        break;
      case TypeDato.CHAR:
        return this.datoLeft.numero + parseInt(this.datoRight.cadena);
        break;
      case TypeDato.FLOAT:
        return this.datoLeft.numero + this.datoRight.numero;
        break;

      default:
        return this.datoLeft.numero + this.datoRight.numero;
        break;
    }
  }

  private sumaEnteroDato(): number {
    switch (this.datoRight.typeDato) {
      case TypeDato.STRING:
        ErrorSingleton.getInstance().push(
          new Error(
            this.datoRight.token.line,
            this.datoRight.token.column,
            this.datoRight.numero.toString(),
            'Error no se puede sumar un string con un numero',
            TypeError.SEMANTICO
          )
        );
        return this.datoRight.numero;
        break;
      case TypeDato.BOOLEAN:
        let tmp = this.datoRight.booleano ? 1 : 0;
        return this.datoLeft.numero + tmp;
        break;
      case TypeDato.CHAR:
        return this.datoLeft.numero + parseInt(this.datoRight.cadena);
        break;
      case TypeDato.FLOAT:
        return Math.trunc(this.datoLeft.numero + this.datoRight.numero);
        break;
      default:
        return this.datoLeft.numero + this.datoRight.numero;
        break;
    }
  }
}
