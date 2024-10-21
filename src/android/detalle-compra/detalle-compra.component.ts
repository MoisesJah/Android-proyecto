import { Component, OnInit } from '@angular/core';
import { DetalleCompraService } from '../services/detalle-compra-service/detalle-compra.service';
import { Compra,DetalleCompra } from '../Models/compra';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.css']
})
export class DetalleCompraComponent implements OnInit {
  detalleCompras: DetalleCompra[] = [];
  detalleComprasFiltrados: DetalleCompra[] = []; // Arreglo para los detalles filtrados
  busqueda: string = ''; // Variable para el input de búsqueda
  mensajeError: string = '';

  constructor(private detalleCompraService: DetalleCompraService) {}

  ngOnInit(): void {
    this.listarDetalleCompras();
  }

  listarDetalleCompras(): void {
    this.detalleCompraService.listarDetalleCompras().subscribe(
      (data) => {
        this.detalleCompras = data;
        this.detalleComprasFiltrados = data; // Inicialmente, los detalles filtrados son todos
      },
      (error) => {
        this.mensajeError = 'Error al cargar los detalles de la compra';
        console.error(error);
      }
    );
  }

  filtrarDetalleCompras(): void {
    if (!this.busqueda) {
      this.detalleComprasFiltrados = this.detalleCompras; // Si no hay búsqueda, mostrar todos
    } else {
      this.detalleComprasFiltrados = this.detalleCompras.filter(detalle =>
        detalle.idcurso.toString().includes(this.busqueda) || // Filtrar por ID del curso
        detalle.precio.toString().includes(this.busqueda) // Filtrar por precio
      );
    }
  }
}
