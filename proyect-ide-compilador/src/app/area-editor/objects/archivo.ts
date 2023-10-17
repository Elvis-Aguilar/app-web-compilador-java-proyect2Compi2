export class Archivo{
    contenido:string = '';
    nombre:string = '';
    extension:string = '';

    constructor(nombre:string, extension:string){
        this.nombre = nombre;
        this.extension = extension;
    }

}