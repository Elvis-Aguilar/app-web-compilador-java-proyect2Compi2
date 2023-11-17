package com.cunoc.compi.models.proyects;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author elvis_agui
 */
public class Folder implements Serializable {

    private String nombre;
    private String packageCompleto;
    private ArrayList<Folder> folders;
    private ArrayList<Archivo> archivos;

    public Folder(String nombre, String packageCompleto, ArrayList<Folder> folders, ArrayList<Archivo> archivos) {
        this.nombre = nombre;
        this.packageCompleto = packageCompleto;
        this.folders = folders;
        this.archivos = archivos;
    }

    public Folder() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPackageCompleto() {
        return packageCompleto;
    }

    public void setPackageCompleto(String packageCompleto) {
        this.packageCompleto = packageCompleto;
    }

    public ArrayList<Folder> getFolders() {
        return folders;
    }

    public void setFolders(ArrayList<Folder> folders) {
        this.folders = folders;
    }

    public ArrayList<Archivo> getArchivos() {
        return archivos;
    }

    public void setArchivos(ArrayList<Archivo> archivos) {
        this.archivos = archivos;
    }

    @Override
    public String toString() {
        return "Folder{" + "nombre=" + nombre + ", packageCompleto=" + packageCompleto + ", folders=" + folders + ", archivos=" + archivos + '}';
    }

}
