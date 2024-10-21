import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleCompra } from '../../Models/compra';


@Injectable({
  providedIn: 'root'
})
export class DetalleCompraService {
  private baseUrl = 'https://codev-api-0w83.onrender.com/detallecompra';

  constructor(private http: HttpClient) {}

  listarDetalleCompras(): Observable<DetalleCompra[]> {
    return this.http.get<DetalleCompra[]>(`${this.baseUrl}/listar`);
  }
}
