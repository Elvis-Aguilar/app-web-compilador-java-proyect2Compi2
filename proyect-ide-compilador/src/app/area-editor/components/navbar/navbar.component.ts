import { Component } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';
import Swal from 'sweetalert2';
import { Folder } from '../../objects/folder';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  Proyect:Folder

  constructor(private sesion:SesionService){
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
        this.sesion.proyect.nombre = result.value
        this.sesion.proyect.folders.splice(0,this.sesion.proyect.folders.length)
        this.sesion.proyect.archivos.splice(0,this.sesion.proyect.archivos.length)
        //TODO: limpiar las pestanias
      }
    })
  }

  

  msj(){
    Swal.fire(
      'Texto vacio?',
      'intentas compilar una clase vacia?',
      'question'
    )
  }

}
