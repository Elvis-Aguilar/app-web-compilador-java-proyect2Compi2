package com.cunoc.compi.controllers;

import com.cunoc.compi.models.CodigoFinal;
import com.cunoc.compi.models.GeneradorCodigoFinal;
import com.cunoc.compi.models.Quartet;
import org.springframework.web.bind.annotation.CrossOrigin;
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

}
