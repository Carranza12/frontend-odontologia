import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneralService } from 'src/app/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.scss'],
})
export class MaestrosComponent {
  public maestrosList: any = [];
  constructor(
    private apiService: ApiService,
    public _general: GeneralService,
    public router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.maestrosList = data.filter((item) => item.role_default === "maestro");
        }
      },
      (error: any) => {
        console.error(error);
        this.auth.logout();
      }
    );
  }

  async deleteUser(id: string) {
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
            Swal.fire('Usuario eliminado con éxito', '', 'success');
            this.apiService.getUsers().subscribe(
              (data: any) => {
                if (Array.isArray(data)) {
                  this.maestrosList = data;
                }
              },
              (error: any) => {
                console.error(error);
                this.auth.logout();
              }
            );
          },
          (error: any) => {
            console.error('Error al eliminar el usuario', error);
            Swal.fire(`Error al eliminar el usuario: ${error}`, '', 'error');
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  }
}
