package proy2.lista;


/**
 *
 * @author jose
 */
public class ListaDoble {
    private Nodo primero;
    private Nodo ultimo;
    private int size;
    
    public void agregar(String contenido) {
        Nodo nuevoNodo = new Nodo(contenido);
        if (esVacia()) {
            this.primero = nuevoNodo;
            this.ultimo = nuevoNodo;
        } else {
            this.ultimo.setSiguiente(nuevoNodo);
            nuevoNodo.setAnterior(this.ultimo);
            this.ultimo = nuevoNodo;
        }
        
        this.size++;
    }
    
    public boolean esVacia() {
        return this.primero == null;
    }

    public String obtenerContenido(int index) {
      Nodo tmp = obtenerNodo(index);
        return tmp.getContenido();
    }
    
    public void eliminarUltimo() {
        if (esVacia()) {
            System.out.println("La lista esta vacia");
        } else {
            if (this.size == 1) {
                this.primero = null;
                this.ultimo = null;
            } else {
                Nodo penultimo = this.ultimo.getAnterior();
                penultimo.setSiguiente(null);
                this.ultimo.setAnterior(null);
                this.ultimo = penultimo;
            }
        
            this.size--;
        }
    }
    
    public void imprimirLista() {
        if (esVacia()) {
            System.out.println("La lista esta vacia");
        } else {
            Nodo actual = this.primero;
            while(actual.getSiguiente() != null) {
                System.out.println("contenido: " + actual.getContenido());
                actual = actual.getSiguiente();
            }
            System.out.println("contenido: " + actual.getContenido());
        }
    }

        private Nodo obtenerNodo(int index) {
        if (esVacia()) {
            System.out.println("La lista esta vacia.");
            return null;
        } else if (index >= this.size || index < 0) {
            System.out.println("El indice esta fuera del tama;o de la lista.");
            return null;
        }else{
            int medio = this.size / 2;
            if (index < medio) {
                return obtenerNodoAvanzando(index);
            } else {
                return  obtenerNodoRetrocediendo(index);
            }
        }
            
    }
    
    private Nodo obtenerNodoAvanzando(int index) {
        Nodo actual = this.primero;
        for (int i = 0; i < index; i++) {
            actual = actual.getSiguiente();
        }
        return actual;
    }
    
    private Nodo obtenerNodoRetrocediendo(int index) {
        int indiceFinal = this.size - 1;
        int limite = indiceFinal - index;
        Nodo actual = this.ultimo;
        for (int i = 0; i < limite; i++) {
            actual = actual.getAnterior();
        }

        return actual;
    }
}

