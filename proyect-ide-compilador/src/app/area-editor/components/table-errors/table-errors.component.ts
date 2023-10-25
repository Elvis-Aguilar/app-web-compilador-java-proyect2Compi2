import { Component } from '@angular/core';
import { ErrorSingleton } from 'src/app/logic/errors/error-singleton';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-table-errors',
  templateUrl: './table-errors.component.html',
  styleUrls: ['./table-errors.component.css']
})
export class TableErrorsComponent {

  errores:ErrorSingleton;

  constructor(public sesion:SesionService){
    this.errores = ErrorSingleton.getInstance();
  }
}
