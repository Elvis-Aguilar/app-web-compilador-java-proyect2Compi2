
package com.cunoc.compi.models.proyects;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import javax.swing.JOptionPane;

/**
 *
 * @author elvis_agui
 */
public class ManejadorArchivos {
    
    public void saveProyects(String nombreArchivo, ArrayList<Folder> proyect) {
        this.crearArvhivosBin(nombreArchivo);
        try (ObjectOutputStream salida = new ObjectOutputStream(new FileOutputStream(nombreArchivo))) {
            salida.writeObject(proyect);
        } catch (IOException e) {
            //e.printStackTrace();
            System.err.println("Error en Guardar archivo Binario");
            //JOptionPane.showMessageDialog(null, "Error Guardar del archivo Binario, de las Pistas :(");
        }
    }
    
    public ArrayList<Folder> readProyects(String nombreArchivo) {
        ArrayList<Folder> proyect = new ArrayList<>();
        File archivo = new File(nombreArchivo);
        if (!archivo.exists()) {
            //validacion de archivo
            return proyect;
        }
        try (ObjectInputStream entrada = new ObjectInputStream(new FileInputStream(nombreArchivo))) {
            proyect = (ArrayList<Folder>) entrada.readObject();
        } catch (IOException | ClassNotFoundException e) {
            System.err.println("Error en la lectura del archivo Binario");
            //JOptionPane.showMessageDialog(null, "Error la lectura del archivo Binario, de las Pistas :(");
        }
        return proyect;
    }
    
    
    /**
     * funcion que crea el archivo si no existe
     *
     * @param nombreArchivo
     */
    private void crearArvhivosBin(String nombreArchivo) {
        File archivo = new File(nombreArchivo);
        if (!archivo.exists()) {
            try {
                archivo.createNewFile();
            } catch (IOException e) {
                JOptionPane.showMessageDialog(null, "Error en la creacion del archivo Bin :(");
            }
        }
    }
    
}
