export class Archivo{
    contenido:string = '';
    nombre:string = '';
    extension:string = '';
    packageCompleto:String = ''

    constructor(nombre:string, extension:string){
        this.nombre = nombre;
        this.extension = extension;
    }

}