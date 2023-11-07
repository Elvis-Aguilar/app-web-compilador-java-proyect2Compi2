import { Injectable } from '@angular/core';
import { Archivo } from '../area-editor/objects/archivo';
import { AreaTrabajo } from '../area-editor/objects/area-trabjo';
import { CodigoFinal } from '../area-editor/objects/codigo-final';
import { Folder } from '../area-editor/objects/folder';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  proyect:Folder=new Folder('Sin Proyecto');
  archivos:Array<Archivo> =[] //archivos a editar
  areaTrabajo:AreaTrabajo = AreaTrabajo.EDITOR;
  code:CodigoFinal = new CodigoFinal('');
  content:string = '';
  
  constructor() { }

  public getProyect(): Archivo[]{
    return this.proyect.getArchivos();
  }

  public actulizarContent(){
    this.content = this.code.content;
  }


}
