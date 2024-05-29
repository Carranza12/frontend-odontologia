import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneralService } from 'src/app/general.service';
import { LoadingService } from 'src/app/services/loading.service';
import { RespaldosService } from 'src/app/services/respaldos.service';
import { ValidateJsonService } from 'src/app/services/validate-json.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-importar',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.scss'],
})
export class ImportarComponent implements OnInit{
  public importedJson!: any;
  public showTableUsers = false;
  public showTableItems = false;
  public isImported = false;
  public collectionReportInfo!: string;
  public userImportInfo!: any;
  public itemImportInfo!: any;
  public formulariosList: any = [
    {
      name: 'Diagnosticos',
      dataset: 'diagnosticos',
    },
    {
      name: 'Clinicas',
      dataset: 'clinicas',
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
    public _Respaldos: RespaldosService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 500);
  }

  onSubmit() {
    this.loadingService.show();
    if (this.importarForm.invalid || !this.importedJson) {
      if (this.importarForm.controls.formulario.invalid) {
        this.importarForm.controls.formulario.markAsTouched();
        this.loadingService.hide();
        return;
      }
      if (!this.importedJson) {
        this.importarForm.get('jsonToImport')?.setErrors({ required: true });
        this.importarForm.get('jsonToImport')?.markAsTouched();
        this.loadingService.hide();
        return;
      }
      this.loadingService.hide();
      return;
    }


    this._Respaldos
      .importDataInDBFromJSON(
        this.importedJson,
        this.importarForm.controls.formulario.value || ''
      )
      .subscribe(
        (data: any) => {
          this.isImported = true;
          if (data.collection === 'users') {
            this.showTableUsers = true;
            this.userImportInfo = data;
          }
          if (data.collection !== 'users') {
            this.showTableItems = true;
            this.itemImportInfo = data;
            const findFormulario = this.formulariosList.find(
              (f: any) => f.dataset === data.collection
            );
            this.collectionReportInfo = findFormulario
              ? findFormulario.name
              : '';
          }
          setTimeout(() => {
            this.loadingService.hide();
          }, 2000);
        },
        (error: any) => {
          console.error(error);
          this.loadingService.hide();
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
        } else if (
          this.importarForm.controls.formulario.value === 'clinicas'
        ) {
          if (this.validateJsonService.validateCamposClinicas(json)) {
            this.importedJson = json;
            this.buttonText = 'JSON cargado';
          }
        }else {
          this.importarForm.get('jsonToImport')?.setErrors({ required: true });
          this.importarForm.get('jsonToImport')?.markAsTouched();
        }
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
