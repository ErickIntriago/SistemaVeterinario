import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';

import { Cliente } from '../../models/cliente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-clientes',
  standalone:true,
  imports:[
    FormsModule,
    CommonModule
  ],
  templateUrl:'./clientes.component.html',
  styleUrl:'./clientes.component.css'
})
export class ClientesComponent {


clientes:Cliente[]=[];


cliente:Cliente={

cedula:"",
nombre:"",
apellido:"",
telefono:"",
direccion:"",
correo:""

};



constructor(
private servicio:ClienteService
){}



ngOnInit(){

this.cargarClientes();

}



cargarClientes(){

this.servicio.listarClientes()
.subscribe({

next:(data)=>{

this.clientes=data;

},

error:(error)=>{

console.log(error);

}

})

}



guardarCliente(){


this.servicio.registrarCliente(this.cliente)
.subscribe({

next:()=>{

alert("Cliente registrado");

this.cargarClientes();

},

error:(error)=>{

console.log(error);

}

})


}



}