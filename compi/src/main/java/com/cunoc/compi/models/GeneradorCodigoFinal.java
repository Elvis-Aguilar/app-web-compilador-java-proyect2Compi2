package com.cunoc.compi.models;

/**
 *
 * @author elvis_agui
 */
public class GeneradorCodigoFinal {

    private Quartet quatetes[];
    private String result;

    public GeneradorCodigoFinal() {
    }   

    public GeneradorCodigoFinal(Quartet[] quatetes) {
        this.quatetes = quatetes;
    }

    public String codigoResult() {
        this.result = "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n";
        this.result += "void* stack[250];\nvoid* heap[250];\nint ptr = 0;\nint ptrh = 0;\n\n";
        for (Quartet quatete : quatetes) {
            if(quatete.getTypeOp().equals(TypeOperationQuartet.DECLARPROTOTIPO)){
                this.result += "void "+quatete.getResult()+";\n";
            }else{
                this.result += "\n\n";
                break;
            }           
        }
        this.result += "int main() {\n\nmain_main();\n\nreturn 0;\n\n}\n\n";
        for (Quartet quatete : quatetes) {
            this.armarCodigoCaso(quatete);
        }
        return result;
    }

    public void armarCodigoCaso(Quartet quartete) {
        switch (quartete.getTypeOp()) {
            case DECLARREFUN:
                this.result += "void "+quartete.getResult()+" {\n";
                break;
            case CIERREFUN:
                this.result += quartete.getResult()+"\n\n";
                break;
            case ASIGNATION:
                this.result += quartete.getResult()+" = "+quartete.getOp1()+"; "+"\n";
                break;
            case SUMA:
                this.result += quartete.getResult()+" = "+quartete.getOp1()+" + "+quartete.getOp2()+"; "+"\n";
                break;
            case RESTA:
                this.result += quartete.getResult()+" = "+quartete.getOp1()+" - "+quartete.getOp2()+"; "+"\n";
                break;
            case MULTIPLICACION:
                this.result += quartete.getResult()+" = "+quartete.getOp1()+" * "+quartete.getOp2()+"; "+"\n";
                break;
            case DIVISION   :
                this.result += quartete.getResult()+" = "+quartete.getOp1()+" / "+quartete.getOp2()+"; "+"\n";
                break;
            case LLAMADAFUN:
                this.result += quartete.getResult()+"\n";
                break;
            case CONCATCADEENTERO:
                this.result += "sprintf("+quartete.getResult()+" + "+quartete.getOp1()+" "+quartete.getOp2()+");\n";
                break;
            case CONCATCADECADE:
                this.result += "strcat("+quartete.getResult()+", "+quartete.getOp1()+");\n";
                break;
            case IMPRIMIR:
                this.result += "printf("+quartete.getOp1()+", "+quartete.getResult()+");\n";
                break;
            case DECLEET:
                this.result += quartete.getResult()+":\n";
                break;
            case GOTOFLASE:
                this.result += "goto "+quartete.getResult()+";\n";
                break;
            case EQUALS:
                this.result += "if ("+quartete.getOp1()+" == "+quartete.getOp2()+") goto "+quartete.getResult()+";\n";
                break;
            case DIFERENTE:
                this.result += "if ("+quartete.getOp1()+" != "+quartete.getOp2()+") goto "+quartete.getResult()+";\n";
                break;
            case MAYORQ:
                this.result += "if ("+quartete.getOp1()+" > "+quartete.getOp2()+") goto "+quartete.getResult()+";\n";
                break;
            case MAYOROI:
                this.result += "if ("+quartete.getOp1()+" >= "+quartete.getOp2()+") goto "+quartete.getResult()+";\n";
                break;
            case MENORQ:
                this.result += "if ("+quartete.getOp1()+" < "+quartete.getOp2()+") goto "+quartete.getResult()+";\n";
                break;
            case MENOROI:
                this.result += "if ("+quartete.getOp1()+" <= "+quartete.getOp2()+") goto "+quartete.getResult()+";\n";
                break;
        }
    }

    public Quartet[] getQuatetes() {
        return quatetes;
    }

    public void setQuatetes(Quartet[] quatetes) {
        this.quatetes = quatetes;
    }

}
