import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private APP_SERVER = 'http://localhost:8080/persona/'

  constructor( private httpClient : HttpClient ) { }


  public getAllPersona():Observable<any>{

    return this.httpClient.get(this.APP_SERVER);

  }


  public savePersona(persona:any):Observable<any>{

    return this.httpClient.post(this.APP_SERVER, persona);
  }


  public deletePersona(id):Observable<any>{

    return this.httpClient.delete( this.APP_SERVER + "delete/" + id );
  }

}
