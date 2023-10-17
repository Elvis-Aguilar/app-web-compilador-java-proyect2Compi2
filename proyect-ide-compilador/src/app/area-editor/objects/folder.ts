import { Archivo } from "./archivo";

export class Folder{

    nombre:String = '';
    folders: Array<Folder>= [];
    archivos: Array<Archivo>= [];

    constructor(nombre?:String){
        this.nombre = nombre || '';
    }


}