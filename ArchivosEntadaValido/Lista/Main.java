package proy2.lista;

public class Main {

	void main() {
	    ListaDoble listaString = new ListaDoble();

            listaString.agregar("x");
            listaString.agregar("y");
            listaString.agregar("z");
            listaString.imprimirLista();
            
            
      //Nodo nodo = listaString.obtenerNodoAvanzando(1);
      //System.out.println("nodo avanzado: "+ nodo.getContenido());
      //Nodo nodo = listaString.obtenerNodoRetrocediendo(1);
      //System.out.println("nodo avanzado: "+ nodo.getContenido());
      //String result = listaString.obtenerContenido(1);
      //System.out.println("nodo avanzado: "+ result);
            
            listaString.eliminarUltimo();
            listaString.eliminarUltimo();
            listaString.imprimirLista();
            
            listaString.eliminarUltimo();
            listaString.imprimirLista();
        
	}
}
