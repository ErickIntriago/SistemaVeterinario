import { Injectable } from '@angular/core';
import { Recetas } from '../models/recetas';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  private url = "http://127.0.0.1:8000/recetas";


  constructor(
    private http: HttpClient
  ) { }



  listarRecetas(): Observable<Recetas[]> {

    return this.http.get<Recetas[]>(
      this.url + "/"
    );

  }



  registrarReceta(receta:Recetas):Observable<any>{

    return this.http.post(
      this.url + "/",
      receta
    );

  }


}
