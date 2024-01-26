import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { asignaturaService } from 'src/app/asignatura.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PerfilEstudiantesService } from 'src/app/empleado/services/perfil_estudiantes.service';
import { PerfilMaestroService } from 'src/app/empleado/services/perfil_maestros.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-practicas-pendientes',
  templateUrl: './practicas_pendientes.component.html',
  styleUrls: ['./practicas_pendientes.component.scss'],
})
export class practicasPendientesComponent {
  public practicasParaRevisarList: any = [];
  public nombreMateria!:string;
  constructor(
    public _general: GeneralService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public _asignaturas: asignaturaService,
    public _perfil_estudiante: PerfilEstudiantesService,
    public _perfil_maestro: PerfilMaestroService,
    public router: Router,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      const materia_id = params['materia_id'];
      const data = await this.apiService.getHistoriaClinicaByMateria(materia_id);
      data.subscribe((res: any) => {
        console.log("HISTORIAS PENDIENTES:", res)
      });

      const materia = await this._asignaturas.get(materia_id);
      materia.subscribe((res: any) => {
        console.log("INFORMACION DE LA MATERIA:", res)
        this.nombreMateria = res.nombre
      });
    });
  }
}
