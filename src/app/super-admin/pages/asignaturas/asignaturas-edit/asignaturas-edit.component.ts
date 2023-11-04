import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { asignaturaService } from 'src/app/asignatura.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PerfilMaestroService } from 'src/app/empleado/services/perfil_maestros.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-asignaturas-edit',
  templateUrl: './asignaturas-edit.component.html',
  styleUrls: ['./asignaturas-edit.component.scss']
})
export class AsignaturasEditComponent {
  public asignaturaForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    carrera: ['', Validators.required],
    profesor: ['', Validators.required],
    semestre: ['', Validators.required],
  });

  public semestresList = [
    {
      value: '1',
      text: 'primer semestre',
    },
    {
      value: '2',
      text: 'segundo semestre',
    },
    {
      value: '3',
      text: 'tercer semestre',
    },
    {
      value: '4',
      text: 'cuarto semestre',
    },
    {
      value: '5',
      text: 'quinto semestre',
    },
    {
      value: '6',
      text: 'sexto semestre',
    },
    {
      value: '7',
      text: 'septimo semestre',
    },
    {
      value: '8',
      text: 'octavo semestre',
    },
    {
      value: '9',
      text: 'noveno semestre',
    },
  ];

  public carrerasList = [
    {
      value: 'Lic en odontologia',
      text: 'Lic en odontologia',
    },
  ];

  public maestrosList: any = [];

  public perfiles_maestros: any = [];

  public idParam!: string;
  constructor(
    public _general: GeneralService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private perfilMaestro: PerfilMaestroService,
    private asignaturaService: asignaturaService,
    private route:ActivatedRoute
  ){}

  async ngOnInit(): Promise<void> {
    this.perfilMaestro
      .getAll()
      .pipe(
        switchMap((perfiles: any) => {
          const observables = perfiles.map((perfil: any) =>
            this.apiService.getUser(perfil.id_user)
          );
          return forkJoin(observables);
        })
      )
      .subscribe((usuarios: any) => {
        this.maestrosList = usuarios
          .filter((maestro: any) => maestro !== null)
          .map((maestro: any) => ({
            value: maestro._id,
            text: `${maestro.name} ${maestro.last_name}`,
          }));

          
  
      });


      this.route.params.subscribe((params) => {
        const id = params['id'];
        this.idParam = id;
        this.asignaturaService.get(id).subscribe(
          (data: any) => {
            if (data) {
              this.completeInput(data);
            }
          },
          (error: any) => {
            console.error(error);
          }
        );
      });
  }

  public completeInput(user: any) {
    this.asignaturaForm.get('nombre')?.setValue(user.nombre);
    this.asignaturaForm.get('carrera')?.setValue(user.carrera);
    this.asignaturaForm.get('profesor')?.setValue(user.maestro_id);
    this.asignaturaForm.get('semestre')?.setValue(user.semestre);
    
  }

  onSubmit() {
    if (this.asignaturaForm.valid) {
      this.asignaturaService
        .edit({
          nombre: this.asignaturaForm.get('nombre')?.value,
          carrera: this.asignaturaForm.get('carrera')?.value,
          maestro_id: this.asignaturaForm.get('profesor')?.value,
          semestre: this.asignaturaForm.get('semestre')?.value,
        }, this.idParam)
        .subscribe(
          (response: any) => {
            console.log('Asignatura actualizado con éxito', response);
            this.asignaturaForm.reset();
            this._general.navigateBy('/superAdmin/asignaturas');
          },
          (error: any) => {
            console.error('Error al crear la asignatura', error);
          }
        );
    } else {
    }
  }
}
