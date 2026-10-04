import { Component } from '@angular/core';
import { Citas } from '../../models/citas';
import { VeterinarioService } from '../../services/veterinario.service';
import { Recetas } from '../../models/recetas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Veterinario } from '../../models/veterinario';

@Component({
  selector: 'app-veterinario',
  standalone:true,
  imports:[
    FormsModule,
    CommonModule
  ],
  templateUrl:'./veterinario.component.html',
  styleUrl:'./veterinario.component.css'
})
export class VeterinarioComponent {
  
veterinarios: Veterinario[] = [];

veterinario: Veterinario = {
  nombre: "",
  especialidad: ""
};

  constructor(
    private servicio: VeterinarioService
  ) {}

  ngOnInit() {
    this.cargarVeterinarios();
  }

  cargarVeterinarios() {
    this.servicio.listarVeterinarios()
      .subscribe({
        next: (data) => {
          this.veterinarios = data;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  guardarVeterinario() {
    this.servicio.registrarVeterinario(this.veterinario)
      .subscribe({
        next: () => {
          alert("Veterinario registrado");
          this.cargarVeterinarios();
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

}
