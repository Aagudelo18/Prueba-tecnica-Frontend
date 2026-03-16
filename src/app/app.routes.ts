import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { BodegasComponent } from './components/bodegas/bodegas.component';
import { PuertosComponent } from './components/puertos/puertos.component';
import { EnviosComponent } from './components/envios/envios.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path:'registro', component: RegistroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'bodegas', component: BodegasComponent },
  { path: 'puertos', component: PuertosComponent },
  { path: 'envios', component: EnviosComponent },
];
