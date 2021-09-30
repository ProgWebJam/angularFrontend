import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private APP_SERVER = 'http://localhost:8080/estado/'

  constructor( private httpClient : HttpClient ) { }

  public getAllEstadoByPais(idPais): Observable<any>{

    return this.httpClient.get(this.APP_SERVER + idPais)

  }
}
