import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneralService } from 'src/app/general.service';
import { RespaldosService } from 'src/app/services/respaldos.service';
import { ValidateJsonService } from 'src/app/services/validate-json.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-importar',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.scss'],
})
export class ImportarComponent {
  public importedJson!: any;
  public showTableUsers = false;
  public showTableItems = false;
  public isImported = false;
  public collectionReportInfo!:string;
  public userImportInfo!:any;
  public itemImportInfo!:any;
  public formulariosList: any = [
    {
      name: 'Diagnosticos',
      dataset: 'diagnosticos',
    },
    {
      name: 'Historias clinicas',
      dataset: 'historiaclinicas',
    },
    {
      name: 'Pacientes',
      dataset: 'patients',
    },
    {
      name: 'Perfil de estudiantes',
      dataset: 'perfilestudiantes',
    },
    {
      name: 'Perfil de maestros',
      dataset: 'perfilmaestros',
    },
    {
      name: 'Tratamientos',
      dataset: 'tratamientos',
    },
    {
      name: 'Usuarios',
      dataset: 'users',
    },
  ];

  public importarForm = this.formBuilder.group({
    formulario: ['', Validators.required],
    jsonToImport: ['', Validators.required],
  });

  buttonText: string = 'Seleccionar JSON';

  constructor(
    public _general: GeneralService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private validateJsonService: ValidateJsonService,
    public _Respaldos: RespaldosService
  ) {}

  onSubmit() {
    if (this.importarForm.invalid || !this.importedJson) {
      if (this.importarForm.controls.formulario.invalid) {
        this.importarForm.controls.formulario.markAsTouched();
      }
      if (!this.importedJson) {
        this.importarForm.get('jsonToImport')?.setErrors({ required: true });
        this.importarForm.get('jsonToImport')?.markAsTouched();
      }
      return;
    }

    this._general.showLoading();
  
    this._Respaldos.importDataInDBFromJSON(this.importedJson, this.importarForm.controls.formulario.value || '').subscribe(
      (data: any) => {
        console.log("DATA:", data)
        this.isImported = true
        if(data.collection === "users"){
          this.showTableUsers = true;
          this.userImportInfo = data;
        }
        if(data.collection !== "users"){
          this.showTableItems = true;
          this.itemImportInfo = data;
          const findFormulario = this.formulariosList.find((f:any) => f.dataset === data.collection);
          this.collectionReportInfo = findFormulario ? findFormulario.name : '';
        }
        setTimeout(() => {
          this._general.hideLoading();
        }, 2000);
      },
      (error: any) => {
        console.error(error);
        
      }
    );

  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.importarForm?.get('jsonToImport')?.setValue(file);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const json = JSON.parse(e.target.result);
        if (this.importarForm.controls.formulario.value === 'users') {
          if (this.validateJsonService.validateCamposInUsers(json)) {
            this.importedJson = json;
            this.buttonText = 'JSON cargado';
          }
        } else if (
          this.importarForm.controls.formulario.value === 'tratamientos'
        ) {
          if (this.validateJsonService.validateCamposInTratamientos(json)) {
            this.importedJson = json;
            this.buttonText = 'JSON cargado';
          }
        } else if (
          this.importarForm.controls.formulario.value === 'diagnosticos'
        ) {
          if (this.validateJsonService.validateCamposInDiagnosticos(json)) {
            this.importedJson = json;
            this.buttonText = 'JSON cargado';
          }
        } else if (
          this.importarForm.controls.formulario.value === 'historiaclinicas'
        ) {
          if (
            this.validateJsonService.validateCamposInHistoriasClinicas(json)
          ) {
            this.importedJson = json;
            this.buttonText = 'JSON cargado';
          }
        } else if (this.importarForm.controls.formulario.value === 'patients') {
          if (this.validateJsonService.validateCamposInPatients(json)) {
            this.importedJson = json;
            this.buttonText = 'JSON cargado';
          }
        } else if (
          this.importarForm.controls.formulario.value === 'perfilestudiantes'
        ) {
          if (this.validateJsonService.validateCamposPerfilEstudiantes(json)) {
            this.importedJson = json;
            this.buttonText = 'JSON cargado';
          }
        } else if (
          this.importarForm.controls.formulario.value === 'perfilmaestros'
        ) {
          if (this.validateJsonService.validateCamposPerfilMaestros(json)) {
            this.importedJson = json;
            this.buttonText = 'JSON cargado';
          }
        } else {
          this.importarForm.get('jsonToImport')?.setErrors({ required: true });
          this.importarForm.get('jsonToImport')?.markAsTouched();
        }
        console.log('JSON importado:', this.importedJson);
      } catch (error) {
        console.error('Error al parsear el JSON:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al parsear el archivo JSON.',
        });
      }
    };
    reader.readAsText(file);
  }
}
