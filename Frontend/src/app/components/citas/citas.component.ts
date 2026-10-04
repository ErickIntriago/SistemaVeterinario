import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Citas } from '../../models/citas';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-citas',
  standalone: true,

  imports: [
    FormsModule,
    CommonModule
  ],

  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent {

  citas: Citas[] = [];

  cita: Citas = {
    fecha: "",
    motivo: "",
    estado: "",
    id_mascota: 0,
    id_veterinario: 0
  };

  constructor(
    private servicio: CitasService
  ) {}

  ngOnInit() {
    this.cargarCitas();
  }

  cargarCitas() {
    this.servicio.listarCitas()
      .subscribe({
        next: (data) => {
          this.citas = data;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  guardarCita() {
    this.servicio.registrarCita(this.cita)
      .subscribe({
        next: () => {
          alert("Cita registrada");
          this.cargarCitas();
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
}