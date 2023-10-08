import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  public usuariosList:any = [];
  constructor(private apiService: ApiService, public _general: GeneralService, public router: Router, private auth:AuthService) {}

  ngOnInit(): void {
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
  }

  public deleteUser(id:string){
    this.apiService.deleteUser(id).subscribe(
      (response: any) => {
        console.log('Usuario eliminado con éxito', response);
        this._general.navigateBy('/superAdmin/usuarios');
      },
      (error: any) => {
        console.error('Error al eliminar el usuario', error);
      })
  }
}
