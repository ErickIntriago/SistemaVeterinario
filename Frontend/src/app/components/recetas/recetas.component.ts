import { Component } from '@angular/core';
import { Citas } from '../../models/citas';
import { RecetasService } from '../../services/recetas.service';
import { Recetas } from '../../models/recetas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recetas',
  standalone:true,
  imports:[
    FormsModule,
    CommonModule
  ],
  templateUrl:'./recetas.component.html',
  styleUrl:'./recetas.component.css'
})
export class RecetasComponent {
  
recetas: Recetas[] = [];

receta: Recetas = {
  fecha: "",
  indicaciones: "",
  medicamento: "",
  id_historia: 0
};

  constructor(
    private servicio: RecetasService
  ) {}

  ngOnInit() {
    this.cargarRecetas();
  }

  cargarRecetas() {
    this.servicio.listarRecetas()
      .subscribe({
        next: (data) => {
          this.recetas = data;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  guardarReceta() {
    this.servicio.registrarReceta(this.receta)
      .subscribe({
        next: () => {
          alert("Receta registrada");
          this.cargarRecetas();
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

}
