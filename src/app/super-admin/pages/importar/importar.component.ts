import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-importar',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.scss']
})
export class ImportarComponent {
  public formulariosList:any = [
    {
      name: "Diagnosticos",
      dataset: "diagnosticos",
    },
    {
      name: "Historias clinicas",
      dataset: "historiaclinicas",
    },
    {
      name: "Pacientes",
      dataset: "patients",
    },
    {
      name: "Perfil de estudiantes",
      dataset: "perfilestudiantes",
    },
    {
      name: "Perfil de maestros",
      dataset: "perfilmaestros",
    },
    {
      name: "Usuarios",
      dataset: "users",
    },
  ]

  public importarForm = this.formBuilder.group({
    formulario: ['', Validators.required],
    jsonToImport: ['', Validators.required],
  });

  constructor(
    public _general: GeneralService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}


  onSubmit(){

  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.importarForm?.get('jsonToImport')?.setValue(file);
  }
  
}
