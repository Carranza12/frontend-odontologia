import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of, switchMap } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { asignaturaService } from 'src/app/asignatura.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PerfilMaestroService } from 'src/app/empleado/services/perfil_maestros.service';
import { GeneralService } from 'src/app/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.scss'],
})
export class AsignaturasComponent {
  public asignaturasList: any = [];
  constructor(
    private apiService: ApiService,
    public _general: GeneralService,
    public router: Router,
    private auth: AuthService,
    private _asignatura: asignaturaService,
    private _perfil_maestro: PerfilMaestroService
  ) {}

  async ngOnInit() {
    this._asignatura.getAll().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.asignaturasList = data;
        }
        this.asignaturasList = this.asignaturasList.map((asignatura: any) => {
          return this.apiService.getUser(asignatura.maestro_id).pipe(
            switchMap((data: any) => {
              if (data) {
                const maestro = data;
                return of({
                  ...asignatura,
                  maestro_nombre: maestro.name + ' ' + maestro.last_name,
                });
              } else {
                return of(asignatura);
              }
            })
          );
        });
        forkJoin(this.asignaturasList).subscribe((asignaturasWithMaestro) => {
          this.asignaturasList = asignaturasWithMaestro;
          console.log(this.asignaturasList);
        });
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
                  this.asignaturasList = data;
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
