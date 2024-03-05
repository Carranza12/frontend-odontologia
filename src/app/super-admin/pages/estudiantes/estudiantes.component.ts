import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneralService } from 'src/app/general.service';
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

  constructor(
    private apiService: ApiService,
    public _general: GeneralService,
    public router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.apiService.getMaestros().subscribe(
      (data: any) => {
        console.log("data:", data)
        if (Array.isArray(data.items)) {
          this.estudiantesList = data.items;
          this.totalPages = data.totalPages;
          this.currentPage = Number(data.currentPage);
          
        }
      },
      (error: any) => {
        console.error(error);
        this.auth.logout();
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
        this.apiService.deleteUser(id).subscribe(
          (response: any) => {
            console.log('Usuario eliminado con éxito', response);
            Swal.fire('Usuario eliminado con éxito', '', 'success');
            this.apiService.getUsers().subscribe(
              (data: any) => {
                if (Array.isArray(data)) {
                  this.estudiantesList = data;
                }
              },
              (error: any) => {
                console.error(error);
                this.auth.logout();
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
  changePage(page:number){
    if (page !== 0 && page <= this.totalPages.length) {
      console.log("page:", page);
      const pageFinal = page.toString();
      this.searchInApi(pageFinal);
    } else {
      console.log("Página no válida");
    }
  }
  async searchInApi(page:string){
    this.apiService.getEstudiantes(page).subscribe(
      (data:any) => {
        if(Array.isArray(data.items)){
          this.estudiantesList = data.items;
          this.totalPages = data.totalPages;
          this.currentPage = Number(data.currentPage);
        }
      },
      (error:any) => {
        console.error(error);
        this.auth.logout()
      }
    );
  }
}
