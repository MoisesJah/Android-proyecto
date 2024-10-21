import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private baseUrl = 'https://codev-api-0w83.onrender.com/compra';

  constructor(private http: HttpClient) {}

  listarCompras(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`);
  }

  registrarCompra(compra: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrar`, compra);
  }

  buscarCompraPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/buscar/${id}`);
  }

  actualizarCompra(compra: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizar`, compra);
  }

  eliminarCompra(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`);
  }
}
