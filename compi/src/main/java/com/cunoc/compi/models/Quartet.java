
package com.cunoc.compi.models;

/**
 *
 * @author elvis_agui
 */
public class Quartet {
   private String op1;
   private String op2;
   private String result;
   private TypeOperationQuartet typeOp;

    public Quartet(String op1, String op2, String result, TypeOperationQuartet typeOp) {
        this.op1 = op1;
        this.op2 = op2;
        this.result = result;
        this.typeOp = typeOp;
    }

    public String getOp1() {
        return op1;
    }

    public void setOp1(String op1) {
        this.op1 = op1;
    }

    public String getOp2() {
        return op2;
    }

    public void setOp2(String op2) {
        this.op2 = op2;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public TypeOperationQuartet getTypeOp() {
        return typeOp;
    }

    public void setTypeOp(TypeOperationQuartet typeOp) {
        this.typeOp = typeOp;
    }

    @Override
    public String toString() {
        return "Quartet{" + "op1=" + op1 + ", op2=" + op2 + ", result=" + result + ", typeOp=" + typeOp + '}';
    }
    
    
    
    
   
}
