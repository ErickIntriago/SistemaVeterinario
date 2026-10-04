import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';

import { Mascota } from '../../models/mascota';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/cliente';
import { MascotaService } from '../../services/mascota.service';


@Component({
  selector: 'app-mascotas',
  standalone:true,
  imports:[
    FormsModule,
    CommonModule
  ],
  templateUrl:'./mascotas.component.html',
  styleUrl:'./mascotas.component.css'
})
export class MascotasComponent {


mascotas:Mascota[]=[];


mascota:Mascota={

nombre:"",
raza:"",
sexo:"",
fecha_nacimiento:"",
id_cliente:0

  

};



constructor(
private servicio: MascotaService
){}



ngOnInit(){

this.cargarMascotas();

}



cargarMascotas(){

this.servicio.listarMascotas()
.subscribe({

next:(data)=>{

this.mascotas=data;

},

error:(error)=>{

console.log(error);

}

})

}



guardarMascota(){


this.servicio.registrarMascota(this.mascota)
.subscribe({

next:()=>{

alert("Mascota registrada");

this.cargarMascotas();

},

error:(error)=>{

console.log(error);

}

})


}



}