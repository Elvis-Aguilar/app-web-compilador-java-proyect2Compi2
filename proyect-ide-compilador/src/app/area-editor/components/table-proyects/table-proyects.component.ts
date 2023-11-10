import { Component } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import Swal from 'sweetalert2';
import { Folder } from '../../objects/folder';

@Component({
  selector: 'app-table-proyects',
  templateUrl: './table-proyects.component.html',
  styleUrls: ['./table-proyects.component.css']
})
export class TableProyectsComponent {
  proyects:Folder[] = [];

  constructor(private sesion:SesionService, private soli:SolicitudesService){
    this.soli.getProyects().subscribe((creates:Folder[])=>{
      this.proyects = creates;
    });
  }

  public refrescarProyects(){
    this.soli.getProyects().subscribe((creates:Folder[])=>{
      this.proyects = creates;
      console.log(this.proyects);
      
    });
  }

  public seleccionar(proyec:Folder){
    this.sesion.proyect.folders.splice(0,this.sesion.proyect.folders.length);
    this.sesion.proyect.archivos.splice(0,this.sesion.proyect.archivos.length);
    this.sesion.archivos.splice(0, this.sesion.archivos.length);
    this.sesion.proyect.nombre = proyec.nombre;
    this.sesion.proyect.packageCompleto = proyec.packageCompleto
    this.sesion.proyect.archivos=proyec.archivos
    this.sesion.proyect.folders = proyec.folders
    console.log(this.sesion.proyect);
    
    Swal.fire(
      'Correcto',
      'Dirigite al area de editor JAVA',
      'success'
    )
  }

}
