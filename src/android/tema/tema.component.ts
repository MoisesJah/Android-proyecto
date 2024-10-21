import { Component, OnInit } from '@angular/core';
import { TemaService } from '../services/tema-service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  temas: any[] = [];
  temasFiltrados: any[] = [];
  nuevoTema: any = {};
  busqueda: string = '';
  mostrarFormulario: boolean = false;
  mensajeError: string | null = null;

  constructor(private temaService: TemaService) {}

  ngOnInit(): void {
    this.listarTemas();
  }

  listarTemas(): void {
    this.temaService.listarTemas().subscribe(data => {
      this.temas = data;
      this.temasFiltrados = data;
    });
  }

  crearTema(): void {
    if (!this.nuevoTema.idcurso || !this.nuevoTema.nombre || !this.nuevoTema.descripcion || !this.nuevoTema.URL) {
      this.mensajeError = "Por favor, completa todos los campos.";
      return;
    }

    this.temaService.crearTema(this.nuevoTema).subscribe(() => {
      this.listarTemas();
      this.nuevoTema = {};
      this.mostrarFormulario = false;
      this.mensajeError = null;
    });
  }

  actualizarTema(id: number): void {
    const updatedData = {
      idcurso: this.nuevoTema.idcurso,
      nombre: this.nuevoTema.nombre,
      descripcion: this.nuevoTema.descripcion,
      URL: this.nuevoTema.URL
    };

    this.temaService.actualizarTema(id, updatedData).subscribe(() => {
      this.listarTemas();
      this.nuevoTema = {};
      this.mostrarFormulario = false;
      this.mensajeError = null;
    });
  }

  eliminarTema(id: number): void {
    this.temaService.eliminarTema(id).subscribe(() => {
      this.listarTemas();
    });
  }

  filtrarTemas(): void {
    this.temasFiltrados = this.temas.filter(tema =>
      tema.idtema.toString().includes(this.busqueda) ||
      tema.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }
}
