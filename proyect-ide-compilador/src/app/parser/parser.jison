/*codigo javascript, como variables, o funciones*/
%{

%}

/* lexical grammar */
%lex
/*macro-tockens expresiones regulares para usarlos en token compuestos*/
entero              [0]|[1-9][0-9]*
decimal             {integer}(\.[0-9]+)

//para comentarios 
lineTerminator      \r|\n|\r\n
whitespace          {lineTerminator}|[ \t\f]

//palabras reservadas
int                 "int"
float               "float"
string              "string"
char                "CHAR"  
boolean             "BOOLEAN"
import              "import"
public              "public"
private             "private"
class               "class"
final               "final"
static              "static"
void                "void"
main                "main"
package             "package"
protected           "protected"   
getter              "@Getter"
setter              "@Setter"
System              "System"
out                 "out"
println             "println"
print               "print"

//operadores de clase Math
math                "Math"


//bifurcaciones
if                  "if"
else                "else"
switch              "switch"
case                "case"
break               "break"          
default             "default"
while               "while"
do                  "do"


/* operators */

//incremento decremento
incre                           "++"
decre                           "--"

//aritmeticos
mas 						  	            "+"
menos 						  	          "-"
por 			  				            "*"
division		  				          "/"
modulo                          "%"

//relacionales
mayorOI                         ">="
menorOI                         "<="
mayorQ                          ">"
menorQ                          "<"
equals                          "=="
diferente                       "!="

//logicos
and                             "&&"
or                              "||"
not                             "!"


/*otros signos (puntuacion, parentesis, corchet,,etc)*/
coma                            ","
parentesisA                     "("
parentesisC                     ")"
puntoComa                       ";"
dosPunto                        ":"
igual                           "="
punto                           "."
llaveA                          "{"
llaveC                          "}"
corchetA                        "["
corchetC                        "]"


/*id*/
id                  [a-zA-Z_][a-zA-Z_0-9]*


%options case-sensitive

/*%% gramatica lexica */
%%

{whitespace}                /* skip */
{entero}                    return "ENTERO"
{decimal}                   return "DECIMAL"
{incre}                     return "INCRE"
{decre}                     return "DECRE"
{mas} 						          return "MAS"
{menos} 					          return "MENOS"
{por} 			  			        return "POR"
{division}		  			      return "DIVISION"
{modulo}                    return "MODULO"
{mayorOI}                   return "MAYOROI"                          
{menorOI}                   return "MENOROI"
{mayorQ}                    return "MAYORQ"                          
{menorQ}                    return "MENORQ"                          
{equals}                    return "EQUALS"                          
{diferente}                 return "DIFERENTE"                         
{and}                       return "AND"
{or}                        return "OR"
{not}                       return "NOT"     
{coma}                      return "COMA"                   
{parentesisA}               return "PARENTESA"                            
{parentesisC}               return "PARENTESC"                                
{puntoComa}                 return "PUNTOCOMA" 
{dosPunto}                  return "DOSPUNTO"                           
{igual}                     return "IGUAL" 
{int}                       return "INT" 
{float}                     return "FLOAT"
{char}                      return "CHAR"
{boolean}                   return "BOOLEAN"
{string}                    return "STRING"
{import}                    return "IMPORT"
{public}                    return "PUBLIC"
{private}                   return "PRIVATE"
{protected}                 return "PROTECTED"
{class}                     return "CLASS"
{final}                     return "FINAL"
{static}                    return "STATIC"
{void}                      return "VOID"
{main}                      return "MAIN"
{package}                   return "PACKAGE"
{punto}                     return "PUNTO"
{llaveA}                    return "LLAVEA"
{llaveC}                    return "LLAVEC"
{corchetA}                  return "CORCHETA"
{corchetC}                  return "CORCHETAC"
{getter}                    return "GETTER"
{setter}                    return "SETTER"
{System}                    return "SYSTEM"
{out}                       return "OUT"
{println}                   return "PRINTLN"
{print}                     return "PRINT"
{if}                        return "IF"
{else}                      return "ELSE"
{switch}                    return "SWITCH"
{case}                      return "CASE"
{break}                     return "BREAK"          
{default}                   return "DEFAULT"
{while}                     return "WHILE"
{do}                        return "DO"

/* id */
{id}                        return "ID"
/*final*/
<<EOF>>                     return "EOF"
/*manejo de errores*/
.                            { yy.Errores.push(new yy.ErrorSintx(yylloc.last_line, yylloc.last_column, yytext,"Lexema No reconocido por el analizador Lexico",yy.TypeError.LEXICO));}

/lex

/*configuracion de precedencia*/
%left OR
%left AND
%left EQUALS DIFERENTE MAYORQ MAYOROI MENORQ MENOROI
%left MAS MENOS 
%left POR DIVISION MODULO



//produccion incial
%start initial
%error

%%

initial
  : program  EOF           { return $1; }
  ;

/*gramatica para un archivo valido: impor ... class || class*/
program 
    : pack imprts clase
    ;


/*gramatica para definir el package*/
pack 
  : PACKAGE ids_imprt PUNTOCOMA
  | 
  ;

/*gramatica para importaciones: import id.id.id.*; || import id.*; || id.id; || id;*/
imprts
    : imprts imprt
    |
    ;

imprt
    : IMPORT ids_imprt term_imprt
    ;

ids_imprt 
    : ids_imprt PUNTO ID
    | ID
    ;
  
term_imprt
    : PUNTO POR PUNTOCOMA
    | PUNTOCOMA 
    ;

/*gramatica para clases: public class id {...} || class id {...}*/
clase 
  : visi_class CLASS ID LLAVEA sente_glos LLAVEC
  ; 

visi_class 
    : PUBLIC FINAL
    | PUBLIC
    |  
    ;

/*sentencias globales*/
sente_glos 
    : sente_glos sent_glo
    | 
    ;

sent_glo 
    : declar_var_glo
    | fun
    | main_fun
    | getSet PUNTOCOMA
    ;


/*declaracion variable global*/
declar_var_glo
    : agrup items PUNTOCOMA
    | getSet agrup items PUNTOCOMA
    ;

getSet
  : GETTER SETTER
  | SETTER GETTER
  | GETTER
  | SETTER
  ;

statc
  : STATIC
  |
  ;

/*gramatica para delcarar funciones*/
fun
  : agrup ID PARENTESA paramets PARENTESC LLAVEA sentencias LLAVEC
  | agrup PARENTESA paramets PARENTESC LLAVEA sentencias LLAVEC         //constructor validar
  ;

paramets
    : params
    |
    ;

params
  : params COMA param
  | param
  ;

param 
  : type ID
  | ID ID
  ; 


/*funcion main, aqui se validara el stack y desde aqui se iniciara la compilacion*/
main_fun 
    : agrup MAIN PARENTESA  PARENTESC LLAVEA sentencias LLAVEC        
    ;

visi
  : PUBLIC
  | PRIVATE
  | PROTECTED
  | 
  ;

type
    : INT
    | FLOAT
    | BOOLEAN
    | CHAR
    | VOID                 // void valido solo en funciones
    ;

agrup
  : visi statc type
  | visi statc ID                  //se usa un id para refernciar  objetos
  ;

/*sentencias de instrucciones internas, para funciones y anidadas en bifurcaciones*/
sentencias
    : sentencias sentencia    {$$ = $1; $$.push($2);}
    |                         {$$ = []; }
    ;

sentencia
    : declaracion_var         {$$ =$1;}
    | asig 
    | oput 
    | def_if_complete
    | def_switch
    | BREAK PUNTOCOMA   
    | def_while  
    | def_do_while  
    ;

/*gramatica para declaracion de variables anidadas*/
declaracion_var 
            : type items  PUNTOCOMA      {$$ = new yy.Declaration($2, new yy.Operation($4));}
            ;

items 
    : items COMA ID {$$ =""+ $1+" , "+" > "+ $3+" < ";}
    | items COMA ID IGUAL exp 
    | ID IGUAL exp           {$$ = new yy.Token($1,this._$.first_column, this._$.first_line);}
    | ID
    ;

/*gramatica para asignacion de variables*/
asig 
  : ID IGUAL exp PUNTOCOMA
  ;

/*grmatica para system.out.print*/
oput
  : SYSTEM PUNTO OUT PUNTO PRINTLN PARENTESA exp PARENTESC PUNTOCOMA
  | SYSTEM PUNTO OUT PUNTO PRINT PARENTESA exp PARENTESC PUNTOCOMA
  ;


/*definicion de un if, if else, if elseif else*/
def_if_complete 
    : def_if                                                                
    | def_if def_else                                               
    | def_if  def_else_if                                              
    ;

/*Gramatica para if  */
def_if 
    : IF PARENTESA exp PARENTESC LLAVEA sentencias LLAVEC
    ;

/*Gramatica para ELSE  */
def_else 
    : ELSE LLAVEA sentencias LLAVEC                                                 
    ;

/*Gramatica para ELSE_if  */
def_else_if 
    : ELSE def_if                                                                                                                                       
    | ELSE def_if def_else
    | ELSE def_if def_else_if                                       
    ;

/*Gramatica para switch  */
def_switch 
    : SWITCH PARENTESA ID PARENTESC LLAVEA cases LLAVEC                           
    ;

/*Gramatica para casos dentro del switch  */
cases 
    : caso_sw BREAK PUNTOCOMA cases                                                               
    |                                                                                               
    ;

/*Gramatica para casos */
caso_sw 
    : CASE ter_exp DOSPUNTO sentencias_sw                                 
    | DEFAULT DOSPUNTO sentencias_sw                                                  
    ;

/*Gramatica para sentencias, pueden venir dentro de una funcion o metodo */
sentencias_sw 
  : sentencias_sw sentencia_sw                                          
  |                                                                                        
  ;

sentencia_sw
    : declaracion_var         
    | asig 
    | oput 
    | def_if_complete 
    | def_while
    | def_do_while      
    ;


/*Gramatica para while  */
def_while 
  : WHILE PARENTESA exp PARENTESC LLAVEA sentencias LLAVEC                                            {:RESULT = new SentenciaWhile((ArrayList<Instruccions> )sent, (Operation) cond, new TablaSimbol(errorsSemanticos));:}               
  ;

/*Gramatica para do_while  */
def_do_while 
    : DO LLAVEA sentencias LLAVEC WHILE PARENTESA exp PARENTESC PUNTOCOMA                            {:RESULT = new SentenciaDoWhile((ArrayList<Instruccions> )sent, (Operation) cond, new TablaSimbol(errorsSemanticos));:}          
    ;

/*gramatica para expresiones*/
exp 
  : exp MAS exp                             {$$ = new yy.NodoOperation(null, $1, $3, yy.TypeOperation.SUMA, new yy.Token($2,this._$.first_column, this._$.first_line));}       
  | exp MENOS exp                           {$$ = new yy.NodoOperation(null, $1, $3, yy.TypeOperation.RESTA, new yy.Token($2,this._$.first_column, this._$.first_line));}
  | exp POR exp                             {$$ = new yy.NodoOperation(null, $1, $3, yy.TypeOperation.MULTIPLICACION, new yy.Token($2,this._$.first_column, this._$.first_line));}
  | exp DIVISION exp                        {$$ = new yy.NodoOperation(null, $1, $3, yy.TypeOperation.DIVISION, new yy.Token($2,this._$.first_column, this._$.first_line));}  
  | exp MODULO exp                          {$$ = new yy.NodoOperation(null, $1, $3, yy.TypeOperation.MODULO, new yy.Token($2,this._$.first_column, this._$.first_line));}
  | exp EQUALS exp                          {$$ = new yy.NodoOperation(null, $1, $3, yy.TypeOperation.EQUALS, new yy.Token($2,this._$.first_column, this._$.first_line));}
  | exp DIFERENTE exp                       {$$ = new yy.NodoOperation(null, $1, $3, yy.TypeOperation.DIFERENTE, new yy.Token($2,this._$.first_column, this._$.first_line));}
  | exp MAYORQ exp                          {$$ = new yy.NodoOperation(null, $1, $3, yy.TypeOperation.MAYORQ, new yy.Token($2,this._$.first_column, this._$.first_line));}
  | exp MAYOROI exp                         {$$ = new yy.NodoOperation(null, $1, $3, yy.TypeOperation.MAYOROI, new yy.Token($2,this._$.first_column, this._$.first_line));}
  | exp MENORQ exp                          {$$ = new yy.NodoOperation(null, $1, $3, yy.TypeOperation.MENORQ, new yy.Token($2,this._$.first_column, this._$.first_line));}
  | exp MENOROI exp                         {$$ = new yy.NodoOperation(null, $1, $3, yy.TypeOperation.MENOROI, new yy.Token($2,this._$.first_column, this._$.first_line));}
  | exp OR exp                              {$$ = new yy.NodoOperation(null, $1, $3, yy.TypeOperation.OR, new yy.Token($2,this._$.first_column, this._$.first_line));}
  | exp AND exp                             {$$ = new yy.NodoOperation(null, $1, $3, yy.TypeOperation.AND, new yy.Token($2,this._$.first_column, this._$.first_line));}
  | ter_exp                                 {$$ = new yy.NodoOperation($1);}
  | PARENTESA exp PARENTESC                 {$$ = new yy.NodoOperation($1);}
  ;

ter_exp
      : ENTERO        {$$ = new yy.Dato(yy.TypeDato.INTEGER, parseInt($1));}
      | DECIMAL       {$$ = new yy.Dato(yy.TypeDato.DOUBLE, parseFloat($1));}
      ;