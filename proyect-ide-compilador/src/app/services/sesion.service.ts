import { Injectable } from '@angular/core';
import { Archivo } from '../area-editor/objects/archivo';
import { Folder } from '../area-editor/objects/folder';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  proyect:Folder=new Folder('Sin Proyecto');;
  archivos:Array<Archivo> =[]


  constructor() { }


}
