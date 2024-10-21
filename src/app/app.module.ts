
import { TemaComponent } from './../android/tema/tema.component';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from '../android/usuario/usuario.component';
import { CompraComponent } from '../android/compra/compra.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CursoComponent } from '../android/curso/curso.component';
import { DetalleCompraComponent } from '../android/detalle-compra/detalle-compra.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    TemaComponent,
    CompraComponent,
    CursoComponent,
    DetalleCompraComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
