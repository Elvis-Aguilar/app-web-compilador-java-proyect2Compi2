import { Component } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {

  constructor(public sesion:SesionService){

  }
}
