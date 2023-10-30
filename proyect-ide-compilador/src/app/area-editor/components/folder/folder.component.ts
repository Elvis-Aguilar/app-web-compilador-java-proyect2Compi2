import { Component, Input } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';
import Swal from 'sweetalert2';
import { Archivo } from '../../objects/archivo';
import { Folder } from '../../objects/folder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent {
  @Input() folder!: Folder;

  constructor(private sesion:SesionService){

  }

  editarArchivo(index:number){
    const archivo = this.folder.archivos[index];
    const archExist = this.sesion.archivos.find(arch => arch.nombre === archivo.nombre);
    if (!archExist) {
      this.sesion.archivos.push(archivo);
    }
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
        file.packageCompleto= this.folder.packageCompleto + '.' + result.value
        this.folder.folders.push(file);
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
        archivo.packageCompleto = this.folder.packageCompleto
        this.folder.archivos.push(archivo);
      }
    })

  }

}
