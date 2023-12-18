import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [
  //se cargan por lazy load
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
    //si los usuarios están autenticados, no pueden acceder a estas rutas
    canActivate: [PublicGuard],
    canMatch: [PublicGuard]
  },
  {
    path:'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule),
    //si los usuarios no están autorizados con autguard, no van a poder acceder a estas rutas
    canActivate: [AuthGuard],
    canMatch: [AuthGuard]
  },


  {
    path:'404',
    component: Error404PageComponent
  },
  {
    path:'',
    redirectTo: 'heroes',
    pathMatch: 'full' //el path tiene que coincidir exactamente
  },
  {
    path:'**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
