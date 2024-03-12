import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSignaturePadComponent } from '@eve-sama/ngx-signature-pad';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PerfilEstudiantesService } from 'src/app/empleado/services/perfil_estudiantes.service';
import { PerfilMaestroService } from 'src/app/empleado/services/perfil_maestros.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-estudiante-perfil',
  templateUrl: './estudiante-perfil.component.html',
  styleUrls: ['./estudiante-perfil.component.scss'],
})
export class EstudiantePerfilComponent {
  public user_id!: string;
  public semestre_param: any = '';
  public carrera_param: any = '';

  public perfilForm = this.formBuilder.group({
    Matricula: ['', Validators.required],
    semestre_actual: ['', Validators.required],
    carrera: ['', Validators.required],
  });

  constructor(
    public _general: GeneralService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private _perfil_estudiante: PerfilEstudiantesService,
    private route: ActivatedRoute
  ) {}

  public semestresList: any = [];

  public materiasAvailableList: any = [];
  public materiasSelectedList: any = [];

  public carrerasList: any = [];

  public materias_id_edit_list: any = [];

  ngOnInit(): void {
    this.semestresList = this.apiService.getSemestreList();
    this.carrerasList = this.apiService.getCarrerasList();

    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.user_id = id;
      this._perfil_estudiante.getPerfil(id).subscribe(
        (data: any) => {
          if (data) {
            this.materias_id_edit_list = data.materias;
            this.perfilForm.get('Matricula')?.setValue(data.Matricula);
            this.perfilForm
              .get('semestre_actual')
              ?.setValue(data.semestre_actual);
            this.perfilForm.get('carrera')?.setValue(data.carrera);
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
    });

    this.perfilForm.get('semestre_actual')?.valueChanges.subscribe((valor) => {
      this.semestre_param = valor;
    });

    
  }

  async onSubmit() {
    if (this.perfilForm.valid) {
      let item: any = this.perfilForm.value;
      item.materias = []
      item.id_user = this.user_id;
      this._perfil_estudiante.post_perfil(item).subscribe(
        (response: any) => {
          // Manejar la respuesta exitosa aquí
          console.log('Solicitud exitosa:', response);
          this.router.navigateByUrl('/superAdmin/estudiantes');
        },
        (error: any) => {
          // Manejar errores aquí
          console.error('Error en la solicitud:', error);
        }
      );
    }
  }

 
}
