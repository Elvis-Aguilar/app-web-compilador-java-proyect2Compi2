
package com.cunoc.compi.models.proyects;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
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
    
    public void saveCodeC(String code){
        String nombreArchivo = "program.c";
         try (BufferedWriter writer = new BufferedWriter(new FileWriter(nombreArchivo, false))) {
            writer.write(code);
            System.out.println("Archivo " + nombreArchivo + " sobrescrito exitosamente.");
        } catch (IOException e) {
            System.out.println("Ocurrió un error al sobrescribir el archivo: " + e.getMessage());
        }
    }
    
    public boolean compilarArchivo(){
        boolean compilado =  false;
        String nombreArchivo = "program.c";
        String comandoCompilacion = "gcc -o ejecutable " + nombreArchivo;
        try {
            ProcessBuilder builder = new ProcessBuilder("/bin/bash", "-c", comandoCompilacion);

            Process proceso = builder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(proceso.getInputStream()));
            String linea;
            while ((linea = reader.readLine()) != null) {
                System.out.println(linea);
            }

            int exitCode = proceso.waitFor();
            if (exitCode == 0) {
                compilado = true;
                System.out.println("Archivo C compilado exitosamente.");
            } else {
                System.out.println("Hubo un error al compilar el archivo C.");
            }
        } catch (IOException | InterruptedException e) {
            System.out.println("Ocurrió un error al compilar el archivo C: " + e.getMessage());
        }
        
        return compilado;
    }
    
    public byte[] leerArchivoComoBytes(){
        File archivo = new File("ejecutable");
        byte[] contenidoArchivo;
        try (FileInputStream fis = new FileInputStream(archivo)) {
            contenidoArchivo = new byte[(int) archivo.length()];
            fis.read(contenidoArchivo);
        }catch(IOException x){
            System.out.println("error en leerchivoBinario "+x.getMessage());
            return null;
        }
        return contenidoArchivo;
    }
    
}
