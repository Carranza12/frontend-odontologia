import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { asignaturaService } from 'src/app/asignatura.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PerfilEstudiantesService } from 'src/app/empleado/services/perfil_estudiantes.service';
import { PerfilMaestroService } from 'src/app/empleado/services/perfil_maestros.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-mis-practicas',
  templateUrl: './mis-practicas.component.html',
  styleUrls: ['./mis-practicas.component.scss']
})
export class MisPracticasComponent {
  public misPracticasList:any = []

  constructor(
    private apiService: ApiService, 
    public _asignaturas:asignaturaService,
    public _perfil_estudiante:PerfilEstudiantesService,
    public _perfil_maestro:PerfilMaestroService,
    public _general: GeneralService,
    public router: Router, 
    private auth:AuthService, 
    private cdr:ChangeDetectorRef) {}


  ngOnInit(): void {
    let user :any= localStorage.getItem('user');
    user = JSON.parse(user);
    if(user){
      this.apiService.getTratamientosByAlumno(user.user_id).subscribe(async (data: any) => {
        this.misPracticasList = data;
        console.log("this.misPracticasList:", this.misPracticasList)
     })
    }
  }

  public openPractica(diagnostico_id:string, tratamiento_id:string){
    this.router.navigateByUrl(`/estudiante/diagnostico-view/${diagnostico_id}?tratamiento=${tratamiento_id}`)
  }  
  
}
