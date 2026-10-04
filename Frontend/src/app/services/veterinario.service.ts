import { Injectable } from '@angular/core';
import { Recetas } from '../models/recetas';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

import { Veterinario } from '../models/veterinario';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  private url = "http://127.0.0.1:8000/veterinario";


  constructor(
    private http: HttpClient
  ) { }



  listarVeterinarios(): Observable<Veterinario[]> {

    return this.http.get<Veterinario[]>(
      this.url + "/"
    );

  }



  registrarVeterinario(veterinario: Veterinario): Observable<any> {

    return this.http.post(
      this.url + "/",
      veterinario
    );

  }


}
