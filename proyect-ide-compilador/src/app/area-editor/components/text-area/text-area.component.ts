import { Component } from '@angular/core';
import { ErrorSingleton } from 'src/app/logic/errors/error-singleton';
import { Parser } from 'src/app/parser/parser';
import { SesionService } from 'src/app/services/sesion.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import Swal from 'sweetalert2';
import { Archivo } from '../../objects/archivo';
import { CodigoFinal } from '../../objects/codigo-final';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
})
export class TextAreaComponent {
  content: string = '';
  archivoTmp!: Archivo;

  constructor(
    public sesion: SesionService,
    private soliService: SolicitudesService
  ) {}

  setContent(index: number) {
    if (!this.archivoTmp) {
      this.archivoTmp = this.sesion.archivos[index];
      this.content = this.archivoTmp.contenido;
      return;
    }
    const archivoExist = this.sesion.archivos.find(
      (arch) => arch.nombre === this.archivoTmp.nombre
    );
    if (archivoExist) {
      archivoExist.contenido = this.content;
    }
    this.archivoTmp = this.sesion.archivos[index];
    this.content = this.archivoTmp.contenido;
  }

  onCompilar() {
    ErrorSingleton.getInstance().limpiar();
    this.archivoTmp.contenido = this.content;
    const parser = new Parser(this.archivoTmp, this.sesion.proyect);
    if (this.content === undefined || this.content === '') {
      this.msTxtVacio();
    } else {
      const cuatetes = parser.parse();
      if (cuatetes) {
        this.soliService
          .generetCodigoFinal(cuatetes)
          .subscribe((result: CodigoFinal) => {
            if(result){
              this.sesion.code = result;
              this.msjOk();
            }else{
              this.mjsErro();
            }
          });
      }
    }
  }

  closeArchivo(index:number){
    this.sesion.archivos.splice(index,1);
  }

  private msTxtVacio() {
    Swal.fire('Texto vacio?', 'intentas compilar una clase vacia?', 'question');
  }

  private msjOk(){
    Swal.fire('Proeceso Exitoso', 'Compilacion exitosa revise el codigo final (3D)', 'success');
  }

  private mjsErro(){
    Swal.fire('Error', 'Error en la respuesta del servidor', 'error');
  }
}
