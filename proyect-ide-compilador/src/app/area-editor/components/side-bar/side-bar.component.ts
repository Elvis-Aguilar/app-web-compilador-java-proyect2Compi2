import { Component } from '@angular/core';
import { ErrorSingleton } from 'src/app/logic/errors/error-singleton';
import { SesionService } from 'src/app/services/sesion.service';
import { AreaTrabajo } from '../../objects/area-trabjo';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  constructor(private sesion:SesionService) {

  }

  goErrors(){
    ErrorSingleton.getInstance().ordenarErrores();
    this.sesion.areaTrabajo = AreaTrabajo.ERRORES;
  }

  gotEditor(){
    this.sesion.areaTrabajo = AreaTrabajo.EDITOR;
  }

}
