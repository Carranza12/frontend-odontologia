import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneralService } from 'src/app/general.service';
import { FormBuilder, FormControl, FormControlDirective, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  public usuariosList:any = [];
  public totalPages!:[];
  public currentPage!:number;
  
  
  constructor(private apiService: ApiService, public _general: GeneralService,private formBuilder: FormBuilder, public router: Router, private auth:AuthService, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.searchInApi('1')
  }

  public filtrosForm = this.formBuilder.group({
    name:[''],
    lastname: [''],
    email: [''],
    role_default: ['todos'] 
  });
  
  onSubmit(): void {
    // Aquí puedes agregar la lógica para procesar el formulario
    console.log('Formulario enviado');
  }
  async deleteUser(id:string){
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
            Swal.fire(
              'Usuario eliminado con éxito',
              '',
              'success'
            )
            this.apiService.getUsers().subscribe(
              (data:any) => {
                if(Array.isArray(data)){
                  this.usuariosList = data;
                }
              },
              (error:any) => {
                console.error(error);
                this.auth.logout()
              }
            );
          },
          (error: any) => {
            console.error('Error al eliminar el usuario', error);
            Swal.fire(
              `Error al eliminar el usuario: ${error}`,
              '',
              'error'
            )
          })
          
     
      } catch (error) {
          console.error(error);
      }
  }
    
  }
  search() {
    // Aquí puedes agregar la lógica de búsqueda basada en searchTerm
    console.log('Búsqueda por:', this.searchTerm);
  }
  searchTerm(arg0: string, searchTerm: any) {
    throw new Error('Method not implemented.');
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
    this.apiService.getUsers(page).subscribe(
      (data:any) => {
        if(Array.isArray(data.items)){
          this.usuariosList = data.items;
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
