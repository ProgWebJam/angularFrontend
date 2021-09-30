import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private APP_SERVER = 'http://localhost:8080/pais/'

  constructor( private httpClient : HttpClient) { }


  public getAllpais(): Observable<any>{

    return this.httpClient.get(this.APP_SERVER)

  }


}
