import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  public perfilForm = this.formBuilder.group({
    expediente: ['', Validators.required],
    cedula_profesional: ['', Validators.required],
    universidad: ['', Validators.required],
    especialidad: ['', Validators.required],
  });

  constructor(
    public _general: GeneralService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}
  onSubmit() {
    if (this.perfilForm.valid) {
      let formPerfil: any = this.perfilForm.value;

      const formData = new FormData();

      formData.append('expediente', formPerfil.expediente);
      formData.append('cedula_profesional', formPerfil.cedula_profesional);
      formData.append('universidad', formPerfil.universidad);
      formData.append('especialidad', formPerfil.especialidad);
    }
  }
}
