import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  private url = "http://127.0.0.1:8000/clientes";


  constructor(
    private http: HttpClient
  ) { }



  listarClientes(): Observable<Cliente[]> {

    return this.http.get<Cliente[]>(
      this.url + "/"
    );

  }



  registrarCliente(cliente:Cliente):Observable<any>{

    return this.http.post(
      this.url + "/",
      cliente
    );

  }


}