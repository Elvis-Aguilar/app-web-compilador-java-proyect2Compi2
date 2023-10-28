import { Archivo } from './archivo';

export class Folder {
  nombre: String = '';
  folders: Array<Folder> = [];
  archivos: Array<Archivo> = [];

  constructor(nombre?: String) {
    this.nombre = nombre || '';
  }


  public getArchivos():Archivo[]{
    let archivos:Array<Archivo> = [];
    this.folders.forEach(folder => {
        archivos = archivos.concat(folder.getArchivos());
    });
    archivos = archivos.concat(this.archivos);
    return archivos;
  }
}
