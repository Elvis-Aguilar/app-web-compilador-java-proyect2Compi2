import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quartet } from '../logic/quartets/quartet';
import { CodigoFinal } from '../area-editor/objects/codigo-final';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  private readonly API_URL = 'http://localhost:8080/quartet-generator/';

  constructor(private http: HttpClient) {}

  public generetCodigoFinal(quatetes: Quartet[]): Observable<CodigoFinal> {
    return this.http.post<CodigoFinal>(
      this.API_URL + 'code-3D',
      quatetes
    );
  }
}
