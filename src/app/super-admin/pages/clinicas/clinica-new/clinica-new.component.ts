import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PacienteService } from 'src/app/empleado/services/paciente.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-clinica-new',
  templateUrl: './clinica-new.component.html',
  styleUrls: ['./clinica-new.component.scss'],
})
export class ClinicaNewComponent implements OnInit {
  public clinicaForm = this.formBuilder.group({
    name: ['', Validators.required],
    level: ['', Validators.required],
    telefono: ['', Validators.required],
  });

  constructor(
    public _general: GeneralService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private patientService: PacienteService
  ) {}

  ngOnInit(): void {
    this.clinicaForm.controls.level.setValue('Licenciatura');
  }

  onSubmit() {
    if (this.clinicaForm.valid) {
      let formClinica: any = this.clinicaForm.value;

      console.log('item:', formClinica);

      this.patientService.createClinica(formClinica).subscribe(
        (response: any) => {
          console.log('clinica creada con éxito', response);
          this.clinicaForm.reset();
          this._general.navigateBy('superAdmin/clinicas');
        },
        (error: any) => {
          console.error('Error al registrar el usuario', error);
        }
      );
    }
  }
}
