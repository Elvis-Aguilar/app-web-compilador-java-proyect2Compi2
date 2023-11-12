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

comenLine           "/""/".*\n                           
comenMultiLine      \/\*[\s\S]*?\*\/


//palabras reservadas
int                 "int"
float               "float"
string              "String"
char                "char"  
boolean             "boolean"
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
new                 "new"
continue            "continue"
return              "return"
this                "this"
null                "null"

//operadores de clase Math
mathabs             "Math.abs"
mathceil            "Math.ceil"
mathfloor           "Math.floor"
mathround           "Math.round"
mathmax             "Math.max "
mathmin             "Math.min"
mathpow             "Math.pow"
mathsqrt            "Math.sqrt"
mathrandom          "Math.random"
mathtoRadians       "Math.toRadians"
mathacos            "Math.acos "
mathsin             "Math.sin"
mathatan            "Math.atan"
mathexp             "Math.exp"


//bifurcaciones
if                  "if"
else                "else"
switch              "switch"
case                "case"
break               "break"          
default             "default"
while               "while"
do                  "do"
for                 "for"


//lectura por consola
readfloat       "readFloat"
readint         "readInt"
readchar        "readChar"
readboolean     "readBoolean"
readstring      "readString"

/* operators */

//incremento decremento
incre                           "++"
decre                           "--"

masigul                         "+="

//aritmeticos
mas                             "+"
menos 			                "-"
por                             "*"
division                        "/"
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
{comenLine}                 /* comentario de una linea */
{comenMultiLine}            /* comentario multilinea*/    
{decimal}                   return "DECIMAL"
{entero}                    return "ENTERO"
{incre}                     return "INCRE"
{decre}                     return "DECRE"
{masigul}                   return "MASIGUAL"
{mas} 						return "MAS"
{menos} 					return "MENOS"
{por} 			  			return "POR"
{division}		  			return "DIVISION"
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
{for}                       return "FOR"
{cadena}                    return "CADENA"
{caracter}                  return "CARACTER"
{true}                      return "TRUE"
{false}                     return "FALSE"
{mathabs}                   return "MATHABS"
{mathceil}                  return "MATHCEIL"
{mathfloor}                 return "MATHFLOOR"
{mathround}                 return "MATHROUND"
{mathmax}                   return "MATHMAX"
{mathmin}                   return "MATHMIN"
{mathpow}                   return "MATHPOW"
{mathsqrt}                  return "MATHSQRT"
{mathrandom}                return "MATHRANDOM"
{mathtoRadians}             return "MATHTORADIANS"
{mathacos}                  return "MATHACOS"
{mathsin}                   return "MATHSIN"
{mathatan}                  return "MATHATAN"
{mathexp}                   return "MATHEXP"
{new}                       return "NEW"
{continue}                  return "CONTINUE"
{return}                    return "RETURN"
{this}                      return "THIS"
{null}                      return "NULL"
{readfloat}                 return "READFLOAT"
{readint}                   return "READINT"
{readchar}                  return "READCHAR"
{readboolean}               return "READBOOLEAN"
{readstring}                return "READSTRING"


/* id */
{id}                        return "ID"
/*final*/
<<EOF>>                     return "EOF"
/*manejo de errores*/
.                            { yy.Errores.getInstance().push(new yy.ErrorSintx(yylloc.last_line, yylloc.last_column, yytext,"Lexema No reconocido por el analizador Lexico",yy.TypeError.LEXICO));}

/lex

/*configuracion de precedencia*/
%left OR
%left AND
%right NOT
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
    : pack imprts clase                   {$$ = $3; $$.obtenerImports($2);}
    ;


/*gramatica para definir el package*/
pack 
  : PACKAGE ids_imprt PUNTOCOMA
  | 
  ;

/*gramatica para importaciones: import id.id.id.*; || import id.*; || id.id; || id;*/
imprts
    : imprts imprt          {$$ = $1; $$.push($2)}
    |                       {$$ = [];}
    ;

imprt
    : IMPORT ids_imprt term_imprt    {$$ = `${$2}`+ `${$3}` } 
    ;

ids_imprt 
    : ids_imprt PUNTO ID        {$$ = `${$1}`+ `${$2}` + `${$3}`} //com.id.id.id
    | ID                      {$$ = `${$1}`;}      //com
    ;
  
term_imprt
    : PUNTO POR PUNTOCOMA    {$$ = `${$1}` +`${$2}`;}  //.*
    | PUNTOCOMA              {$$ = "";}
    ;

/*gramatica para clases: public class id {...} || class id {...}*/
clase 
  : visi_class clas_name LLAVEA sente_glos LLAVEC               {$$ = claseAux; $$.isFinal = $1; $$.instructions = $4;}         
  | getSet visi_class clas_name LLAVEA sente_glos LLAVEC
  ; 

clas_name
  : CLASS ID              {claseAux = new yy.Clase($2);  yy.Errores.getInstance().ubicacion = $2;}            
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
    | declar_arr_glo                            {$$ = $1;}
    | fun                                       {$$ = null; claseAux.pushFun($1);}
    | main_fun                                  {$$ = null; claseAux.pushMain($1);}
    | constr                                    {$$ = null; claseAux.pushConstructor($1);}
    | declar_obj_glo                            {$$ = $1;}
    ;


/*declaracion variable global*/
declar_var_glo
    : agrup items PUNTOCOMA                   {$$ = yy.AuxFun.completDeclacionGlobla($2,$1);}
    | getSet agrup items PUNTOCOMA            {$$ = yy.AuxFun.completDeclacionGlobla($3,$2); yy.AuxFun.generarGetSet($1,$2,$3,claseAux);}
    ;
  
declar_obj_glo
    : agrup ID IGUAL NEW ID PARENTESA argumens PARENTESC PUNTOCOMA          {$$ = new yy.DeclarObject($1,new yy.Token($2,this._$.first_column, this._$.first_line), $7,$5);}
    | agrup ID IGUAL NULL PUNTOCOMA                                         {$$ = new yy.DeclarObject($1,new yy.Token($2,this._$.first_column, this._$.first_line), [],$4);}
    ;

getSet
  : GETTER SETTER                                   {$$ = yy.getYset.GETYSET;}    
  | SETTER GETTER                                   {$$ = yy.getYset.SETYGET;}    
  | GETTER                                          {$$ = yy.getYset.GET;}    
  | SETTER                                          {$$ = yy.getYset.SET;}
  ;

statc
  : STATIC                    {$$ = true;}  
  |                           {$$ = false; }
  ;

/*gramatica para declarar arreglos globales*/
declar_arr_glo
    : agrup ID cochets PUNTOCOMA                                    {$$ = new yy.DeclarationArr($1, $3,new yy.Token($2,this._$.first_column, this._$.first_line));}
    | agrup ID cochets IGUAL NEW type cochets_val PUNTOCOMA         {$$ = new yy.DeclarationArr($1, $3,new yy.Token($2,this._$.first_column, this._$.first_line), $6, $7, true);}
    | agrup ID cochets IGUAL arr_init PUNTOCOMA                     {$$ = new yy.DeclarationArr($1, $3,new yy.Token($2,this._$.first_column, this._$.first_line), undefined, $5, false);}
    ;

cochets 
    : CORCHETA CORCHETAC CORCHETA CORCHETAC           {$$ = 2;}
    | CORCHETA CORCHETAC                              {$$ = 1;}
    ;

cochets_val
    : CORCHETA exp CORCHETAC CORCHETA exp CORCHETAC     {$$ = []; $$.push( new yy.Operation($2)); $$.push( new yy.Operation($5));}
    | CORCHETA exp CORCHETAC                            {$$ = []; $$.push( new yy.Operation($2));}
    ;

arr_init
    : LLAVEA LLAVEA cont_arr LLAVEC COMA LLAVEA cont_arr LLAVEC  LLAVEC       {$$ = $3.concat($7);}
    | LLAVEA cont_arr LLAVEC                                                  {$$ = $2;}                                                 
    ;

cont_arr
    : cont_arr COMA exp       {$$ = $1; $$.push( new yy.Operation($3));}
    | exp                     {$$ = [ new yy.Operation($1)];}
    ;


/*gramatica para delcarar funciones*/
fun
  : agrup ID PARENTESA paramets PARENTESC LLAVEA sentencias LLAVEC          {$$ = new yy.Funcion($1, new yy.Token($2,this._$.first_column, this._$.first_line), $2, $4, $7);}
  ;

constr
  : agrup PARENTESA paramets PARENTESC LLAVEA sentencias LLAVEC               {$$ = new yy.Constructor($1, $3, $6, new yy.Token($1[3],this._$.first_column, this._$.first_line));}
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
  | ID ID                           {$$ = new yy.Variable(yy.Visibilidad.PUBLIC, false, false, $1, $2, new yy.Dato(yy.TypeDato.INT, 1, '', false, new yy.Token($2,this._$.first_column, this._$.first_line))); }
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
    : agrup MAIN PARENTESA  PARENTESC LLAVEA sentencias LLAVEC      {$$ = new yy.Main($6,new yy.Token($2,this._$.first_column, this._$.first_line));}    
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
  | visi statc fin ID                 {$$ = [$1, $2, $3, $4];}
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
    | declar_arr                      {$$ = $1;}
    | asig                            {$$ = $1;}
    | asi_arr_comp                    {$$ = $1;}
    | asi_arr_ind                     {$$ = $1;}
    | oput                            {$$ = $1;}
    | def_if_complete                 {$$ = $1;}
    | def_switch                      {$$ = $1;}
    | def_while                       {$$ = $1;}
    | def_do_while                    {$$ = $1;}
    | def_for                         {$$ = $1;}
    | incr_decr PUNTOCOMA             {$$ = $1;}
    | asig_object                     {$$ = $1;}  
    | declar_obj                      {$$ = $1;}  
    | llamad_fun PUNTOCOMA            {$$ = new yy.LlamadaFunGen($1);}
    | llamad_fun_obj PUNTOCOMA        {$$ = new yy.LlamadaFunGen($1);}
    | BREAK PUNTOCOMA                 {/*sin acciones*/}
    | CONTINUE PUNTOCOMA              {/*sin acciones*/}
    | def_return                      {$$ = $1;}    
    | read                            {$$ = $1}                 
    ;

read
    : READFLOAT PARENTESA ID PARENTESC PUNTOCOMA                    {$$ = new yy.Asignacion(new yy.Token($3,this._$.first_column, this._$.first_line), new yy.Operation(new yy.Read(yy.TypeDato.FLOAT)));}
    | READINT PARENTESA ID PARENTESC PUNTOCOMA                      {$$ = new yy.Asignacion(new yy.Token($3,this._$.first_column, this._$.first_line), new yy.Operation(new yy.Read(yy.TypeDato.INT)));}
    | READCHAR PARENTESA ID PARENTESC PUNTOCOMA                     {$$ = new yy.Asignacion(new yy.Token($3,this._$.first_column, this._$.first_line), new yy.Operation(new yy.Read(yy.TypeDato.CHAR)));}
    | READBOOLEAN PARENTESA ID PARENTESC PUNTOCOMA                  {$$ = new yy.Asignacion(new yy.Token($3,this._$.first_column, this._$.first_line), new yy.Operation(new yy.Read(yy.TypeDato.BOOLEAN)));}
    | READSTRING PARENTESA ID PARENTESC PUNTOCOMA                   {$$ = new yy.Asignacion(new yy.Token($3,this._$.first_column, this._$.first_line), new yy.Operation(new yy.Read(yy.TypeDato.STRING)));}
    ;

def_return 
    : RETURN exp PUNTOCOMA            {$$ = new yy.Asignacion(new yy.Token($1,this._$.first_column, this._$.first_line),  new yy.Operation($2));}
    ;

/*gramatica para declaracion de variables anidadas*/
declaracion_var 
            : type items  PUNTOCOMA      {$$ = yy.AuxFun.agregarType($1, $2);}
            | ID items  PUNTOCOMA        {$$ = yy.AuxFun.agregarType($1, $2);}
            ;

declar_obj
    : ID ID IGUAL NEW ID PARENTESA argumens PARENTESC PUNTOCOMA          {$$ = new yy.DeclarObject($1,new yy.Token($2,this._$.first_column, this._$.first_line), $7,$5);}
    | ID ID IGUAL NULL PUNTOCOMA                                               {$$ = new yy.DeclarObject($1,new yy.Token($2,this._$.first_column, this._$.first_line), [],$4);}
    ;

items 
    : ID IGUAL exp                        {$$ = []; $$.push(new yy.Declaration(new yy.Token($1,this._$.first_column, this._$.first_line), new yy.Operation($3)));}
    | ID                                  {$$ = []; $$.push(new yy.Declaration(new yy.Token($1,this._$.first_column, this._$.first_line)));}
    ;

/*gramatica para declarar un arreglo*/
declar_arr
    : type ID cochets PUNTOCOMA                                 {$$ = new yy.DeclarationArr([undefined,false, false,$1], $3,new yy.Token($2,this._$.first_column, this._$.first_line));}
    | type ID cochets IGUAL NEW type cochets_val PUNTOCOMA      {$$ = new yy.DeclarationArr([undefined,false, false,$1], $3,new yy.Token($2,this._$.first_column, this._$.first_line), $6, $7, true);}
    | type ID cochets IGUAL arr_init PUNTOCOMA                  {$$ = new yy.DeclarationArr([undefined,false, false,$1], $3,new yy.Token($2,this._$.first_column, this._$.first_line), undefined, $5, false);}
    ;

/*gramatica para asignacion de variables*/
asig 
  : ID IGUAL exp PUNTOCOMA                                      {$$ = new yy.Asignacion(new yy.Token($1,this._$.first_column, this._$.first_line),  new yy.Operation($3));}
  | ID MASIGUAL exp PUNTOCOMA                                   {$$ = yy.AuxFun.configMasIgual(new yy.Operation($3), new yy.Token($1,this._$.first_column, this._$.first_line));}
  | ID PUNTO ID IGUAL exp PUNTOCOMA                             {$$ = new yy.Asignacion(new yy.Token($3,this._$.first_column, this._$.first_line),  new yy.Operation($5), false, $1);}
  | ID PUNTO ID MASIGUAL exp PUNTOCOMA                          {$$ = yy.AuxFun.configMasIgual(new yy.Operation($5), new yy.Token($3,this._$.first_column, this._$.first_line), false, $1);}
  | THIS PUNTO ID IGUAL exp PUNTOCOMA                           {$$ = new yy.Asignacion(new yy.Token($3,this._$.first_column, this._$.first_line),  new yy.Operation($5), true);}
  | THIS PUNTO ID MASIGUAL exp PUNTOCOMA                        {$$ = yy.AuxFun.configMasIgual(new yy.Operation($5), new yy.Token($3,this._$.first_column, this._$.first_line), true);}
  | THIS PUNTO ID PUNTO ID IGUAL exp PUNTOCOMA                  {$$ = new yy.Asignacion(new yy.Token($5,this._$.first_column, this._$.first_line),  new yy.Operation($7), true, $3);}   
  ;

asig_object
        : ID IGUAL NEW ID PARENTESA argumens PARENTESC PUNTOCOMA                {$$ = new yy.AsignObject(new yy.Token($1,this._$.first_column, this._$.first_line), $6, false, $4);}
        | THIS PUNTO ID IGUAL NEW ID PARENTESA argumens PARENTESC PUNTOCOMA     {$$ = new yy.AsignObject(new yy.Token($3,this._$.first_column, this._$.first_line), $8, true,  $6);}
        ;

asi_arr_comp
  : ID IGUAL NEW type cochets_vla PUNTOCOMA             {$$ = new yy.AsignacionArr(new yy.Token($1,this._$.first_column, this._$.first_line), $4, $5, null,false);}      
  ;

asi_arr_ind
    : ID cochets_val IGUAL exp PUNTOCOMA                    {$$ = new yy.AsignacionArr(new yy.Token($1,this._$.first_column, this._$.first_line), undefined, $2,  new yy.Operation($4),true);}
    | THIS PUNTO ID cochets_val IGUAL exp PUNTOCOMA 
    ;

incr_decr
    : ID INCRE                                 {$$ = yy.AuxFun.configIncremet(new yy.Token($1,this._$.first_column, this._$.first_line), yy.TypeOperation.SUMA);}
    | ID DECRE                                 {$$ = yy.AuxFun.configIncremet(new yy.Token($1,this._$.first_column, this._$.first_line), yy.TypeOperation.RESTA);}
    | THIS PUNTO ID INCRE                      {$$ = yy.AuxFun.configIncremet(new yy.Token($3,this._$.first_column, this._$.first_line), yy.TypeOperation.SUMA, true );}
    | THIS PUNTO ID DECRE                      {$$ = yy.AuxFun.configIncremet(new yy.Token($3,this._$.first_column, this._$.first_line), yy.TypeOperation.RESTA, true);}
    ;

/*gramatica para la llamada de funciones*/
llamad_fun 
    : ID PARENTESA argumens PARENTESC                   {$$ = new yy.LlamadaFun(new yy.Token($1,this._$.first_column, this._$.first_line), $3, false, '');}
    | THIS PUNTO ID PARENTESA argumens PARENTESC        {$$ = new yy.LlamadaFun(new yy.Token($3,this._$.first_column, this._$.first_line), $5,true, '');}
    ;

llamad_fun_obj 
    : ID PUNTO ID PARENTESA argumens PARENTESC                  {$$ = new yy.LlamadaFun(new yy.Token($3,this._$.first_column, this._$.first_line), $5, false, $1);}
    | THIS PUNTO ID PUNTO ID PARENTESA argumens PARENTESC       {$$ = new yy.LlamadaFun(new yy.Token($5,this._$.first_column, this._$.first_line), $7, true, $3);}
    ;


/*argumentos de la llamada de una funcion  exp, exp, exp....*/
argumens  
    : argumen               {$$ = $1;}
    |                       {$$ = [];}
    ;

argumen
    : argumen COMA exp          {$$=$1; $$.push(new yy.Operation($3));}
    | exp                       {$$=[new yy.Operation($1)];}
    ;

/*grmatica para system.out.print || println*/
oput
  : PRINTLN PARENTESA exp PARENTESC PUNTOCOMA                   {$$ = new yy.Sout(new yy.Operation($3), true);}
  | PRINT PARENTESA exp PARENTESC PUNTOCOMA                     {$$ = new yy.Sout(new yy.Operation($3), false);}
  ;


/*definicion de un if, if else, if elseif else*/
def_if_complete 
    : def_if                                                      {$$ = $1;}                                                                
    | def_if def_else                                             {$$ = $1; $$.ElseInstruction = $2;}                                             
    | def_if def_else_if                                          {$$ = $1; $$.ElseIfInstruction = $2;}                                             
    ;

/*Gramatica para if  */
def_if 
    : IF PARENTESA exp PARENTESC LLAVEA sentencias LLAVEC           {$$ = new yy.If($6,  new yy.Operation($3), new yy.Token($1,this._$.first_column, this._$.first_line));}
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
  : WHILE PARENTESA exp PARENTESC LLAVEA sentencias LLAVEC                      {$$ = new yy.While($6,  new yy.Operation($3), new yy.Token($1,this._$.first_column, this._$.first_line));}                                         
  ;

/*Gramatica para do_while  */
def_do_while 
    : DO LLAVEA sentencias LLAVEC WHILE PARENTESA exp PARENTESC PUNTOCOMA       {$$ = new yy.DoWhile($3,  new yy.Operation($7), new yy.Token($5,this._$.first_column, this._$.first_line));}                           
    ;

/*gramatica para for*/
def_for
    : FOR PARENTESA condition_for PARENTESC LLAVEA sentencias LLAVEC            {$$ = yy.AuxFun.configFor($3,new yy.Token($1,this._$.first_column, this._$.first_line), $6);}
    ;

condition_for
    : var_iterador PUNTOCOMA exp PUNTOCOMA incr_decr      {$$ = [$1, new yy.Operation($3), $5];}
    ;

var_iterador
    : INT ID IGUAL exp                  {$$ = yy.AuxFun.configVarIteradorFor(new yy.Declaration(new yy.Token($2,this._$.first_column, this._$.first_line), new yy.Operation($4)));  }     
    | ID IGUAL exp                      {$$ = new yy.Asignacion(new yy.Token($1,this._$.first_column, this._$.first_line),  new yy.Operation($3));}       
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
  | NOT exp                                 {$$ = new yy.NodoOperation(null, null, $2, yy.TypeOperation.NOT, new yy.Token($2,this._$.first_column, this._$.first_line));}
  | ter_exp                                 {$$ = $1;}
  | PARENTESA exp PARENTESC                 {$$ = $2;}
  | fun_math                                {$$ = $1;}
  | llamad_fun                              {$$ = $1;}
  | llamad_fun_obj                          {$$ = $1;}
  ;

ter_exp
      : ENTERO                                      {$$ = new yy.NodoOperation(new yy.Dato(yy.TypeDato.INT, parseInt($1), "", false, new yy.Token($1,this._$.first_column, this._$.first_line)));}
      | DECIMAL                                     {$$ = new yy.NodoOperation(new yy.Dato(yy.TypeDato.FLOAT, parseFloat($1), "", false, new yy.Token($1,this._$.first_column, this._$.first_line)));}
      | CADENA                                      {$$ = new yy.NodoOperation(new yy.Dato(yy.TypeDato.STRING, 1,$1.substr(1,yyleng-2), false, new yy.Token($1,this._$.first_column, this._$.first_line)));}  
      | CARACTER                                    {$$ = new yy.NodoOperation(new yy.Dato(yy.TypeDato.CHAR, 1,$1.substr(1,yyleng-2), false, new yy.Token($1,this._$.first_column, this._$.first_line)));}  
      | TRUE                                        {$$ = new yy.NodoOperation(new yy.Dato(yy.TypeDato.BOOLEAN, 1,"", true, new yy.Token($1,this._$.first_column, this._$.first_line)));}
      | FALSE                                       {$$ = new yy.NodoOperation(new yy.Dato(yy.TypeDato.BOOLEAN, 1,"", false, new yy.Token($1,this._$.first_column, this._$.first_line)));}
      | ID                                          {$$ = new yy.NodoOperation(new yy.Dato(yy.TypeDato.INT, 1,"", false, new yy.Token($1,this._$.first_column, this._$.first_line), true));}
      | THIS PUNTO ID                               {$$ = new yy.NodoOperation(new yy.Dato(yy.TypeDato.INT, 1, '',false, new yy.Token($3, this._$.first_column, this._$.first_line), true,  true ));}
      ;

/*gramatica para las clases math*/
fun_math
    : MATHABS PARENTESA exp PARENTESC PUNTOCOMA             {$$ = new yy.FunMath(new yy.Token($1,this._$.first_column, this._$.first_line), yy.TypeFunMath.MATHABS,$3);}    
    | MATHCEIL PARENTESA exp PARENTESC PUNTOCOMA            {$$ = new yy.FunMath();}
    | MATHFLOOR PARENTESA exp  PARENTESC PUNTOCOMA          {$$ = new yy.FunMath();}  
    | MATHROUND PARENTESA exp PARENTESC PUNTOCOMA           {$$ = new yy.FunMath();}
    | MATHMAX PARENTESA exp COMA exp PARENTESC PUNTOCOMA    {$$ = new yy.FunMath();}
    | MATHMIN PARENTESA exp COMA exp PARENTESC PUNTOCOMA    {$$ = new yy.FunMath();}
    | MATHPOW PARENTESA exp COMA exp PARENTESC PUNTOCOMA    {$$ = new yy.FunMath();}
    | MATHSQRT PARENTESA exp PARENTESC PUNTOCOMA            {$$ = new yy.FunMath();}
    | MATHRANDOM PARENTESA PARENTESC PUNTOCOMA              {$$ = new yy.FunMath();}
    | MATHTORADIANS PARENTESA exp PARENTESC PUNTOCOMA       {$$ = new yy.FunMath();}  
    | MATHACOS PARENTESA exp PARENTESC PUNTOCOMA            {$$ = new yy.FunMath();}  
    | MATHSIN PARENTESA exp PARENTESC PUNTOCOMA             {$$ = new yy.FunMath();}    
    | MATHATAN PARENTESA exp PARENTESC PUNTOCOMA            {$$ = new yy.FunMath();}  
    | MATHEXP PARENTESA exp PARENTESC PUNTOCOMA             {$$ = new yy.FunMath();}
    ;