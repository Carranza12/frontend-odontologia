import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { asignaturaService } from 'src/app/asignatura.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PerfilEstudiantesService } from 'src/app/empleado/services/perfil_estudiantes.service';
import { PerfilMaestroService } from 'src/app/empleado/services/perfil_maestros.service';
import { GeneralService } from 'src/app/general.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-mis-practicas',
  templateUrl: './mis-practicas.component.html',
  styleUrls: ['./mis-practicas.component.scss'],
})
export class MisPracticasComponent {
  public misPracticasList: any = [];
  public totalPages: any = ['1'];
  public currentPage = 1;

  constructor(
    private apiService: ApiService,
    public _asignaturas: asignaturaService,
    public _perfil_estudiante: PerfilEstudiantesService,
    public _perfil_maestro: PerfilMaestroService,
    public _general: GeneralService,
    public router: Router,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.searchInApi('1');
  }

  public openPractica(diagnostico_id: string, tratamiento_id: string) {
    this.loadingService.show();
    setTimeout(() => {
      this.router.navigateByUrl(
        `/estudiante/diagnostico-view/${diagnostico_id}?tratamiento=${tratamiento_id}`
      );
      this.loadingService.hide();
    }, 500);
  }

  async searchInApi(page: string) {
    this.loadingService.show();
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    if (user) {
      this.apiService
        .getTratamientosByAlumno(user.user_id, Number(page), 5)
        .subscribe(
          (data: any) => {
            if (Array.isArray(data.items)) {
              this.misPracticasList = data.items;
              this.totalPages = data.totalPages;
              this.currentPage = Number(data.currentPage);
            }
            this.loadingService.hide();
            return;
          },

          (error: any) => {
            console.log('EROR', error);
            this.loadingService.hide();
            return;
          }
        );
    } else {
      this.loadingService.hide();
      return;
    }
  }

  changePage(event: string) {
    this.searchInApi(event);
  }
}
