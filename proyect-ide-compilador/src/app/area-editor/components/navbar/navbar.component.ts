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

  descargarEjecC3D(){
    if(this.sesion.code.content === ''){
      Swal.fire(
        'No hay Codigo Final',
        'Antes de descargar el ejecutable debes compilar a codigo 3 direcciones',
        'error'
      )
    }else{
      this.solici.downloadC3D().subscribe(
        (fileContent: ArrayBuffer) => {
          this.descargarArchivo(fileContent, 'ejecutable');
         /** Swal.fire(
            'compilado con exito',
            'Proceso de compilacion con exito',
            'success'
          ) */
        },
        (error) => {
          console.error('Error al descargar el archivo:', error);
        }
      );
    }
  }

  private descargarArchivo(data: ArrayBuffer, nombreArchivo: string) {
    const blob = new Blob([data], { type: 'application/octet-stream' });

    // Crear URL del Blob
    const url = window.URL.createObjectURL(blob);

    // Crear un enlace <a> oculto en el DOM y simular clic para descargar el archivo
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = nombreArchivo;
    enlace.style.display = 'none';
    document.body.appendChild(enlace);
    enlace.click();

    // Liberar la URL del Blob después de la descarga
    window.URL.revokeObjectURL(url);
    document.body.removeChild(enlace);
  }

}
