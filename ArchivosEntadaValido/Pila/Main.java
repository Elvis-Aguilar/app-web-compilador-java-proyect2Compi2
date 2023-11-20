package proy2.pila;

public class Main {

	void main() {
	    Pila pila = new Pila(6);
	    
	    pila.desapilar();
	    pila.apilar("x");
        pila.apilar("y");
        pila.apilar("z");
        String el = pila.desapilar();
        System.out.println("Desapilando: " + el);
        pila.apilar("w");
        pila.apilar("u");
        pila.apilar("v");
        pila.apilar("p");
        el = pila.desapilar();
        System.out.println("Desapilando: " + el);
        pila.apilar("o");
        pila.apilar("q");
        System.out.println("size: " + pila.getSize());
	}
}
