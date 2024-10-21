import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  private baseUrl = 'https://codev-api-0w83.onrender.com/tema';

  constructor(private http: HttpClient) {}

  listarTemas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`);
  }

  buscarTema(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/buscar/${id}`);
  }

  crearTema(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrar`, data);
  }

  actualizarTema(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizar`, { id, ...data });
  }

  eliminarTema(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`);
  }
}
