import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../../Models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private baseUrl = 'https://codev-api-0w83.onrender.com/curso';

  constructor(private http: HttpClient) {}

  listarCursos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`);
  }

  buscarCurso(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/buscar/${id}`);
  }

  buscarCursoComprado(idUsuario: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/buscarcursocomprado/${idUsuario}`);
  }

  buscarPorCategoria(idCategoria: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/buscarporcat/${idCategoria}`);
  }

  registrarCurso(curso: Curso): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrar`, curso);
  }

  actualizarCurso(curso: Curso): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizar`, curso);
  }

  eliminarCurso(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`);
  }
}
