import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Citas } from '../models/citas';
import { Cliente } from '../models/cliente';


@Injectable({
  providedIn: 'root'
})
export class CitasService {


  private url = "http://127.0.0.1:8000/citas";


  constructor(
    private http: HttpClient
  ) { }



  listarCitas(): Observable<Citas[]> {

    return this.http.get<Citas[]>(
      this.url + "/"
    );

  }



  registrarCita(cita:Citas):Observable<any>{

    return this.http.post(
      this.url + "/",
      cita
    );

  }


}