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
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  public usuariosList: any = [];
  public totalPages!: [];
  public currentPage!: number;

  constructor(
    private apiService: ApiService,
    public _general: GeneralService,
    private formBuilder: FormBuilder,
    public router: Router,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private _csvService: CsvService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.searchInApi('1', []);
  }

  public filtrosForm = this.formBuilder.group({
    name: [''],
    lastname: [''],
    email: [''],
    role_default: [''],
  });

  onSubmit(): void {
    console.log('Formulario enviado');
  }

  downloadCSVWithPagination() {
    this.loadingService.show();
    const usuariosFormateados = this.mapUsuarios(this.usuariosList);
    this._csvService.downloadWithPagination(usuariosFormateados, 'usuarios');
    this.loadingService.hide();
  }

  downloadCSVAll() {   
    this.loadingService.show();
    this.apiService.getAllUsers().subscribe(
      (data: any) => {
        if (Array.isArray(data.items)) {
          const usuariosFormateados = this.mapUsuarios(data.items);
          this._csvService.downloadWithPagination(
            usuariosFormateados,
            'usuarios'
          );
          this.loadingService.hide();
        }
      },
      (error: any) => {
        console.error(error);
        this.auth.logout();
        this.loadingService.hide();
      }
    );
  }

  mapUsuarios(usuarios: any[]) {
    return usuarios.map((user: any) => ({
      Nombres: user.name,
      Apellidos: user.last_name,
      Email: user.email,
      Roles: user.roles.join(','),
    }));
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
        this.loadingService.show();
        this.apiService.deleteUser(id).subscribe(
          (response: any) => {
            Swal.fire('Usuario eliminado con éxito', '', 'success');
            this.loadingService.hide();
            this.apiService.getUsers('1', []).subscribe(
              (data: any) => {
                if (Array.isArray(data)) {
                  this.usuariosList = data;
                }
              },
              (error: any) => {
                console.error(error);
                this.auth.logout();
                this.loadingService.hide();
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
  search() {
    let filters = [
      {
        name: 'name',
        value: this.filtrosForm.controls.name.value,
      },
      {
        name: 'lastname',
        value: this.filtrosForm.controls.lastname.value,
      },
      {
        name: 'email',
        value: this.filtrosForm.controls.email.value,
      },
      {
        name: 'role_default',
        value: this.filtrosForm.controls.role_default.value,
      },
    ];
    this.searchInApi(this.currentPage.toString(), filters);
  }

  changePage(event: string) {
    this.searchInApi(event, []);
  }

  async searchInApi(page: string, filters: any[]) {
    this.loadingService.show();
    this.apiService.getUsers(page, filters).subscribe(
      (data: any) => {
        if (Array.isArray(data.items)) {
          this.usuariosList = data.items;
          this.totalPages = data.totalPages;
          this.currentPage = Number(data.currentPage);
          this.loadingService.hide();
        }
      },
      (error: any) => {
        console.error(error);
        this.auth.logout();
        this.loadingService.hide();
      }
    );
  }
}
