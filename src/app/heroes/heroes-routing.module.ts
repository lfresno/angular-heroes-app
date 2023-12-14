import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';


// /heroes/
const routes: Routes = [
  {
    path:'',
    component:LayoutPageComponent,
    children:[  //se definen las rurtas hijas
      //LAS RUTAS SE COMPRUEBAN EN ORDEN. hAY QUE PONER ABAJO LA MÁS GENÉRICA
      { path:'new-hero', component: NewPageComponent},
      { path:'search', component: SearchPageComponent},
      { path:'edit/:id', component: NewPageComponent},
      { path:'list', component: ListPageComponent},
      { path:':id', component: HeroPageComponent},  //:id es un comodín, hay que ponerla al última
      { path:'**', redirectTo: 'list'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
