export interface DetalleCompra {
  idcurso: string;
  iddetalle: string;
  precio: string;
  idcompra: number;
}

export interface Compra {
  idcompra: number;
  idusuario: number;
  fecha: string;
  detallecompradto: DetalleCompra[];
}
