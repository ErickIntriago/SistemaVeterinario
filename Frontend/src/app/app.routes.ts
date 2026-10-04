import { Routes } from '@angular/router';

import { ClientesComponent } from './components/clientes/clientes.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { VeterinarioComponent } from './components/veterinario/veterinario.component';
import { RecetasComponent } from './components/recetas/recetas.component';
import { CitasComponent } from './components/citas/citas.component';

export const routes: Routes = [

  {
    path: 'clientes',
    component: ClientesComponent
  },

  {
    path: 'mascotas',
    component: MascotasComponent
  },

  {
    path: 'veterinarios',
    component: VeterinarioComponent
  },

  {
    path: 'recetas',
    component: RecetasComponent
  },

  {
    path: 'citas',
    component: CitasComponent
  },

  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full'
  }

];