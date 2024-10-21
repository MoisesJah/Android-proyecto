import { Component, OnInit, inject,Output,EventEmitter } from '@angular/core';
import { UsuarioService } from '../services/usuario-service/usuario.service';
import { Usuario } from '../Models/usuario';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  mostrarFormulario: boolean = false;
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  nuevoUsuario: Usuario = {
    idusuario:0,
    nombres: '',
    apellidos: '',
    dni: '',
    telefono: '',
    correo: '',
    contrasena: '',
    fechaNacimiento: new Date(),
    sexo: ''
  };
  mensajeError: string = '';
  busqueda: string = '';


  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        // Inicializa la lista de usuarios filtrados con todos los usuarios cargados
        this.usuariosFiltrados = [...usuarios];
      },
      error: (err) => {
        console.error('Error al listar usuarios:', err);
        this.mensajeError = 'No se pudieron cargar los usuarios.';
      },
    });
  }

  filtrarUsuarios(): void {
    // Si no hay texto de búsqueda, muestra todos los usuarios
    if (!this.busqueda.trim()) {
      this.usuariosFiltrados = [...this.usuarios];
    } else {
      // Filtra los usuarios por ID o nombre
      this.usuariosFiltrados = this.usuarios.filter(usuario =>
        usuario.idusuario.toString().includes(this.busqueda) ||
        usuario.nombres.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }
  }

  registrarUsuario(): void {
    this.usuarioService.registrarUsuario(this.nuevoUsuario).subscribe({
      next: (usuario) => {
        console.log('Usuario registrado:', usuario);
        this.listarUsuarios();
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        this.mensajeError = 'No se pudo registrar el usuario.';
      },
    });
  }

  actualizarUsuario(id: number): void {

    const usuarioAActualizar = this.usuarios.find(usuario => usuario.idusuario === id);
    if (usuarioAActualizar) {
      this.nuevoUsuario = { ...usuarioAActualizar };

      this.usuarioService.actualizarUsuario(id, this.nuevoUsuario).subscribe({
        next: (usuarioActualizado) => {
          console.log('Usuario actualizado:', usuarioActualizado);
          this.listarUsuarios();
        },
        error: (err) => {
          console.error('Error al actualizar usuario:', err);
          this.mensajeError = 'No se pudo actualizar el usuario.';
        },
      });
    }
  }


  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => {
          console.log(`Usuario con ID ${id} eliminado.`);
          this.listarUsuarios();
        },
        error: (err) => {
          console.error('Error al eliminar usuario:', err);
          this.mensajeError = 'No se pudo eliminar el usuario.';
        }
      });
    }
  }

  private resetNuevoUsuario(): void {
    this.nuevoUsuario = {
      idusuario: 0,
      nombres: '',
      apellidos: '',
      dni: '',
      telefono: '',
      correo: '',
      contrasena: '',
      fechaNacimiento: new Date(),
      sexo: ''
    };
  }

}
