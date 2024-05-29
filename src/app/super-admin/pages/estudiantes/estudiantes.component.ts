import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneralService } from 'src/app/general.service';
import { LoadingService } from 'src/app/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent {
  public estudiantesList: any = [];
  public totalPages!:[];
  public currentPage!:number;

  public filtrosForm = this.formBuilder.group({
    name:[''],
    last_name: [''],
    email: [''],
    role_default: [''] 
  });


  constructor(
    private apiService: ApiService,
    public _general: GeneralService,
    public router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show()
    this.apiService.getEstudiantes('1', []).subscribe(
      (data: any) => {
        console.log("data:", data)
        if (Array.isArray(data.items)) {
          this.estudiantesList = data.items;
          this.totalPages = data.totalPages;
          this.currentPage = Number(data.currentPage);
          this.loadingService.hide()
        }
      },
      (error: any) => {
        console.error(error);
        this.auth.logout();
        this.loadingService.hide()
      }
    );
  }

  async deleteUser(id: string) {
    const result = await Swal.fire({
      title: '¿Estás seguro de cancelar la finalizacion?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        this.loadingService.show()
        this.apiService.deleteUser(id).subscribe(
          (response: any) => {

            Swal.fire('Usuario eliminado con éxito', '', 'success');
            this.loadingService.hide()
            this.apiService.getUsers().subscribe(
              (data: any) => {
                if (Array.isArray(data)) {
                  this.estudiantesList = data;
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
            console.error('Error al eliminar el usuario', error);
            Swal.fire(`Error al eliminar el usuario: ${error}`, '', 'error');
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  }
  changePage(event:string){
    this.searchInApi(event, [])
  }
  async searchInApi(page:string, filters:any[]){
    this.loadingService.show()
    this.apiService.getEstudiantes(page, filters).subscribe(
      (data:any) => {
        if(Array.isArray(data.items)){
          this.estudiantesList = data.items;
          this.totalPages = data.totalPages;
          this.currentPage = Number(data.currentPage);
          this.loadingService.hide()
        }
      },
      (error:any) => {
        console.error(error);
        this.auth.logout()
        this.loadingService.hide()
      }
    );
  }

  search() {
    let filters = [
      {
        name: "name",
        value: this.filtrosForm.controls.name.value
      },
      {
        name: "last_name",
        value: this.filtrosForm.controls.last_name.value
      },
      {
        name: "email",
        value: this.filtrosForm.controls.email.value
      },
    ]
    this.searchInApi(this.currentPage.toString(), filters)
  }
}
