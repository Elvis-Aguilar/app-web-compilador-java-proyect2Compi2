/*codigo javascript, como variables, o funciones*/
%{
  let claseAux;
%}

/* lexical grammar */
%lex
/*macro-tockens expresiones regulares para usarlos en token compuestos*/
decimal             [0-9]+"."[0-9]+("F"|"f"|"")
entero              [0-9]+

cadena              \"[^\"]*\"
caracter            "'"[^]"'" 

//para comentarios 
lineTerminator      \r|\n|\r\n
whitespace          {lineTerminator}|[ \t\f]

//palabras reservadas
int                 "int"
float               "float"
string              "String"
char                "CHAR"  
boolean             "Boolean"
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
println             "System.out.println"
print               "System.out.print"
true                "true"
false               "false"

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
{decimal}                   return "DECIMAL"
{entero}                    return "ENTERO"
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
{cadena}                    return "CADENA"
{caracter}                  return "CARACTER"
{true}                      return "TRUE"
{false}                     return "FALSE"

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
    : pack imprts clase                   {$$ = $3;}
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
  : visi_class clas_name LLAVEA sente_glos LLAVEC       {$$ = claseAux; $$.isFinal = $1; $$.instructions = $4;}         
  ; 

clas_name
  : CLASS ID              {claseAux = new yy.Clase($2);}            
  ;


visi_class 
    : PUBLIC FINAL    {$$ = true;}
    | PUBLIC          {$$ = false;}
    |                 {$$ = false;}
    ;

/*sentencias globales*/
sente_glos 
    : sente_glos sent_glo                       {$$ = yy.AuxFun.pushInstruccion($1, $2);}
    |                                           {$$=[];}
    ;

sent_glo 
    : declar_var_glo                            {$$ = $1;}
    | fun                                       {$$ = null; claseAux.pushFun($1);}
    | main_fun                                  {$$ = null;}
    | getSet PUNTOCOMA                          {$$ = null;}
    ;


/*declaracion variable global*/
declar_var_glo
    : agrup items PUNTOCOMA                   {$$ = yy.AuxFun.completDeclacionGlobla($2,$1);}
    | getSet agrup items PUNTOCOMA
    ;

getSet
  : GETTER SETTER
  | SETTER GETTER
  | GETTER
  | SETTER
  ;

statc
  : STATIC                    {$$ = true;}  
  |                           {$$ = false; }
  ;

/*gramatica para delcarar funciones*/
fun
  : agrup ID PARENTESA paramets PARENTESC LLAVEA sentencias LLAVEC          {$$ = new yy.Funcion($1, new yy.Token($2,this._$.first_column, this._$.first_line), $2, $4, $7);}
  | agrup PARENTESA paramets PARENTESC LLAVEA sentencias LLAVEC         //constructor validar
  ;

paramets
    : params                        {$$ = $1;}    
    |                               {$$ = [];}
    ;

params
  : params COMA param               {$$ = $1; $$.push($3);}
  | param                           {$$ = [$1];}
  ;

param 
  : type_param ID                   {$$ = new yy.Variable(yy.Visibilidad.PUBLIC, false, false, $1, $2, new yy.Dato(yy.TypeDato.INT, 1, '', false, new yy.Token($2,this._$.first_column, this._$.first_line))); }
  | ID ID                           //{$$ = new yy.Variable();}
  ; 


type_param
    : INT                 {$$ = yy.TypeDato.INT;}                     
    | FLOAT               {$$ = yy.TypeDato.FLOAT;}
    | BOOLEAN             {$$ = yy.TypeDato.BOOLEAN;}
    | CHAR                {$$ = yy.TypeDato.CHAR;}
    | STRING              {$$ = yy.TypeDato.STRING;}
    ;


/*funcion main, aqui se validara el stack y desde aqui se iniciara la compilacion*/
main_fun 
    : agrup MAIN PARENTESA  PARENTESC LLAVEA sentencias LLAVEC        
    ;

visi
  : PUBLIC                {$$ = yy.Visibilidad.PUBLIC;}
  | PRIVATE               {$$ = yy.Visibilidad.PRIVATE;}
  | PROTECTED             {$$ = yy.Visibilidad.PROTECTED;}
  |                       {$$ = yy.Visibilidad.PUBLIC;}
  ;

type
    : INT                 {$$ = yy.TypeDato.INT;}                     
    | FLOAT               {$$ = yy.TypeDato.FLOAT;}
    | BOOLEAN             {$$ = yy.TypeDato.BOOLEAN;}
    | CHAR                {$$ = yy.TypeDato.CHAR;}
    | STRING              {$$ = yy.TypeDato.STRING;}
    | VOID                {$$ = yy.TypeDato.VOID;}
    ;

agrup
  : visi statc fin type               {$$ = [$1, $2, $3, $4]; }
  | visi statc fin ID                  //se usa un id para refernciar  objetos
  ;

fin 
  : FINAL                 {$$ = true;}
  |                       {$$ = false;}
  ;

/*sentencias de instrucciones internas, para funciones y anidadas en bifurcaciones*/
sentencias
    : sentencias sentencia    {$$ = yy.AuxFun.pushInstruccion($1, $2);}
    |                         {$$ = []; }
    ;

sentencia
    : declaracion_var                 {$$ = $1;}
    | asig                            {$$ = $1;}
    | oput                            {$$ = $1;}
    | def_if_complete                 {$$ = $1;}
    | def_switch                      {$$ = $1;}
    | BREAK PUNTOCOMA   
    | def_while                       {$$ = $1;}
    | def_do_while                    {$$ = $1;}
    ;

/*gramatica para declaracion de variables anidadas*/
declaracion_var 
            : type items  PUNTOCOMA      {$$ = yy.AuxFun.agregarType($1, $2);}
            | ID items  PUNTOCOMA
            ;

items 
    : items COMA ID                       {$$ = $1; $$.push(new yy.Declaration(new yy.Token($3,this._$.first_column, this._$.first_line)));}
    | items COMA ID IGUAL exp             {$$ = $1; $$.push(new yy.Declaration(new yy.Token($3,this._$.first_column, this._$.first_line), new yy.Operation($5)));}
    | ID IGUAL exp                        {$$ = []; $$.push(new yy.Declaration(new yy.Token($1,this._$.first_column, this._$.first_line), new yy.Operation($3)));}
    | ID                                  {$$ = []; $$.push(new yy.Declaration(new yy.Token($1,this._$.first_column, this._$.first_line)));}
    ;

/*gramatica para asignacion de variables*/
asig 
  : ID IGUAL exp PUNTOCOMA                {$$ = new yy.Asignacion(new yy.Token($1,this._$.first_column, this._$.first_line), $3);}
  ;

/*grmatica para system.out.print*/
oput
  : PRINTLN PARENTESA exp PARENTESC PUNTOCOMA                   {$$ = new yy.Sout($3, true);}
  | PRINT PARENTESA exp PARENTESC PUNTOCOMA                     {$$ = new yy.Sout($3, false);}
  ;


/*definicion de un if, if else, if elseif else*/
def_if_complete 
    : def_if                                                      {$$ = $1;}                                                                
    | def_if def_else                                             {$$ = $1; $$.ElseInstruction = $2;}                                             
    | def_if def_else_if                                          {$$ = $1; $$.ElseIfInstruction = $2;}                                             
    ;

/*Gramatica para if  */
def_if 
    : IF PARENTESA exp PARENTESC LLAVEA sentencias LLAVEC           {$$ = new yy.If($6, $3, new yy.Token($1,this._$.first_column, this._$.first_line));}
    ;

/*Gramatica para ELSE  */
def_else 
    : ELSE LLAVEA sentencias LLAVEC                                  {$$ = new yy.Else($3,new yy.Token($1,this._$.first_column, this._$.first_line));}                                                 
    ;

/*Gramatica para ELSE_if  */
def_else_if 
    : ELSE def_if                                                   {$$ = $2;}                                                                                                                                         
    | ELSE def_if def_else                                          {$$ = $2; $$.ElseInstruction = $3;}
    | ELSE def_if def_else_if                                       {$$ = $2; $$.ElseIfInstruction = $3;}                                      
    ;

/*Gramatica para switch  */
def_switch  
    : SWITCH PARENTESA ID PARENTESC LLAVEA cases LLAVEC           {$$ = new yy.Switch($6,new yy.Variable(yy.Visibilidad.PUBLIC, false, false, yy.TypeDato.INT, $3, new yy.Dato(yy.TypeDato.INT, 1, '', false, new yy.Token($3,this._$.first_column, this._$.first_line))) );}                         
    ;

/*Gramatica para casos dentro del switch  */
cases 
    : cases caso_sw                   {$$ = $1; $$.push($2);}                                                           
    |                                 {$$ = [];}                                                                           
    ;

/*Gramatica para casos */
caso_sw 
    : CASE ter_exp DOSPUNTO sentencias_sw  BREAK PUNTOCOMA        {$$ = new yy.Case($4,new yy.Token($1,this._$.first_column, this._$.first_line),$2);}                             
    | DEFAULT DOSPUNTO sentencias_sw   BREAK PUNTOCOMA            {$$ = new yy.Case($3,new yy.Token($1,this._$.first_column, this._$.first_line));}                                              
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
  : WHILE PARENTESA exp PARENTESC LLAVEA sentencias LLAVEC                      {$$ = new yy.While($6, $3, new yy.Token($1,this._$.first_column, this._$.first_line));}                                         
  ;

/*Gramatica para do_while  */
def_do_while 
    : DO LLAVEA sentencias LLAVEC WHILE PARENTESA exp PARENTESC PUNTOCOMA       {$$ = new yy.DoWhile($3, $7, new yy.Token($5,this._$.first_column, this._$.first_line));}                           
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
      : ENTERO        {$$ = new yy.Dato(yy.TypeDato.INT, parseInt($1), "", false, new yy.Token($1,this._$.first_column, this._$.first_line));}
      | DECIMAL       {$$ = new yy.Dato(yy.TypeDato.FLOAT, parseFloat($1), "", false, new yy.Token($1,this._$.first_column, this._$.first_line));}
      | CADENA        {$$ = new yy.Dato(yy.TypeDato.STRING, 1,$1.substr(1,yyleng-2), false, new yy.Token($1,this._$.first_column, this._$.first_line));}  
      | CARACTER      {$$ = new yy.Dato(yy.TypeDato.CHAR, 1,$1.substr(1,yyleng-2), false, new yy.Token($1,this._$.first_column, this._$.first_line));}  
      | TRUE          {$$ = new yy.Dato(yy.TypeDato.BOOLEAN, 1,"", true, new yy.Token($1,this._$.first_column, this._$.first_line));}
      | FALSE         {$$ = new yy.Dato(yy.TypeDato.BOOLEAN, 1,"", false, new yy.Token($1,this._$.first_column, this._$.first_line));}
      | ID            {$$ = new yy.Dato(yy.TypeDato.INT, 1,"", false, new yy.Token($1,this._$.first_column, this._$.first_line), true);}
      ;