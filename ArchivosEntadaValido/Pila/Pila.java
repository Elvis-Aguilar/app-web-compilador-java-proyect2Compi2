package proy2.pila;

@Getter
public class Pila {
    private int size;
    private String arregloPila[];
    private int tope;

    public Pila(int size) {
        this.size = size;
        this.arregloPila = new String[size];
        this.tope = 0;
    }
    
    
    
    public void apilar(String elemento) {
        if (estaLlena()) {
            System.out.println("La pila esta llena.");
        } else {
            this.arregloPila[this.tope] = elemento;
            this.tope++;
        }
    }
    
    public String desapilar() {
        if (estaVacia()) {
            System.out.println("La pila esta vacia, nada que desapilar.");
            return "";
        }else{
            this.tope--;
            String elemento = this.arregloPila[this.tope];
             return elemento;
        }
    }
    
    public boolean estaLlena() {
        return this.tope == this.size;
    }
    
    public boolean estaVacia() {
        return this.tope == 0;
    }
    
    /*public int getSize() {
    	return size;
    }*/
}
