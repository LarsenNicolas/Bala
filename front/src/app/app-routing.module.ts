import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EventoComponent } from './components/evento/evento.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path:"home", component: HomeComponent},
  {path:"login", component: LoginComponent},
  { path: "registro", component: RegistroComponent },
  { path: "autenticacion", component: AuthenticationComponent },
  { path: "evento/:id", component: EventoComponent },
  { path: "carrito", component: CarritoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
