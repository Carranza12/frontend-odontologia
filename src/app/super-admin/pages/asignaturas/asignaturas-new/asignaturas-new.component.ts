import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { asignaturaService } from 'src/app/asignatura.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PerfilMaestroService } from 'src/app/empleado/services/perfil_maestros.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-asignaturas-new',
  templateUrl: './asignaturas-new.component.html',
  styleUrls: ['./asignaturas-new.component.scss'],
})
export class AsignaturasNewComponent {
  public asignaturaForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    carrera: ['', Validators.required],
    profesor: ['', Validators.required],
    semestre: ['', Validators.required],
    meta_practicas: ['', Validators.required],
  });



  public semestresList:any = [
   
  ];

  public carrerasList:any = [
  ]

  public maestrosList: any = [];

  public perfiles_maestros: any = [];

  constructor(
    public _general: GeneralService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private perfilMaestro: PerfilMaestroService,
    private asignaturaService: asignaturaService
  ) {}

  async ngOnInit(): Promise<void> {

    this.semestresList = this.apiService.getSemestreList();
    this.carrerasList = this.apiService.getCarrerasList();

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
  }

  onSubmit() {
    if (this.asignaturaForm.valid) {
      this.asignaturaService
        .create({
          nombre: this.asignaturaForm.get('nombre')?.value,
          carrera: this.asignaturaForm.get('carrera')?.value,
          maestro_id: this.asignaturaForm.get('profesor')?.value,
          semestre: this.asignaturaForm.get('semestre')?.value,
          meta_practicas: this.asignaturaForm.get('meta_practicas')?.value,
        })
        .subscribe(
          (response: any) => {
            console.log('Asignatura creada con éxito', response);
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
