import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneralService } from 'src/app/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  public usuariosList:any = [];
  constructor(private apiService: ApiService, public _general: GeneralService, public router: Router, private auth:AuthService, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe(
      (data:any) => {
        if(Array.isArray(data)){
          this.usuariosList = data;
        }
      },
      (error:any) => {
        console.error(error);
        this.auth.logout()
      }
    );
  }

  async deleteUser(id:string){
    const result = await Swal.fire({
      title: '¿Estás seguro de cancelar la finalizacion?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
  });

  if (result.isConfirmed) {
      try {
         
        this.apiService.deleteUser(id).subscribe(
          (response: any) => {
            console.log('Usuario eliminado con éxito', response);
            Swal.fire(
              'Usuario eliminado con éxito',
              '',
              'success'
            )
            this.apiService.getUsers().subscribe(
              (data:any) => {
                if(Array.isArray(data)){
                  this.usuariosList = data;
                }
              },
              (error:any) => {
                console.error(error);
                this.auth.logout()
              }
            );
          },
          (error: any) => {
            console.error('Error al eliminar el usuario', error);
            Swal.fire(
              `Error al eliminar el usuario: ${error}`,
              '',
              'error'
            )
          })
          
     
      } catch (error) {
          console.error(error);
      }
  }
    
  }
}
