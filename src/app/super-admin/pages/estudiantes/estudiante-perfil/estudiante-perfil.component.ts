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

    this.perfilForm.get('carrera')?.valueChanges.subscribe((valor) => {
      this.carrera_param = valor;
      this._perfil_estudiante
        .getAsigntaturasBySemestre(this.carrera_param, this.semestre_param)
        .subscribe((data: any) => {
          this.materiasAvailableList = data;

          this.materiasAvailableList = this.materiasAvailableList.map(
            (item: any) => ({
              ...item,
              selected: this.materias_id_edit_list.find(
                (materia: any) => materia === item._id
              )
                ? true
                : false,
            })
          );
          this.materiasSelectedList = this.materiasAvailableList.filter(
            (materia: any) => materia.selected
          );
        });
    });
  }

  async onSubmit() {
    if (this.perfilForm.valid) {
      let item: any = this.perfilForm.value;
      item.materias = this.materiasSelectedList.map(
        (materia: any) =>({
          materia_id:  materia._id,
          practicas_realizadas: 0
        })
      );
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

  public selectmateria(materia: any) {
    console.log('materiasSelectedList:ANTES', this.materiasSelectedList);

    const indexMatch = this.materiasAvailableList.findIndex(
      (item: any) => item._id === materia._id
    );
    this.materiasAvailableList[indexMatch].selected =
      !this.materiasAvailableList[indexMatch].selected;
    if (this.materiasAvailableList[indexMatch].selected) {
      this.materiasSelectedList.push(this.materiasAvailableList[indexMatch]);
    }
    if (!this.materiasAvailableList[indexMatch].selected) {
      const indexDelete = this.materiasSelectedList.findIndex(
        (item: any) =>
          item.value === this.materiasAvailableList[indexMatch].value
      );
      this.materiasSelectedList.splice(indexDelete, 1);
    }
  }
}
