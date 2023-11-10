
package com.cunoc.compi.models.proyects;

import java.io.Serializable;

/**
 *
 * @author elvis_agui
 */
public class Archivo implements Serializable{
    
    private String contenido;
    private String nombre;
    private String extension;
    private String packageCompleto;

    public Archivo(String contenido, String nombre, String extension, String packageCompleto) {
        this.contenido = contenido;
        this.nombre = nombre;
        this.extension = extension;
        this.packageCompleto = packageCompleto;
    }

    public Archivo() {
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public String getPackageCompleto() {
        return packageCompleto;
    }

    public void setPackageCompleto(String packageCompleto) {
        this.packageCompleto = packageCompleto;
    }
    
    
    
}
