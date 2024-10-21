import { TemaComponent } from './../android/tema/tema.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from '../android/usuario/usuario.component';
import { CompraComponent } from '../android/compra/compra.component';
import { CursoComponent } from '../android/curso/curso.component';
import { DetalleCompraComponent } from '../android/detalle-compra/detalle-compra.component';


const routes: Routes = [
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'temas', component: TemaComponent },
  { path: 'compras', component: CompraComponent },
  { path: 'cursos', component: CursoComponent },
  { path: 'detalle-compra', component: DetalleCompraComponent },
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
