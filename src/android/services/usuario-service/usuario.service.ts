import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../Models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'https://codev-api-0w83.onrender.com/usuario';

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/listar`);
  }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/registrar/`, usuario);
  }

  buscarUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/buscar/${id}`);
  }

  loginChecking(usuario: Partial<Usuario>): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/loginchecking/`, usuario);
  }

  actualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/actualizar/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminar/${id}`);
  }
}
