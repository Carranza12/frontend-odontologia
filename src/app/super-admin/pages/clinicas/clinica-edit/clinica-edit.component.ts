import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PacienteService } from 'src/app/empleado/services/paciente.service';
import { GeneralService } from 'src/app/general.service';
import { LoadingService } from 'src/app/services/loading.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-clinica-edit',
  templateUrl: './clinica-edit.component.html',
  styleUrls: ['./clinica-edit.component.scss'],
})
export class ClinicaEditComponent {
  public clinicaForm = this.formBuilder.group({
    name: ['', Validators.required],
    level: ['', Validators.required],
    telefono: ['', Validators.required],
  });
  public idParam!: string;
  constructor(
    public _general: GeneralService,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private patientService: PacienteService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 500);

    this.clinicaForm.controls.level.setValue('Licenciatura');

    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.idParam = id;
      this.patientService.getClinica(id).subscribe(
        (data: any) => {
          if (data) {
            this.clinicaForm.get('name')?.setValue(data.name);
            this.clinicaForm.get('level')?.setValue(data.level);
            this.clinicaForm.get('telefono')?.setValue(data.telefono);
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
    });
  }

  onSubmit() {
    this.loadingService.show()
    if (this.clinicaForm.invalid) {
      this.clinicaForm.markAllAsTouched()
      this.loadingService.hide()
      return
    }

    if (this.clinicaForm.valid) {
      let formClinica: any = this.clinicaForm.value;


      this.patientService.EditClinica(formClinica, this.idParam).subscribe(
        (response: any) => {
          Swal.fire('clinica actualizada con éxito', '', 'success');
          this.clinicaForm.reset();
          this._general.navigateBy('superAdmin/clinicas');
          this.loadingService.hide()
        },
        (error: any) => {
          console.error('Error al registrar el usuario', error);
          this.loadingService.hide()
        }
      );
    }
  }
}
