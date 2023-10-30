import { Component } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';
import Swal from 'sweetalert2';
import { Archivo } from '../../objects/archivo';
import { Folder } from '../../objects/folder';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent {

  proyect!:Folder;

  constructor(private sesion:SesionService){
    this.proyect = sesion.proyect
  }
  
  editarArchivo(index:number){
    const archivo = this.sesion.proyect.archivos[index];
    const archExist = this.sesion.archivos.find(arch => arch.nombre === archivo.nombre);
    if (!archExist) {
      this.sesion.archivos.push(archivo);
    }
  }

  msjFolderVacio(){
    Swal.fire(
      'Sin Proyecto',
      'Aun no creas un Proyecto',
      'question'
    )
  }

  crearNuevoPaquete(){
    Swal.fire({
      title: 'Ingres el Nombre del Paquete',
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
        const file = new Folder(result.value);
        file.packageCompleto=this.sesion.proyect.packageCompleto + '.' + result.value
        this.sesion.proyect.folders.push(file);
      }
    })

  }

  crearArchivo(){
    Swal.fire({
      title: 'Ingres el Nombre del Archivo',
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
        const archivo = new Archivo(result.value, "java");
        archivo.packageCompleto = this.sesion.proyect.packageCompleto
        this.sesion.proyect.archivos.push(archivo);
      }
    })

  }




}
