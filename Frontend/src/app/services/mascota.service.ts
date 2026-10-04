import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Citas } from '../models/citas';
import { Mascota } from '../models/mascota';



@Injectable({
  providedIn: 'root'
})
export class MascotaService {


  private url = "http://127.0.0.1:8000/mascotas";


  constructor(
    private http: HttpClient
  ) { }



  listarMascotas(): Observable<Mascota[]> {

    return this.http.get<Mascota[]>(
      this.url + "/"
    );

  }



  registrarMascota(mascota:Mascota):Observable<any>{

    return this.http.post(
      this.url + "/",
      mascota
    );

  }


}