import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { asignaturaService } from 'src/app/asignatura.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PerfilEstudiantesService } from 'src/app/empleado/services/perfil_estudiantes.service';
import { PerfilMaestroService } from 'src/app/empleado/services/perfil_maestros.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-materias-profe',
  templateUrl: './materias-profe.component.html',
  styleUrls: ['./materias-profe.component.scss']
})
export class materiasProfeComponent {

  public materiasImpartidasList:any = []

  public perfilMaestroForm = this.formBuilder.group({
    name: ['', Validators.required],
    last_name: ['', Validators.required],
    password: ['', Validators.required],
    role_default: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    profileImage: [''],
  });

  constructor(public _general:GeneralService,  private formBuilder: FormBuilder,
    private apiService: ApiService, 
    public _asignaturas:asignaturaService,
    public _perfil_estudiante:PerfilEstudiantesService,
    public _perfil_maestro:PerfilMaestroService,
    public router: Router, 
    private auth:AuthService, 
    private cdr:ChangeDetectorRef,

    ){}

  async ngOnInit() {
    let user :any= localStorage.getItem('user');
    user = JSON.parse(user);
    if(user){
      console.log("USUARIO:", user)
      const maestro_id = user.user_id;
      const data = await this._asignaturas.getByMaestro(maestro_id)
      data.subscribe((res:any) => {
        this.materiasImpartidasList = res
        console.log("MATERIAS:",  this.materiasImpartidasList)
      })
    }
  }

  openPracticasPendientes(materia_id:string) {
    this.router.navigateByUrl(`/maestro/mis-materias/practicas-pendientes/${materia_id}`)
  }


    
}
