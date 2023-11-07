import { Component } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';
import { CodigoFinal } from '../../objects/codigo-final';

@Component({
  selector: 'app-console-assemble',
  templateUrl: './console-assemble.component.html',
  styleUrls: ['./console-assemble.component.css'],
})
export class ConsoleAssembleComponent {
  content: string = '';

  constructor(public sesion:SesionService){
    
  }
}
