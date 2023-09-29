import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  public usuariosList:any = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe(
      (data:any) => {
        if(Array.isArray(data)){
          this.usuariosList = data;
        }
      },
      (error:any) => {
        console.error(error);
      }
    );
  }
}
