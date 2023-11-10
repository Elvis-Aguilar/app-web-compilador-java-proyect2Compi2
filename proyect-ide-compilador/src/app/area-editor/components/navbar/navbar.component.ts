import { Component } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';
import Swal from 'sweetalert2';
import { Folder } from '../../objects/folder';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { AreaTrabajo } from '../../objects/area-trabjo';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  Proyect:Folder

  constructor(private sesion:SesionService, private solici:SolicitudesService){
    this.Proyect = sesion.proyect
  }

  crearProyecto(){
     Swal.fire({
      title: 'Ingres el Nombre del Proyecto',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (result) => {
        if (result === '') {
          Swal.showValidationMessage(
            `Ingrese un nombre valido`
          )
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.sesion.proyect.nombre = result.value;
        this.sesion.proyect.packageCompleto = result.value;
        this.sesion.proyect.folders.splice(0,this.sesion.proyect.folders.length);
        this.sesion.proyect.archivos.splice(0,this.sesion.proyect.archivos.length);
        this.sesion.archivos.splice(0, this.sesion.archivos.length);
      }
    })
  }

  guardarProyecto(){
    if (this.sesion.proyect.nombre !== 'Sin Proyecto') {
      this.solici.saveProyects(this.sesion.proyect).subscribe(
        (proyec:Folder[])=>{
          Swal.fire(
            'Guardado con exito',
            'Se guardo su poryecto con exito',
            'success'
          )
        }
      );
    }else{
      Swal.fire(
        'Sin Proyecto?',
        'No existe proyecto creado para poder guardarlo',
        'error'
      )
    }
  }

  goProyects(){
    this.sesion.areaTrabajo = AreaTrabajo.PROYECTS;
  }

  

  msj(){
    Swal.fire(
      'Texto vacio?',
      'intentas compilar una clase vacia?',
      'question'
    )
  }

}
