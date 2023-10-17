import { Component } from '@angular/core';
import {Parser} from 'src/app/parser/parser'
import { SesionService } from 'src/app/services/sesion.service';
import Swal from 'sweetalert2';
import { Archivo } from '../../objects/archivo';



@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})

export class TextAreaComponent {
  content:string="";
  archivoTmp!:Archivo

  constructor(public sesion:SesionService) {

  }

  setContent(index:number){
    if (!this.archivoTmp) {
      this.archivoTmp = this.sesion.archivos[index];
      this.content = this.archivoTmp.contenido;
      return 
    }
    const archivoExist = this.sesion.archivos.find(arch => arch.nombre === this.archivoTmp.nombre);
    if (archivoExist) {
      archivoExist.contenido = this.content
    }
    this.archivoTmp = this.sesion.archivos[index];
    this.content = this.archivoTmp.contenido

  }

  onCompilar() {
    const parser = new Parser(this.content);
    if(this.content === undefined || this.content === "") {
      this.msTxtVacio()
    }else{      
      parser.parse();
    }
  }

  private msTxtVacio(){
    Swal.fire(
      'Texto vacio?',
      'intentas compilar una clase vacia?',
      'question'
    )
  }
}
