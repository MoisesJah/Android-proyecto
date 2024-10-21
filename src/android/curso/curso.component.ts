import { Component, OnInit } from '@angular/core';
import { Curso } from '../Models/curso';
import { CursoService } from '../services/curso-service/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  cursos: Curso[] = [];
  cursosFiltrados: Curso[] = [];
  busqueda: string = '';
  mostrarFormulario: boolean = false;
  nuevoCurso: Curso = { idcurso: 0, nombre: '', descripcion: '', precio: 0, idcategoria: 0, img: '' };
  mensajeError: string = '';

  constructor(private cursoService: CursoService) {}

  ngOnInit() {
    this.listarCursos();
  }

  listarCursos() {
    this.cursoService.listarCursos().subscribe(
      (data) => {
        this.cursos = data;
        this.cursosFiltrados = data;
      },
      (error) => {
        this.mensajeError = 'Error al cargar los cursos';
      }
    );
  }

  filtrarCursos() {
    this.cursosFiltrados = this.cursos.filter(curso =>
      curso.idcurso.toString().includes(this.busqueda) ||
      curso.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  crearCurso() {
    this.cursoService.registrarCurso(this.nuevoCurso).subscribe(
      (cursoCreado) => {
        this.cursos.push(cursoCreado);
        this.cursosFiltrados.push(cursoCreado);
        this.mostrarFormulario = false;
        this.nuevoCurso = { idcurso: 0, nombre: '', descripcion: '', precio: 0, idcategoria: 0, img: '' };
      },
      (error) => {
        this.mensajeError = 'Error al registrar el curso';
      }
    );
  }

  actualizarCurso(id: number) {
    const cursoAActualizar = this.cursos.find(curso => curso.idcurso === id);
    if (cursoAActualizar) {
      this.cursoService.actualizarCurso(cursoAActualizar).subscribe(
        () => {
          this.mensajeError = 'Curso actualizado exitosamente';
          this.listarCursos(); // Actualizar la lista después de la actualización
        },
        (error) => {
          this.mensajeError = 'Error al actualizar el curso';
        }
      );
    } else {
      this.mensajeError = 'Curso no encontrado';
    }
  }

  eliminarCurso(id: number) {
    this.cursoService.eliminarCurso(id).subscribe(
      () => {
        this.cursos = this.cursos.filter(curso => curso.idcurso !== id);
        this.cursosFiltrados = this.cursosFiltrados.filter(curso => curso.idcurso !== id);
        this.mensajeError = 'Curso eliminado exitosamente';
      },
      (error) => {
        this.mensajeError = 'Error al eliminar el curso';
      }
    );
  }
}
