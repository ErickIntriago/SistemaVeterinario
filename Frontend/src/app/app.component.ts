import { Component } from '@angular/core';
import { ClientesComponent } from './components/clientes/clientes.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ClientesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}