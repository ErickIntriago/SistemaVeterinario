
import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  clientes: Cliente[] = [];

  cliente: Cliente = {
    cedula: "",
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    correo: ""
  };

  editando: boolean = false;
  idEditando: number = 0;

  constructor(
    private servicio: ClienteService
  ) {}

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.servicio.listarClientes()
      .subscribe({
        next: (data) => {
          this.clientes = data;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  guardarCliente() {

    if (this.editando) {

      this.servicio.actualizarCliente(
        this.idEditando,
        this.cliente
      )
      .subscribe({
        next: () => {
          alert("Cliente actualizado");
          this.cargarClientes();
          this.cancelarEdicion();
        },
        error: (error) => {
          console.log(error);
        }
      });

    } else {

      this.servicio.registrarCliente(this.cliente)
        .subscribe({
          next: () => {
            alert("Cliente registrado");
            this.cargarClientes();
            this.limpiarFormulario();
          },
          error: (error) => {
            console.log(error);
          }
        });

    }

  }

  editarCliente(cliente: Cliente) {

    this.editando = true;

    this.idEditando = cliente.id_cliente!;

    this.cliente = {
      cedula: cliente.cedula,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      correo: cliente.correo
    };

  }

  eliminarCliente(id: number) {

    if (confirm("¿Está seguro de eliminar este cliente?")) {

      this.servicio.eliminarCliente(id)
        .subscribe({
          next: () => {
            alert("Cliente eliminado");
            this.cargarClientes();
          },
          error: (error) => {
            console.log(error);
          }
        });

    }

  }

  cancelarEdicion() {

    this.editando = false;
    this.idEditando = 0;

    this.limpiarFormulario();

  }

  limpiarFormulario() {

    this.cliente = {
      cedula: "",
      nombre: "",
      apellido: "",
      telefono: "",
      direccion: "",
      correo: ""
    };

  }

}