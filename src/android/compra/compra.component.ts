import { Component } from '@angular/core';
import { Compra, DetalleCompra } from '../Models/compra';
import { CompraService } from '../services/compra-service/compra.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent {
  busqueda: string = '';
  mostrarFormulario: boolean = false;
  nuevoCompra: any = {};
  nuevoDetalle: DetalleCompra = {
    idcurso: '',
    precio: '',
    iddetalle: '',
    idcompra: 0
  };

  compras: Compra[] = []; // Lista original de todas las compras
  comprasFiltradas: Compra[] = []; // Lista de compras filtradas
  mensajeError: string = '';

  constructor(private compraService: CompraService) {
    this.listarCompras();
  }

  listarCompras() {
    this.compraService.listarCompras().subscribe(
      (compras) => {
        this.compras = compras; // Asigna las compras a la lista original
        this.comprasFiltradas = [...this.compras]; // Copia la lista original a la lista de filtrados
      },
      (error) => {
        console.error('Error al listar compras:', error);
        this.mensajeError = 'Error al cargar las compras';
      }
    );
  }

  filtrarCompras() {
    // Filtra basándose en la lista original `compras`, no en `comprasFiltradas`
    if (this.busqueda.trim() === '') {
      this.comprasFiltradas = [...this.compras]; // Si no hay búsqueda, muestra todas las compras
    } else {
      this.comprasFiltradas = this.compras.filter(compra =>
        compra.idcompra.toString().includes(this.busqueda) ||
        compra.idusuario.toString().includes(this.busqueda)
      );
    }
  }

  agregarDetalle() {
    if (this.nuevoDetalle.idcurso && this.nuevoDetalle.precio && this.nuevoCompra.idcompra) {
      // Asignar el ID de la compra al nuevo detalle
      this.nuevoDetalle.idcompra = this.nuevoCompra.idcompra;
      this.nuevoCompra.detallecompradto.push({ ...this.nuevoDetalle });
      this.nuevoDetalle = { idcurso: '', precio: '', iddetalle: '', idcompra: this.nuevoCompra.idcompra };
    }
  }

  crearCompra() {
    this.compraService.registrarCompra(this.nuevoCompra).subscribe(
      response => {
        console.log('Compra registrada:', response);
        this.listarCompras(); // Actualiza la lista de compras
        this.mostrarFormulario = false; // Cierra el formulario
        this.nuevoCompra = {
          idcompra: '',
          idusuario: '',
          fecha: new Date().toISOString().slice(0, 10),
          detallecompradto: []
        };
      },
      error => {
        console.error('Error al registrar compra:', error);
        this.mensajeError = 'Error al registrar la compra';
      }
    );
  }

  actualizarCompra(idcompra: number) {
    console.log('Actualizar compra:', idcompra);
  }

  eliminarCompra(idcompra: number) {
    console.log('Eliminar compra:', idcompra);
  }
}
