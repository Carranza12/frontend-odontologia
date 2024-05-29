import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneralService } from 'src/app/general.service';
import {
  FormBuilder,
  FormControl,
  FormControlDirective,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { CsvService } from 'src/app/services/csv.service';
import { PacienteService } from 'src/app/empleado/services/paciente.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-clinicas',
  templateUrl: './clinicas.component.html',
  styleUrls: ['./clinicas.component.scss'],
})
export class ClinicasComponent implements OnInit {
  public clinicasList: any = [];
  public totalPages!: [];
  public currentPage!: number;

  constructor(
    private apiService: ApiService,
    public _general: GeneralService,
    private formBuilder: FormBuilder,
    public router: Router,
    private auth: AuthService,
    private patientService: PacienteService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.searchInApi('1', []);
  }

  public filtrosForm = this.formBuilder.group({
    name: [''],
    level: [''],
    telefono: [''],
  });

  onSubmit(): void {
    // Aquí puedes agregar la lógica para procesar el formulario
    console.log('Formulario enviado');
  }



  async deleteClinica(id: string) {
    const result = await Swal.fire({
      title: '¿Estás seguro de eliminar la clínica?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        this.loadingService.show()
        this.patientService.deleteClinica(id).subscribe(
          (response: any) => {
            console.log('clinica eliminado con éxito', response);
            Swal.fire('Clínica eliminada con éxito', '', 'success');
            this.patientService.getClinicas('1', []).subscribe(
              (data: any) => {
                if (Array.isArray(data.items)) {
                  this.clinicasList = data.items;
                  this.loadingService.hide()
                }
              },
              (error: any) => {
                console.error(error);
                this.auth.logout();
                this.loadingService.hide()
              }
            );
          },
          (error: any) => {
            console.error('Error al eliminar la clinica', error);
            Swal.fire(`Error al eliminar la clínica: ${error}`, '', 'error');
            this.loadingService.hide()
          }
        );
      } catch (error) {
        console.error(error);
        this.loadingService.hide()
      }
    }
  }


  search() {
    let filters = [
      {
        name: 'name',
        value: this.filtrosForm.controls.name.value,
      },
      {
        name: 'level',
        value: this.filtrosForm.controls.level.value,
      },
      {
        name: 'telefono',
        value: this.filtrosForm.controls.telefono.value,
      },
      
    ];
    this.searchInApi(this.currentPage.toString(), filters);
  }

  changePage(event: string) {
    this.searchInApi(event, []);
  }

  async searchInApi(page: string, filters: any[]) {
    this.loadingService.show()
    this.patientService.getClinicas(page, filters).subscribe(
      (data: any) => {
        if (Array.isArray(data.items)) {
          this.clinicasList = data.items;
          this.totalPages = data.totalPages;
          this.currentPage = Number(data.currentPage);
          this.loadingService.hide()
        }
      },
      (error: any) => {
        console.log("ERROR:",error);
        this.loadingService.hide()
      }
    );
  }
}
