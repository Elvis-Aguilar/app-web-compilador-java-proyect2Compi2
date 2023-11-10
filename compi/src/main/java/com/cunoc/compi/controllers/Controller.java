package com.cunoc.compi.controllers;

import com.cunoc.compi.models.CodigoFinal;
import com.cunoc.compi.models.GeneradorCodigoFinal;
import com.cunoc.compi.models.Quartet;
import com.cunoc.compi.models.proyects.Folder;
import com.cunoc.compi.models.proyects.ManejadorArchivos;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author elvis_agui
 */
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/quartet-generator")
public class Controller {
    
    ManejadorArchivos menjador = new ManejadorArchivos();

    @PostMapping(path = "/code-3D")
    public CodigoFinal generarCodigo(@RequestBody Quartet quartets[]) {
        GeneradorCodigoFinal generador = new GeneradorCodigoFinal(quartets);
        CodigoFinal code = new CodigoFinal(generador.codigoResult());
        System.out.println("-----------CODIGO FINAL-------------\n");
        System.out.println(code.getContent());
        System.out.println("\n");
        System.out.println("------------------------------------------------------------------------");
        for (Quartet quartet : quartets) {
            System.out.println(quartet.toString());
        }
        return code;
    }

    @GetMapping(path = "/get-proyects")
    public List<Folder> getProyects() {
        String nombreBin = "Proyects.bin";
        ArrayList<Folder> proyect = this.menjador.readProyects(nombreBin);
        return proyect;
    }
    
    @PostMapping(path = "/save-proyect")
    public List<Folder> saveProyect(@RequestBody Folder proyect) {
        String nombreBin = "Proyects.bin";
        ArrayList<Folder> proyects = this.menjador.readProyects(nombreBin);
        int index = -1;
        for (int i = 0; i < proyects.size(); i++) {
            if (proyects.get(i).getNombre().equals(proyect.getNombre())) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            proyects.add(proyect);
        }else{
            proyects.set(index, proyect);
        }
        this.menjador.saveProyects(nombreBin, proyects);
        return proyects;
    }
}
