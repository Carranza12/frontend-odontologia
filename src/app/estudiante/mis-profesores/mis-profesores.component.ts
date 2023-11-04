import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { asignaturaService } from 'src/app/asignatura.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PerfilEstudiantesService } from 'src/app/empleado/services/perfil_estudiantes.service';
import { PerfilMaestroService } from 'src/app/empleado/services/perfil_maestros.service';
import { GeneralService } from 'src/app/general.service';
import { PerfilMaestroComponent } from 'src/app/maestro/pages/perfil-maestro/perfil-maestro.component';

@Component({
  selector: 'app-mis-profesores',
  templateUrl: './mis-profesores.component.html',
  styleUrls: ['./mis-profesores.component.scss']
})
export class MisProfesoresComponent implements OnInit{
  public misMateriasList:any = []

  constructor(private apiService: ApiService, 
    public _asignaturas:asignaturaService,
    public _perfil_estudiante:PerfilEstudiantesService,
    public _perfil_maestro:PerfilMaestroService,
    public _general: GeneralService, public router: Router, private auth:AuthService, private cdr:ChangeDetectorRef) {}


  ngOnInit(): void {
    let user :any= localStorage.getItem('user');
    user = JSON.parse(user);
    if(user){
      this._perfil_estudiante.getPerfil(user.user_id).subscribe(async (data: any) => {
        for await(const materia of data.materias){
          const materia_id = materia.materia_id;
          const practicas_Realizadas = materia.practicas_realizadas;
          this._asignaturas.get(materia_id).subscribe((data:any) => {
            if(data){
              this.apiService.getUser(data.maestro_id).subscribe((maestro:any) => {
                const materia = {
                  ...data,
                  nombre_profesor: maestro.name + " " + maestro.last_name,
                  img: maestro.profileImage,
                  practicas_Realizadas
                }
                this.misMateriasList.push(materia)
              })
            
            }
          })
        }
     })
    }
      
  
    //this._perfil_estudiante.getPerfil()
/* 
     this._asignaturas.getAll().subscribe((data:any) => {
       
        this.misProfesoresList = data
     }) */
  }

}
