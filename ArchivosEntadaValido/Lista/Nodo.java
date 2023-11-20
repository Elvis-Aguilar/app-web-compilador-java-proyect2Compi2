package proy2.lista;

/**
 *
 * @author jose
 */
@Getter
@Setter
public class Nodo {
    private String contenido;
    private Nodo siguiente;
    private Nodo anterior;

  public Nodo(String contenido) {
        this.contenido = contenido;
    }
  
/*
    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public Nodo getSiguiente() {
        return siguiente;
    }

    public void setSiguiente(Nodo siguiente) {
        this.siguiente = siguiente;
    }

    public Nodo getAnterior() {
        return anterior;
    }

    public void setAnterior(Nodo anterior) {
        this.anterior = anterior;
    }
  */  
    
}

