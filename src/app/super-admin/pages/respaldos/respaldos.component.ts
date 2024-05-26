import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneralService } from 'src/app/general.service';
import { RespaldosService } from 'src/app/services/respaldos.service';

@Component({
  selector: 'app-respaldos',
  templateUrl: './respaldos.component.html',
  styleUrls: ['./respaldos.component.scss']
})
export class RespaldosComponent implements OnInit{

  public formulariosList:any = []
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
    public _Respaldos: RespaldosService
  ) {}

  ngOnInit(): void {
    this.formulariosList = [
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
      {
        name: "Clinicas",
        dataset: "clinicas",
      },
    ]
  }

  changePage(event:string){
    this.searchInApi(event, [])
  }
  async searchInApi(page:string, filters:any[]){
    /* this.apiService.getEstudiantes(page, filters).subscribe(
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
    ); */
  }

  search(nameForm: string) {
    this._general.showLoading();
  
    this._Respaldos.downloadRespaldoInJSON(nameForm).subscribe(
      (data: any) => {
        this.downloadJson(data);

        setTimeout(() => {
          this._general.hideLoading();
        }, 2000);
      },
      (error: any) => {
        console.error(error);
        this.auth.logout();
      }
    );
  }

  downloadJson(data:any) {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  public navigateBy(url: string) {
    this.router.navigateByUrl(url);
  }

}
